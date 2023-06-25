import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppHeader from './components/AppHeader/AppHeader';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import Login from './pages/Login';
import MainPage from './pages/MainPage';
import EditListPage from './pages/EditListPage';
import AddEmployeePage from './pages/AddEmployeePage';
import Register from './pages/Register';

import useAuth from './hooks/useAuth';


const queryClient = new QueryClient();

const App = () => {

  const { isLoggedIn, username, handleLogin, handleLogout } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <AppHeader isLoggedIn={isLoggedIn} handleLogout={handleLogout} username={username} />
          <div className="container mx-auto mt-8">
            <Routes>
              <Route path='/' element={<PrivateRoute />}>
                <Route path="/" element={<MainPage />} />
              </Route>
              <Route path='/' element={<PrivateRoute />}>
                <Route path="/add" element={<AddEmployeePage />} />
              </Route>
              <Route path='/' element={<PrivateRoute />}>
                <Route path="/edit/:id" element={<EditListPage />} />
              </Route>
              <Route path="/auth/login" element={<Login handleLogin={handleLogin} />} />
              <Route path="/auth/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
