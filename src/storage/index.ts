import methods from './methods';

export default {
  createNewSession: async (name: string) => {
    const cessions = await methods.getSessions();
    console.log('Cessions >>> ', {name, cessions});
  },
};
