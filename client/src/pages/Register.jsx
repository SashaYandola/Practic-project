import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const registerMutation = useMutation((data) => fetch('http://localhost:3001/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to register');
    }
    return response.json();
  }));

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  useEffect(() => {
    if (registerMutation.isSuccess) {
      setTimeout(() => {
        navigate('/auth/login');
      }, 1000);
    }
  }, [registerMutation.isSuccess, navigate]);

  return (
    <div className="mx-auto max-w-xs">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
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
        <button type="submit" disabled={registerMutation.isLoading} className="w-full bg-blue-500 text-white py-2 rounded">
          {registerMutation.isLoading ? 'Loading...' : 'Register'}
        </button>
      </form>
      {registerMutation.isError && <div className="text-red-500 mt-4">Error: {registerMutation.error.message}</div>}
      {registerMutation.isSuccess && <div className="text-green-500 mt-4">Registration successful!</div>}
    </div>
  );
};

export default Register;
