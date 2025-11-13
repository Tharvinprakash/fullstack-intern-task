const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const path = require('path');

dotenv.config();

const authRoutes = require('./src/routes/authRoutes');
const templateRoutes = require('./src/routes/templateRoutes');
const favouriteRoutes = require('./src/routes/favouriteRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/favourites', favouriteRoutes);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));