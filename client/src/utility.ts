export const filterByKey = (data, key, value) => {
  const filteredData = data ? data.filter((entry) => entry[key] === value) : [];
  return filteredData;
};

export const accumulatorByAmount = (data, filter) => {
  const firstFilter = data ? filterByKey(data, filter.key, filter.value) : [];

  const filteredData = data
    ? filterByKey(firstFilter, filter.accumulator.key, filter.accumulator.value)
    : [];
  return filteredData.reduce((accumulator, entry) => {
    return accumulator + entry.amount;
  }, 0);
};
