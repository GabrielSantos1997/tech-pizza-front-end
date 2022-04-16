import { useCallback, useEffect, useState } from 'react';
import api from 'services/api';
import Axios from 'axios';

export const useUpload = () => {
  const [percent, setPercent] = useState();
  const [source, setSource] = useState();

  function submitUpload({ route, data }) {
    const config = {
      onUploadProgress(progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setPercent(percentCompleted);
      },
      // cancelToken: source?.token,
    };

    return api.post(route, data, { ...config });
  }

  const cancelUpload = useCallback(() => {
    source?.cancel();
  }, [source]);

  useEffect(() => {
    const cancel = Axios.CancelToken;
    setSource(cancel.source);
    return () => source?.cancel();
  }, []);

  return { submitUpload, cancelUpload, percent };
};
