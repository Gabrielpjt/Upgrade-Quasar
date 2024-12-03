import { boot } from 'quasar/wrappers';
import CKEditor from '@ckeditor/ckeditor5-vue';

export default boot(({ app }) => {
  app.use(CKEditor); // In Vue 3, use app.use instead of Vue.use
});
