import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EmployeeList = ({ employees, department, handleDelete }) => {
  return (
    <ul className="grid grid-cols-3 gap-6">
      {employees
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
  );
};

EmployeeList.propTypes = {
    employees: PropTypes.array.isRequired,
    department: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
  };
  
export default EmployeeList;
