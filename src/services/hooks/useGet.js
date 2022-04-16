import { useState, useEffect, useCallback, useRef } from 'react';

import api from '../api';

function useGet({
  route,
  onSuccess = () => {},
  onError = () => {},
  search,
  isAutomatic = true,
}) {
  const [isLoading, setLoad] = useState(false);
  const [data, setData] = useState();
  const first = useRef(true);

  const getEntity = useCallback(() => {
    setLoad(true);

    api
      .get(route, { params: search })
      .then((response) => {
        setData(response.data);
        onSuccess(response);
      })
      .catch((err) => {
        setData({});
        onError(err);
      })
      .finally(() => setLoad(false));
  }, [route, search]);

  useEffect(() => {
    if (first.current) {
      if (isAutomatic) getEntity();
    } else {
      getEntity();
    }
    first.current = false;
  }, [getEntity, isAutomatic]);

  return { isLoading, data, getEntity };
}

export default useGet;
