import { useHistory } from 'react-router-dom';

const historyOb = {
  value: '',
};

function getHistory() {
  return historyOb.value;
}

export function useCreateHistory() {
  const history = useHistory();
  historyOb.value = history;
}

export default getHistory;
