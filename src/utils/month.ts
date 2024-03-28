import {monthsList} from '../mock/months';

type Month = {
  year: string;
  month: string;
};

export interface Item {
  name: string;
  cost: number;
  cessionId: string;
  month: {
    month: string;
    year: number;
  };
}

export const getCorrectMonth = (firstMonth: Month, monthsNext: number) => {
  const firstMonthIndex = monthsList.findIndex(
    month => month.value === firstMonth.month,
  );

  const correctDate = new Date(
    Number(firstMonth.year),
    firstMonthIndex + monthsNext,
    10,
  );

  return {
    month: monthsList[correctDate.getMonth()].value,
    year: correctDate.getFullYear(),
  };
};

export const orderByMonth = (items: Item[]) => {
  return items;
};
