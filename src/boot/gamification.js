// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
import { getPointActivity, poinConfig } from 'src/lib/api';

export default async ({ store, router }) => {
  getPointActivity()
    .then(res => {
      store.dispatch('gamification/updateActivity', res.data);
    });
  poinConfig()
    .then(res => {
      store.dispatch('gamification/updateConfig', res.data.filter(x => x.level_type === 'exp'));
    });
};
