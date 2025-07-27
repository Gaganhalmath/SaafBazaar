const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./mongo');
const profileRoutes = require('./src/profileRoutes');
const cors = require('cors');
const productRoutes = require('./src/productRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', profileRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
