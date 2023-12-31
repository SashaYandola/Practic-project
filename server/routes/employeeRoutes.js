const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth.middleware.js');

const prisma = new PrismaClient();
const router = express.Router();

// Маршрут получения списка сотрудников
router.get('/', authenticateToken, async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    const formattedEmployees = employees.map(employee => {

      return {
        ...employee,
        skills: employee.skills.split(' ').join(', ') // Преобразование строки с навыками в массив
      };
    });

    res.json({ employees: formattedEmployees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch employees' });
  }
});

// Маршрут добавления сотрудника
router.post('/add', authenticateToken, async (req, res) => {
  try {

    const { firstName, lastName, department, birthDate, monthlySalary, skills, jobType, comment } = req.body;
    // Проверка значения jobType
    const formattedJobType = jobType.toLowerCase(); // Преобразование в нижний регистр

    // Проверка значения jobType
    if (formattedJobType !== "office" && formattedJobType !== "remote") {
      return res.status(400).json({ message: "Недопустимое значение для jobType" });
    }

    const employee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        department,
        birthDate: new Date(birthDate),
        monthlySalary: parseFloat(monthlySalary),
        skills,
        jobType: formattedJobType,
        comment,
      },
    });

    res.json({ employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create employee' });
  }
});

// Маршрут для удаления сотрудника по идентификатору
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await prisma.employee.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Employee deleted', employee: deletedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete employee' });
  }
});

// Маршрут для обновления данных сотрудника по идентификатору
router.put('/edit/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, department, birthDate, monthlySalary, skills, jobType, comment } = req.body;
  // Проверка значения jobType
  const formattedJobType = jobType.toLowerCase(); // Преобразование в нижний регистр

  // Проверка значения jobType
  if (formattedJobType !== "office" && formattedJobType !== "remote") {
    return res.status(400).json({ message: "Недопустимое значение для jobType" });
  }


  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        department,
        birthDate: new Date(birthDate),
        monthlySalary: parseFloat(monthlySalary),
        skills,
        jobType: formattedJobType,
        comment,
      },
    });

    res.json({ message: 'Employee updated', employee: updatedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update employee' });
  }
});

module.exports = router;
