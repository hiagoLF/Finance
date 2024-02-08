import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  SESSIONS: '@Fiance-Sessions',
};

type Cession = {
  id: string;
  name: string;
};

type Cessions = {
  cessions: Cession[];
};

export const cessionsInitialStructure = {
  cessions: [],
};

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
      cessions.cessions.push({id: Math.random().toString(), name});
      await AsyncStorage.setItem(
        STORAGE_KEYS.SESSIONS,
        JSON.stringify(cessions),
      );
      return cessions.cessions[cessions.cessions.length - 1];
    } catch (err) {
      return;
    }
  },
};
