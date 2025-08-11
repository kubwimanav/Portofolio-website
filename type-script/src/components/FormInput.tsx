import type React from 'react';
import type { Task } from '../types/type';
import Input from './Input'

type props={
  task:Task
}

const FormInput: React.FC<props>=({task}) =>{
  return (
    <div>
      <form className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">AddTask</h2>
        <div className=" grid grid-cols-2 gap-4">
         
          <Input
            label="TaskName"
            name="TaskName"
            value=""
            placeholder="Enter your username"
            error=""
          />
          <Input
            label="Priority"
            name="priority"
            value=""
            placeholder="Enter your priority"
            error=""
          />
          <Input
            label="category"
            name="category"
            value=""
            placeholder="Enter your category"
            error=""
          />
          <Input
            label="dueDate"
            name="dueDate"
            type="date"
            value=""
            placeholder="Enter your dueDate"
            error=""
          />
          <Input
            label="assignedUser "
            type="text"
            name="assignedUser "
            value=""
            placeholder="Enter your assignedUser "
            error=""
          />
          <Input
            label="assignedOn"
            name="assignedOn"
            type="date"
            value=""
            placeholder="Enter your assignedOn"
            error=""
          />
        </div>
        <button type="submit" className='w-full bg-blue-400 py-2 rounded-md'>Submit</button>
      </form>
    </div>
  );
}

export default FormInput
