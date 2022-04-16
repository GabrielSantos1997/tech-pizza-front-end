import { useState, useEffect, useCallback, useRef } from 'react';

import api from '../api';

function useGetList({ route, page, search, params, isAutomatic = true }) {
  const [isLoading, setLoad] = useState(false);
  const [data, setData] = useState();
  const [meta, setMeta] = useState();

  const first = useRef(true);

  const getItems = useCallback(() => {
    setLoad(true);

    api
      .get(route, {
        params: { page, ...params, ...search },
      })
      .then((response) => {
        setData(response.data?.data);
        setMeta(response.data?.meta);
      })
      .catch(() => {
        setData([]);
        setMeta({});
      })
      .finally(() => setLoad(false));
  }, [page, params, route, search]);

  useEffect(() => {
    if (first.current) {
      if (isAutomatic) getItems();
    } else {
      getItems();
    }
    first.current = false;
  }, [getItems, isAutomatic]);

  return { isLoading, meta, data, getItems };
}

export default useGetList;
