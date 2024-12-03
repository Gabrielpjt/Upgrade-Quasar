import { boot } from 'quasar/wrappers';
import VueLazyLoad from 'vue-lazyload';

export default boot(({ app }) => {
  app.use(VueLazyLoad, {
    // Options can be customized here
    loading: 'path/to/loading-image.jpg',
    error: 'path/to/error-image.jpg'
  });
});
