import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AppHeader = ({ isLoggedIn, handleLogout, username }) => {

  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Мій портал</h1>
        <nav>
          <ul className="flex space-x-4">
            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/auth/login" className="text-white hover:text-gray-300">
                    Логін
                  </Link>
                </li>
                <li>
                  <Link to="/auth/register" className="text-white hover:text-gray-300">
                    Реєстрація
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/" className="text-white hover:text-gray-300">
                    Головна
                  </Link>
                </li>
                <li>
                  <Link to="/add" className="text-white hover:text-gray-300">
                    Додати співробітника
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        {isLoggedIn && (
          <div>
            <div className="text-white">{username}</div>
            <button onClick={() => handleLogout()} className="text-white hover:text-red-500">
              Вийти
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

AppHeader.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  username: PropTypes.string
};

export default AppHeader;
