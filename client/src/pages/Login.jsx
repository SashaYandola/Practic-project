import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = ({ handleLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const loginMutation = useMutation((data) => fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      console.log(response);
      throw new Error('Failed to login');
    }
    return response.json();
  }), {
    onSuccess: (data) => {
      const { token, user } = data; // Получение имени пользователя из ответа сервера
      handleLogin(token, user.username);
      console.log(data)
      navigate('/');
    }
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="mx-auto max-w-xs">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-1">Username:</label>
          <input {...register('username', { required: true })} className="w-full p-2 border border-gray-300" />
          {errors.username && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password:</label>
          <input {...register('password', { required: true })} type="password" className="w-full p-2 border border-gray-300" />
          {errors.password && <span className="text-red-500">This field is required</span>}
        </div>
        <button type="submit" disabled={loginMutation.isLoading} className="w-full bg-blue-500 text-white py-2 rounded">
          {loginMutation.isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
      {loginMutation.isError && <div className="text-red-500 mt-4">Error: {loginMutation.error.message}</div>}
      {loginMutation.isSuccess && <div className="text-green-500 mt-4">Login successful!</div>}
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
