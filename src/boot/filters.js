import { boot } from 'quasar/wrappers';
import { formatMoney } from 'accounting';

export default boot(({ app }) => {
  // Register a global property for money formatting
  app.config.globalProperties.$money = value => {
    return formatMoney(value, 'Rp ', 2, '.', ',');
  };
});
