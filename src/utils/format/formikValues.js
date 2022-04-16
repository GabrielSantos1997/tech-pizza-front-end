export function getValuesFormatted(values) {
  return Object.entries(values).reduce((acc, tuple) => {
    function getResult([key, att]) {
      // Array e.g select multiple
      if (att instanceof Array) {
        return { [key]: att.map((value) => value.value || value) };
      }

      // Select value
      if (att?.value?.toString().length) {
        return { [key]: att.value };
      }

      // Object recursive validation
      if (typeof att === 'object') {
        return { [key]: getValuesFormatted(att) };
      }

      //  String not empty, null or undefined
      if (att?.toString().length) {
        return { [key]: att };
      }

      // Not valid
      return {};
    }

    return { ...acc, ...getResult(tuple) };
  }, {});
}
