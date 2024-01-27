import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { Field } from "formik";

const InputAuth = ({
  children,
  type,
  placeholder,
  name,
  value,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => {
  const pathName = usePathname();
  const [show, setShow] = useState(type === "password");
  const handleShow = () => {
    setShow(!show);
  };

  const inputType = !show ? "text" : type;

  return (
    <div className="relative">
      <div className="flex justify-between">
        <label htmlFor={name} className="text-xs">
          {children}
        </label>
        {pathName !== "/login" ? null : type !== "password" ? null : (
          <Link href="/forgot-password" className="text-xs text-bnr-primary">
            Forgot password
          </Link>
        )}
      </div>
      <Field
        type={inputType}
        name={name}
        id={name}
        className={
          errors && touched
            ? "w-full h-12 px-4 text-xs border outline-none border-red-600 rounded-2xl text-red-600"
            : "w-full h-12 px-4 text-xs border outline-none border-bnr-secondary rounded-2xl"
        }
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      {type !== "password" ? null : show ? (
        <FiEyeOff
          onClick={handleShow}
          className="absolute text-2xl text-bnr-secondary right-5 top-1/2"
        />
      ) : (
        <FiEye
          onClick={handleShow}
          className="absolute text-2xl text-bnr-secondary right-5 top-1/2"
        />
      )}
    </div>
  );
};

export default InputAuth;
