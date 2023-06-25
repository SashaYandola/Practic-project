import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddEmployeePage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createEmployee = async (employeeData) => {
    const res = await fetch('http://localhost:3001/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(employeeData),
    });

    if (!res.ok) {
      navigate('/auth/login')
      console.log(res)
      throw new Error('Failed to create employee');
    }

    const data = await res.json();
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
      <h1 className="text-2xl font-bold mb-4">Додати співробітника</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="firstName">{`Ім'я:`}</label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        {errors.firstName && <p className="text-red-600">Поле {`Ім'я:`} {`обов'язкове`} для заповнення</p>}
        <div className="mb-4">
          <label htmlFor="lastName">Фамілія:</label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        {errors.lastName && <p className="text-red-600">Поле Фамілія {`обов'язкове`} для заповнення</p>}
        <div className="mb-4">
          <label htmlFor="department">Відділ:</label>
          <input
            type="text"
            id="department"
            {...register('department', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        {errors.department && <p className="text-red-600">Поле Відділ {`обов'язкове`} для заповнення</p>}
        <div className="mb-4">
          <label htmlFor="birthDate">Дата народження:</label>
          <input
            type="text"
            id="birthDate"
            {...register('birthDate', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        {errors.birthDate && <p className="text-red-600">Поле Дата народження {`обов'язкове`} для заповнення</p>}
        <div className="mb-4">
          <label htmlFor="monthlySalary">Щомісячна зарплата:</label>
          <input
            type="text"
            id="monthlySalary"
            {...register('monthlySalary', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        {errors.monthlySalary && <p className="text-red-600">Поле Щомісячна зарплата {`обов'язкове`} для заповнення</p>}
        <div className="mb-4">
          <label htmlFor="skills">Навички:</label>
          <input
            type="text"
            id="skills"
            {...register('skills', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        {errors.skills && <p className="text-red-600">Поле Навички {`обов'язкове`} для заповнення</p>}
        <div className="mb-4">
          <label htmlFor="jobType">Тип роботи:</label>
          <input
            type="text"
            id="jobType"
            placeholder='Office or Remote'
            {...register('jobType', { required: true })}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        {errors.jobType && <p className="text-red-600">Поле Тип роботи {`обов'язкове`} для заповнення</p>}
        <div className="mb-4">
          <label htmlFor="comment">Коментарій:</label>
          <input
            type="text"
            id="comment"
            {...register('comment')}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <button type="submit" className="btn btn-blue">
          Додати
        </button>
      </form>
    </div>
  );
};

export default AddEmployeePage;
