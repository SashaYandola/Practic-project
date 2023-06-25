import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AppHeader = ({ isLoggedIn, handleLogout, username }) => {

  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Мой Портал</h1>
        <nav>
          <ul className="flex space-x-4">
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/" className="text-white hover:text-gray-300">
                    Главная
                  </Link>
                </li>
                <li>
                  <Link to="/add" className="text-white hover:text-gray-300">
                    Добавить сотрудника
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/auth/login" className="text-white hover:text-gray-300">
                    Логин
                  </Link>
                </li>
                <li>
                  <Link to="/auth/register" className="text-white hover:text-gray-300">
                    Регистрация
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
              Выйти
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
