import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
  authEndpoint: '/broadcasting/auth', // Sesuaikan dengan rute Laravel Anda
  broadcaster: 'pusher',
  key: process.env.MIX_PUSHER_APP_KEY, // Ambil dari .env
  cluster: process.env.MIX_PUSHER_APP_CLUSTER, // Ambil dari .env
  wsHost: window.location.hostname, // Gunakan hostname dari lokasi saat ini
  wsPort: 6001, // Port WebSocket default
  wssPort: 6001, // Port untuk WebSocket aman
  forceTLS: false, // Aktifkan TLS hanya di produksi
  encrypted: false, // Sesuaikan dengan protokol
  disableStats: true, // Nonaktifkan statistik untuk efisiensi
  enabledTransports: ['ws', 'wss']// Gunakan WebSocket
});

export default async (/* { app, router, Vue ... } */) => {
  // sesuatu untuk dilakukan
};
