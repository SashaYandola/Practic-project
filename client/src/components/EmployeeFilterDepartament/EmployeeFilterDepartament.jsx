import PropTypes from 'prop-types';
const EmployeeFilterDepartament = ({ department, handleDepartmentChange, departments }) => {
  return (
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
  );
};

EmployeeFilterDepartament.propTypes = {
  department: PropTypes.string.isRequired,
  handleDepartmentChange: PropTypes.func.isRequired,
  departments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EmployeeFilterDepartament;
