import AsyncStorage from '@react-native-async-storage/async-storage';

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

interface AllMonthsItems {
  [k: string]: MonthItem[];
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
      const cessions = JSON.parse(result as string) as Cessions;
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
  getAllMonthsItems: async (): Promise<AllMonthsItems | undefined> => {
    try {
      const result = await AsyncStorage.getItem(STORAGE_KEYS.MONTHS_ITEMS);
      if (!result) {
        await AsyncStorage.setItem(STORAGE_KEYS.MONTHS_ITEMS, '{}');
        return {};
      }
    } catch (err) {
      return;
    }
  },
};
