import { createI18n } from 'vue-i18n';
import messages from 'src/i18n'; // Import your message files

// Create an i18n instance using createI18n (Vue 3 syntax)
const i18n = createI18n({
  locale: 'en-us', // Default locale
  fallbackLocale: 'en-us', // Fallback locale
  messages// Locale messages
});

export default ({ app }) => {
  // Set the i18n instance to the app
  app.use(i18n); // Correct way to register i18n in Vue 3
};

export { i18n };
