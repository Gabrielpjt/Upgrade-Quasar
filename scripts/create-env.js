const fs = require('fs');
fs.writeFileSync(
  './.env',
  `QUASAR_API_URL=${process.env.QUASAR_API_URL}\nQUASAR_CLIENT_ID=${process.env.QUASAR_CLIENT_ID}\nQUASAR_CLIENT_SECRET=${process.env.QUASAR_CLIENT_SECRET}\n`
);
