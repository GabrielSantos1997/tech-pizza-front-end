import { useProfile } from 'services/profile/getProfile';

const { useEffect } = require('react');

export const usePreventCopy = () => {
  const { isAdmin } = useProfile();

  useEffect(() => {
    const { body } = document;
    function addEventsListener() {
      body.style = `
      user-select: none;
      -moz-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;`;
      body.oncopy = () => false;
      body.oncut = () => false;
    }
    function removeEventsListener() {
      body.oncopy = (e) => e;
      body.oncopy = (e) => e;
      body.style = '';
    }

    if (!isAdmin) {
      addEventsListener();
    } else {
      removeEventsListener();
    }

    return removeEventsListener;
  }, [isAdmin]);
};
