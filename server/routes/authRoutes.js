const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET)

// Маршрут регистрации пользователя
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Проверяем, существует ли пользователь с таким же именем
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Хэшируем пароль перед сохранением
    const hashedPassword = await bcrypt.hash(password, 8);

    // Создаем нового пользователя
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res.json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// Маршрут аутентификации пользователя
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Проверяем, существует ли пользователь с указанным именем
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Проверяем правильность пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log('jwtSecret:', JWT_SECRET);
    // Создаем и подписываем JWT токен
    const token = jwt.sign({
      userId: user.id,
    }, JWT_SECRET);

    console.log('JWT Token:', token);

    res.json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to login' });
  }
});
module.exports = router;
