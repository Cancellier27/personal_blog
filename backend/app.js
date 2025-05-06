const express = require("express")
const cors = require("cors")

const userRoutes = require('./routes/userRoutes.js')
const newsRoutes = require('./routes/newsRoutes.js')
const authRoutes = require('./routes/authRoutes.js')
const { errorHandler } = require('./middlewares/errorHandler.js')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/news', newsRoutes);

app.use(errorHandler);

module.exports = app;
