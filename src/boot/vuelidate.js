import { boot } from 'quasar/wrappers';
import { useVuelidate } from '@vuelidate/core';

export default boot(({ app }) => {
  // Add useVuelidate as a global property so you can access it in all components
  app.config.globalProperties.$vuelidate = useVuelidate;
});
