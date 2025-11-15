// run `npm run worker` to run scheduler only (useful in deploy platforms)
require('dotenv').config();
const connectDB = require('./config/db');
const { initAgenda } = require('./services/scheduler');

(async () => {
  await connectDB(process.env.MONGO_URI);
  await initAgenda(process.env.MONGO_URI);
  console.log('Worker running (Agenda scheduler)');
})();

setInterval(async () => {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, '0');
  const mm = now.getMinutes().toString().padStart(2, '0');
  const currentTime = `${hh}:${mm}`;

  console.log("Checking reminders at:", currentTime);

  // TODO: fetch reminders and compare times

}, 60000);
