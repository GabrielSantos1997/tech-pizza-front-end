import { useState } from 'react';
import swal from 'sweetalert';

import api from '../api';

export default function useDelete({
  successMessage = '',
  errorMessage = '',
  onSuccess = () => {},
  onError = () => {},
}) {
  const [isLoading, setIsLoading] = useState(false);

  const apiDelete = ({ route, name }) => {
    swal({
      title: `Tem certeza que quer remover${name ? ` ${name}` : ''}?`,
      icon: 'error',
      buttons: ['Não', 'Sim'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setIsLoading(true);
        api
          .delete(route)
          .then(() => {
            onSuccess();
            swal(successMessage, {
              icon: 'success',
            });
          })
          .catch((error) => {
            if (error.response.status === 400) {
              swal(errorMessage || error.response.data.message, {
                icon: 'warning',
              });
            }

            onError(error);
          })
          .finally(() => setIsLoading(false));
      }
    });
  };

  return { apiDelete, isLoading };
}
