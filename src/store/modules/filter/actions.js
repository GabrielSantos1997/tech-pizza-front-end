export function updateFilter(filter) {
  return {
    type: '@filter/UPDATE_FILTER',
    payload: { filter },
  };
}

export function removeFilter() {
  return {
    type: '@filter/REMOVE_FILTER',
  };
}
