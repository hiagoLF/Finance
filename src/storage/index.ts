import methods from './methods';

type GetMonthDataProps = {
  month: string;
  year: string;
};

export default {
  createNewSession: async (name: string) => {
    const newSession = await methods.createSession(name);
    return newSession;
  },
  getMonthData: async ({month, year}: GetMonthDataProps) => {
    console.log('get Month', month, year);
  },
};
