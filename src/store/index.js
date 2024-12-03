import { createStore } from 'vuex'; // For Vue 3
import user from './user';
import notification from './notification';
import privateMessage from './private-message';
import gamification from './gamification';
import quiz from './quiz';

/*
 * Return existing store for non-SSR mode
 */
// eslint-disable-next-line import/no-mutable-exports
let existingStore = null;

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
export default function init({ ssrContext }) {
  if (ssrContext || !existingStore) {
    existingStore = createStore({ // Use createStore for Vue 3
      modules: {
        user,
        notification,
        privateMessage,
        gamification,
        quiz
      },

      // enable strict mode (adds overhead!)
      // for dev mode only
      strict: process.env.DEV
    });
  }

  return existingStore;
}

export { existingStore };
