import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const EditEmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');

  const updateEmployee = async (data) => {
    try {
      const response = await fetch(`http://localhost:3001/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to update employee');
      }

      const updatedEmployee = await response.json();
      return updatedEmployee;
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const mutation = useMutation(updateEmployee, {
    onSuccess: () => {
      console.log('Employee updated successfully');
      queryClient.invalidateQueries(['employees']);
      navigate('/');
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Редагування співробітника: {id}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="firstName">{`Ім'я:`}:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            {...register('firstName', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
          {errors.firstName && <p className="text-red-600">Поле {`Ім'я:`} {`обов'язкове`} для заповнення</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="lastName">Фамілія:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            {...register('lastName', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
          {errors.lastName && <p className="text-red-600">Поле Фамілія {`обов'язкове`} для заповнення</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="department">Відділ:</label>
          <input
            type="text"
            id="department"
            name="department"
            {...register('department', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
          {errors.department && <p className="text-red-600">Поле Відділ {`обов'язкове`} для заповнення</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="birthDate">Дата народження:</label>
          <input
            type="text"
            id="birthDate"
            name="birthDate"
            {...register('birthDate', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
          {errors.birthDate && <p className="text-red-600">Поле Дата народження {`обов'язкове`} для заповнення</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="monthlySalary">Щомісячна зарплата:</label>
          <input
            type="text"
            id="monthlySalary"
            name="monthlySalary"
            {...register('monthlySalary', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
          {errors.monthlySalary && <p className="text-red-600">Поле Щомісячна зарплата {`обов'язкове`} для заповнення</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="skills">Навички:</label>
          <input
            type="text"
            id="skills"
            name="skills"
            {...register('skills', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
          {errors.skills && <p className="text-red-600">Поле Навички {`обов'язкове`} для заповнення</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="jobType">Тип роботи:</label>
          <input
            type="text"
            id="jobType"
            name="jobType"
            {...register('jobType', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
          {errors.jobType && <p className="text-red-600">Поле Тип роботи {`обов'язкове`} для заповнення</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="comment">Коментарій:</label>
          <input
            type="text"
            id="comment"
            name="comment"
            {...register('comment')}
            className="w-full p-2 border border-gray-300"
          />
        </div>

        <div>
          {errorMessage && <p>{errorMessage}</p>}
          <button type="submit" className="btn btn-blue">Зберегти</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeePage;
