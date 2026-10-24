const express = require('express');
const cors = require('cors');
const path = require('path');
const platformRoutes = require('./routes/platform');

const app = express();
app.use(cors());
app.use(express.json());

// Embedded production configurations to avoid requiring .env setup
process.env.DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/funding_payout";
process.env.NODE_ENV = "production";

app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', platformRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
