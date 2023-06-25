import { useState } from 'react';
import PropTypes from 'prop-types';

const EmployeeSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Введите имя или фамилию сотрудника"
      />
    </div>
  );
};

EmployeeSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default EmployeeSearch;
