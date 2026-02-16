import { useField } from "formik";

interface CustomInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

export const CustomInput = ({ label, ...props }: CustomInputProps) => {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        {...field}
        {...props}
        className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
          meta.touched && meta.error
            ? "border-error focus:ring-error-focus"
            : "border-gray-1 focus:ring-primary"
        }`}
      />
      {meta.touched && meta.error && (
        <span className="text-xs text-red-500">{meta.error}</span>
      )}
    </div>
  );
};
