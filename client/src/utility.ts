import {
  currentMonth,
  previousMonth,
  currentYear,
  previousYear,
} from "./dataUtil";

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

export const accumulatorByTotalAmount = (data, key, value) => {
  const filteredData = data ? filterByKey(data, key, value) : [];
  return filteredData.reduce((accumulator, entry) => {
    return accumulator + entry.amount;
  }, 0);
};

export const accumulatorByTotalBalance = (data) => {
  return data.reduce((accumulator, entry) => {
    return accumulator + entry.amount;
  }, 0);
};

export const accumulatorUserByCurrentMonth = (data, user) => {
  const filteredData = data
    ? data
        .filter((data) => data["year"] === currentYear)
        .filter((data) => data["month"] === currentMonth)
        .filter((data) => data["financeStatement"] === "Income")
        .filter((data) => data["user.firstName"] === user)
    : [];

  return filteredData.reduce((accumulator, entry) => {
    return accumulator + entry.amount;
  }, 0);
};

export const accumulatorCurrentMonthByStatement = (data, value) => {
  const filteredData = data
    ? data
        .filter((data) => data["year"] === currentYear)
        .filter((data) => data["month"] === currentMonth)
        .filter((data) => data["financeStatement"] === value)
    : [];
  return accumulatorByTotalBalance(filteredData);
};

export const accumulatorPreviousMonthByStatement = (data, value) => {
  const filteredData = data
    ? data
        .filter((data) => data["year"] === previousYear)
        .filter((data) => data["month"] === previousMonth)
        .filter((data) => data["financeStatement"] === value)
    : [];
  return accumulatorByTotalBalance(filteredData);
};

export const leaseByDeptNumber = (data, deptNumber) => {
  const element = data.find(item => item.dep_number === deptNumber);
  return element ? element.leasing_price : null ;
};
export const dataByDeptNumber = (data, deptNumber) => {
  const element = data.find(item => item.dep_number === deptNumber);
  return element ? element : null ;
};