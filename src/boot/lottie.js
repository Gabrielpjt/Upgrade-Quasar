import { boot } from 'quasar/wrappers';
import LottieAnimation from 'lottie-web-vue';

export default boot(({ app }) => {
  app.use(LottieAnimation);
});
