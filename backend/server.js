require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const { initAgenda } = require('./services/scheduler');
const twilioRoutes = require('./routes/twilioRoutes');

// ... other middleware ...


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// connect DB and start scheduler
connectDB(process.env.MONGO_URI).then(async () => {
  await initAgenda(process.env.MONGO_URI);
}).catch(err => {
  console.error('DB init error', err);
  process.exit(1);
});

// routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/medicines', require('./routes/medicineRoutes'));
app.use('/logs', require('./routes/logRoutes'));
app.use('/api/twilio', twilioRoutes);

app.get('/health', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));
