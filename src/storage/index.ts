import {getCorrectMonth} from '../utils/month';
import methods, {Cession} from './methods';

export type GetMonthDataProps = {
  month: string;
  year: string;
};

export type MonthResult = {
  month: string;
  year: string;
  deposit: number;
  outflow: number;
  accumulated: number;
  cessions: Cession[];
};

export type MonthItemToCreate = {
  name: string;
  cost: number;
  installmentsAmount: number;
  cessionId: string;
  firstMonth: {
    month: string;
    year: string;
  };
};

export default {
  createNewSession: async (name: string) => {
    const newSession = await methods.createSession(name);
    return newSession;
  },
  getMonthData: async ({month, year}: GetMonthDataProps) => {
    const cessions = await methods.getSessions();

    return {
      month: 'jan',
      year: '2024',
      deposit: 250000,
      outflow: 376000,
      accumulated: 95000,
      cessions: cessions.cessions,
    };
  },
  createNewItem: async ({
    cessionId,
    cost,
    firstMonth,
    installmentsAmount,
    name,
  }: MonthItemToCreate) => {
    const items = new Array(installmentsAmount)
      .fill(true)
      .map((item, index) => ({
        name,
        cost,
        cessionId,
        month: getCorrectMonth(firstMonth, index),
      }));

    await methods.createItems(items);
  },
};
