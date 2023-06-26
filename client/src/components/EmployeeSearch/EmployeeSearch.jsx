import { useState } from 'react';
import PropTypes from 'prop-types';

const EmployeeSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Пошук (Ім'я та Прізвище)"
        className="w-full p-2 border border-gray-300"
      />
    </div>
  );
};

EmployeeSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default EmployeeSearch;
