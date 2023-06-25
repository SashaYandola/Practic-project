import { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [department, setDepartment] = useState('');

  const { isLoading, isError, data } = useQuery(['employees'], () =>
    fetch('http://localhost:3001').then((res) => res.json())
  );

  const deleteEmployee = useMutation(
    (id) => fetch(`http://localhost:3001/${id}`, { method: 'DELETE' }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['employees']);
      },
    }
  );

  const handleDelete = (id) => {
    deleteEmployee.mutate(id);
  };

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

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  if (isError) {
    return <div>Помилка при завантаженні даних</div>;
  }

  if (isLoading) {
    return <div>Завантаження даних...</div>;
  }

  const { employees } = data;

  const filteredEmployees = filterEmployees(employees, searchQuery);

  const departments = [...new Set(employees.map((employee) => employee.department))];

  // Обчислення середньої зарплати
  const averageSalary = filteredEmployees.reduce((sum, employee) => {
    return sum + employee.monthlySalary;
  }, 0) / filteredEmployees.length;

  // Обчислення загальної зарплати за відділ
  const departmentTotalSalary = filteredEmployees
    .filter((employee) => employee.department === department)
    .reduce((sum, employee) => {
      return sum + employee.monthlySalary;
    }, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Список співробітників</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Пошук (Ім'я та Прізвище)"
          className="w-full p-2 border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <select
          value={department}
          onChange={handleDepartmentChange}
          className=" p-2 border border-gray-300"
        >
          <option value="">Всі відділи</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <p className="text-lg font-bold">Середня зарплата: {averageSalary.toFixed(2)}</p>
      {department && (
        <p className="text-lg font-bold">Загальна зарплата за відділ: {departmentTotalSalary.toFixed(2)}</p>
      )}
      <ul className="grid grid-cols-3 gap-6">
        {filteredEmployees
          .filter((employee) => !department || employee.department === department)
          .map((employee) => (
            <li key={employee.id} className="p-4 border border-gray-300 rounded-lg">
              <h3 className="text-xl font-bold mb-3">{employee.firstName}</h3>
              <p className="mb-2 font-bold">
                Прізвище: <span className="font-normal">{employee.lastName}</span>
              </p>
              <p className="mb-2 font-bold">
                Відділ: <span className="font-normal">{employee.department}</span>
              </p>
              <p className="mb-2 font-bold">
                Дата народження: <span className="font-normal">{employee.birthDate}</span>
              </p>
              <p className="mb-2 font-bold">
                Місячна зарплата: <span className="font-normal">{employee.monthlySalary}</span>
              </p>
              <p className="mb-2 font-bold">
                Навички: <span className="font-normal">{employee.skills}</span>
              </p>
              <p className="mb-2 font-bold">
                Тип роботи: <span className="font-normal">{employee.jobType}</span>
              </p>
              {employee.comment && (
                <p className="mb-2 font-bold">
                  Коментар: <span className="font-normal">{employee.comment}</span>
                </p>
              )}
              <button onClick={() => handleDelete(employee.id)} className="btn btn-red mr-3">
                Видалити
              </button>
              <Link to={`/edit/${employee.id}`} className="btn btn-blue mt-2">
                Редагувати
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MainPage;
