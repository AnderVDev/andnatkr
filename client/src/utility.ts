/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  currentMonth,
  previousMonth,
  currentYear,
  previousYear,
} from "./dataUtil";

export const filterByKey = (data: any[], key: string | number, value: any) => {
  const filteredData = data ? data.filter((entry: { [x: string]: any; }) => entry[key] === value) : [];
  return filteredData;
};

export const accumulatorByAmount = (data: any, filter: { key: any; value: any; accumulator: any; }) => {
  const firstFilter = data ? filterByKey(data, filter.key, filter.value) : [];

  const filteredData = data
    ? filterByKey(firstFilter, filter.accumulator.key, filter.accumulator.value)
    : [];
  return filteredData.reduce((accumulator: any, entry: { amount: any; }) => {
    return accumulator + entry.amount;
  }, 0);
};

export const accumulatorByTotalAmount = (data: any, key: string, value: string) => {
  const filteredData = data ? filterByKey(data, key, value) : [];
  return filteredData.reduce((accumulator: any, entry: { amount: any; }) => {
    return accumulator + entry.amount;
  }, 0);
};

export const accumulatorByTotalBalance = (data: any[]) => {
  return data.reduce((accumulator: any, entry: { amount: any; }) => {
    return accumulator + entry.amount;
  }, 0);
};

export const accumulatorUserByCurrentMonth = (data: any[], user: string) => {
  const filteredData = data
    ? data
        .filter((data: { [x: string]: number; }) => data["year"] === currentYear)
        .filter((data: { [x: string]: string; }) => data["month"] === currentMonth)
        .filter((data: { [x: string]: string; }) => data["financeStatement"] === "Income")
        .filter((data: { [x: string]: any; }) => data["user.firstName"] === user)
    : [];

  return filteredData.reduce((accumulator: any, entry: { amount: any; }) => {
    return accumulator + entry.amount;
  }, 0);
};

export const accumulatorCurrentMonthByStatement = (data: any[], value: string) => {
  const filteredData = data
    ? data
        .filter((data: { [x: string]: number; }) => data["year"] === currentYear)
        .filter((data: { [x: string]: string; }) => data["month"] === currentMonth)
        .filter((data: { [x: string]: any; }) => data["financeStatement"] === value)
    : [];
  return accumulatorByTotalBalance(filteredData);
};

export const accumulatorPreviousMonthByStatement = (data: any[], value: string) => {
  const filteredData = data
    ? data
        .filter((data: { [x: string]: number; }) => data["year"] === previousYear)
        .filter((data: { [x: string]: string; }) => data["month"] === previousMonth)
        .filter((data: { [x: string]: any; }) => data["financeStatement"] === value)
    : [];
  return accumulatorByTotalBalance(filteredData);
};

export const leaseByDeptNumber = (data: any[], deptNumber: any) => {
  const element = data.find(item => item.dep_number === deptNumber);
  return element ? element.leasing_price : null ;
};
export const dataByDeptNumber = (data: any[], deptNumber: number) => {
  const element = data.find((item: { dep_number: any; }) => item.dep_number === deptNumber);
  return element ? element : null ;
};