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
      <h1 className="text-2xl font-bold mb-4">Редактирование сотрудника: {id}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="firstName">Имя:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            {...register('firstName', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
          {errors.firstName && <p className="text-red-600">Поле Имя обязательно для заполнения</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="lastName">Фамилия:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            {...register('lastName', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
          {errors.lastName && <p className="text-red-600">Поле Фамилия обязательно для заполнения</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="department">Отдел:</label>
          <input
            type="text"
            id="department"
            name="department"
            {...register('department', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
          {errors.department && <p className="text-red-600">Поле Отдел обязательно для заполнения</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="birthDate">Дата рождения:</label>
          <input
            type="text"
            id="birthDate"
            name="birthDate"
            {...register('birthDate', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
          {errors.birthDate && <p className="text-red-600">Поле Дата рождения обязательно для заполнения</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="monthlySalary">Ежемесячная зарплата:</label>
          <input
            type="text"
            id="monthlySalary"
            name="monthlySalary"
            {...register('monthlySalary', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
          {errors.monthlySalary && <p className="text-red-600">Поле Ежемесячная зарплата обязательно для заполнения</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="skills">Навыки:</label>
          <input
            type="text"
            id="skills"
            name="skills"
            {...register('skills', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
          {errors.skills && <p className="text-red-600">Поле Навыки обязательно для заполнения</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="jobType">Тип работы:</label>
          <input
            type="text"
            id="jobType"
            name="jobType"
            {...register('jobType', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
          {errors.jobType && <p className="text-red-600">Поле Тип работы обязательно для заполнения</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="comment">Комментарий:</label>
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
          <button type="submit" className="btn btn-blue">Сохранить</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeePage;
