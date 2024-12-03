import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
  authEndpoint: './api/broadcasting/auth',
  broadcaster: 'pusher',
  key: process.env.MIX_PUSHER_APP_KEY,
  wsHost: process.env.MIX_PUSHER_HOST,
  wsPort: process.env.MIX_PUSHER_PORT,
  wssPort: process.env.MIX_PUSHER_PORT,
  forceTLS: false,
  encrypted: true,
  disableStats: true,
  enabledTransports: ['ws', 'wss']
});

