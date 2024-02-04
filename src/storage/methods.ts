import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  SESSIONS: '@Fiance-Sessions',
};

export const cessionsInitialStructure = {
  cessions: [],
};

export default {
  getSessions: async () => {
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
};
