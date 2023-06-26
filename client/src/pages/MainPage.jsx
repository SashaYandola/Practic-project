
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EmployeeSearch from '../components/EmployeeSearch/EmployeeSearch';
import EmployeeList from '../components/EmployeeList/EmployeeList';
import EmployeeFilterDepartament from '../components/EmployeeFilterDepartament/EmployeeFilterDepartament';

const MainPage = () => {
  // State и хуки
  const queryClient = useQueryClient();
  const [department, setDepartment] = useState('');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Запрос на получение данных
  const { isLoading, isError, data } = useQuery(['employees'], () =>
    fetch('http://localhost:3001', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      if (!res.ok) {
        console.log(res);
        navigate('/auth/login/');
      }
      return res.json();
    })
  );

  // Мутация для удаления сотрудника
  const deleteEmployee = useMutation(
    (id) =>
      fetch(`http://localhost:3001/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['employees']);
      },
    }
  );

  // Функция для фильтрации сотрудников
  const filterEmployees = (employees, query) => {
    if (!query) {
      return employees;
    }

    const lowerCaseQuery = query.toLowerCase();
    const searchTerms = lowerCaseQuery.split(' ');

    return employees.filter((employee) => {
      const lowerCaseFirstName = employee.firstName.toLowerCase();
      const lowerCaseLastName = employee.lastName.toLowerCase();

      return searchTerms.every((term) => {
        return (
          lowerCaseFirstName.includes(term) ||
          lowerCaseLastName.includes(term) ||
          `${lowerCaseFirstName} ${lowerCaseLastName}`.includes(term)
        );
      });
    });
  };

  // Обработчики событий
  const handleDelete = (id) => {
    deleteEmployee.mutate(id);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  // Рендеринг компонента
  if (isError) {
    return <div>Помилка при завантаженні даних</div>;
  }

  if (isLoading) {
    return <div>Завантаження даних...</div>;
  }

  const employees = data?.employees || [];
  const filteredEmployees = filterEmployees(employees, searchQuery);
  const departments = [...new Set(employees.map((employee) => employee.department))];

  // Обчисление средней зарплаты
  const averageSalary =
    filteredEmployees.reduce((sum, employee) => {
      return sum + employee.monthlySalary;
    }, 0) / filteredEmployees.length;

  // Обчисление общей зарплаты за отдел
  const departmentTotalSalary = filteredEmployees
    .filter((employee) => employee.department === department)
    .reduce((sum, employee) => {
      return sum + employee.monthlySalary;
    }, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Список співробітників</h1>
      <EmployeeSearch onSearch={handleSearch} />
      <EmployeeFilterDepartament
        department={department}
        handleDepartmentChange={handleDepartmentChange}
        departments={departments}
      />
      <p className="text-lg font-bold">Середня зарплата: {averageSalary.toFixed(2)}</p>
      {department && (
        <p className="text-lg font-bold">
          Загальна зарплата за відділ: {departmentTotalSalary.toFixed(2)}
        </p>
      )}
      <EmployeeList employees={filteredEmployees} handleDelete={handleDelete} department={department} />
    </div>
  );
};

export default MainPage;
