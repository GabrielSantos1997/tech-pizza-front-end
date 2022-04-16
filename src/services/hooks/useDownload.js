import { useState } from 'react';

import api from '../api';

export function useDownload() {
  const [isDownloading, setIsDownloading] = useState(false);

  function downloadFile({ route, ext, name }) {
    setIsDownloading(false);

    api
      .get(`${route}?page_size: 99999`, { responseType: 'blob' })
      .then((response) => {
        const type = response.headers['content-type'];
        const blob = new Blob([response.data], { type });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', ext ? `${name}.${ext}` : name);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .finally(() => {
        setIsDownloading(false);
      });
  }

  return { isDownloading, downloadFile };
}
