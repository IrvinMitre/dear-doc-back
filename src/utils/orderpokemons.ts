export const sortByElementInJSON = (
    array: Array<{ [key: string]: any }>,
    element: string
  ): Array<{ [key: string]: any }> => {
    return array.sort((a, b) => {
      if (a[element] < b[element]) {
        return -1;
      } else if (a[element] > b[element]) {
        return 1;
      } else {
        return 0;
      }
    });
  };
