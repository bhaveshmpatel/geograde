import { Control, Controller } from 'react-hook-form';

type CustomInputProps = {
  control: Control; // Ensure the control type is correct
  name: string;
  label: string;
  placeholder: string;
  error?: any; // Optional error prop
};

const CustomInput = ({ control, name, label, placeholder, error }: CustomInputProps) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="font-medium text-gray-700">
        {label}
      </label>
      <Controller
        name={name}
        control={control} // Pass control to Controller component
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type="text"
            placeholder={placeholder}
            className={`mt-1 p-2 border rounded-md focus:outline-none ${error ? 'border-red-500' : 'border-gray-300'}`}
          />
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default CustomInput;
