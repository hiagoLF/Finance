import AsyncStorage from '@react-native-async-storage/async-storage';
import {orderByMonth} from '../utils/month';

export const STORAGE_KEYS = {
  SESSIONS: '@Fiance-Sessions',
  MONTHS_ITEMS: '@Finance-Months-Items',
};

export type Cession = {
  id: string;
  name: string;
};

type Cessions = {
  cessions: Cession[];
};

export const cessionsInitialStructure = {
  cessions: [],
};

export interface MonthItem {
  name: string;
  cost: number;
  installment: number;
  cessionId: string;
}

export interface Item {
  name: string;
  cost: number;
  cessionId: string;
  month: {
    month: string;
    year: number;
  };
}

export default {
  getSessions: async (): Promise<Cessions> => {
    const result = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (!result) {
      await AsyncStorage.setItem(
        STORAGE_KEYS.SESSIONS,
        JSON.stringify(cessionsInitialStructure),
      );
      return cessionsInitialStructure;
    }

    return JSON.parse(result);
  },
  createSession: async (name: string) => {
    try {
      const result = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
      const cessions: Cessions = result
        ? JSON.parse(result)
        : cessionsInitialStructure;
      const newSession = {id: Math.random().toString(), name};
      cessions.cessions.push(newSession);
      await AsyncStorage.setItem(
        STORAGE_KEYS.SESSIONS,
        JSON.stringify(cessions),
      );
      return newSession;
    } catch (err) {
      return;
    }
  },
  createItems: async (items: Item[]) => {
    try {
      const result = await AsyncStorage.getItem(STORAGE_KEYS.MONTHS_ITEMS);
      const parsedItems: Item[] = result ? JSON.parse(result) : [];

      parsedItems.push(...items);

      const orderedItems = orderByMonth(parsedItems);

      await AsyncStorage.setItem(
        STORAGE_KEYS.MONTHS_ITEMS,
        JSON.stringify(orderedItems),
      );
      return orderedItems;
    } catch (err) {
      return;
    }
  },
};
