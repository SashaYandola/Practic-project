const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// Использование маршрутов
app.use('/', employeeRoutes);
app.use('/auth/', authRoutes);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
