import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddEmployeePage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createEmployee = async (employeeData) => {
    const response = await fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error('Failed to create employee');
    }

    const data = await response.json();
    return data;
  };

  const addEmployeeMutation = useMutation(createEmployee, {
    onSuccess: () => {
      console.log('Employee added successfully');
      queryClient.invalidateQueries(['employees']);
    },
  });


  const onSubmit = async (data) => {
    try {
      await addEmployeeMutation.mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Добавить сотрудника</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="firstName">Имя:</label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        {errors.firstName && <p className="text-red-600">Поле Имя обязательно для заполнения</p>}
        <div className="mb-4">
          <label htmlFor="lastName">Фамилия:</label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        {errors.lastName && <p className="text-red-600">Поле Фамилия обязательно для заполнения</p>}
        <div className="mb-4">
          <label htmlFor="department">Отдел:</label>
          <input
            type="text"
            id="department"
            {...register('department', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        {errors.department && <p className="text-red-600">Поле Отдел обязательно для заполнения</p>}
        <div className="mb-4">
          <label htmlFor="birthDate">Дата рождения:</label>
          <input
            type="text"
            id="birthDate"
            {...register('birthDate', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        {errors.birthDate && <p className="text-red-600">Поле Дата рождения обязательно для заполнения</p>}
        <div className="mb-4">
          <label htmlFor="monthlySalary">Ежемесячная зарплата:</label>
          <input
            type="text"
            id="monthlySalary"
            {...register('monthlySalary', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        {errors.monthlySalary && <p className="text-red-600">Поле Ежемесячная зарплата обязательно для заполнения</p>}
        <div className="mb-4">
          <label htmlFor="skills">Навыки:</label>
          <input
            type="text"
            id="skills"
            {...register('skills', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        {errors.skills && <p className="text-red-600">Поле Навыки обязательно для заполнения</p>}
        <div className="mb-4">
          <label htmlFor="jobType">Тип работы:</label>
          <input
            type="text"
            id="jobType"
            placeholder='Office or Remote'
            {...register('jobType', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        {errors.jobType && <p className="text-red-600">Поле Тип работы обязательно для заполнения</p>}
        <div className="mb-4">
          <label htmlFor="comment">Комментарий:</label>
          <input
            type="text"
            id="comment"
            {...register('comment')}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <button type="submit" className="btn btn-blue">
          Добавить
        </button>
      </form>
    </div>
  );
};

export default AddEmployeePage;
