/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import loginimg from "../../assets/login.jpg";


type AdminForm = { email: string; password: string };
type UserForm = { phone: string; password: string };

export default function Login({ initialUserType = "Admin" }) {
  const [userType, setUserType] = useState<"Admin" | "User">(
    initialUserType as "Admin" | "User"
  );

  const router = useRouter();

  const adminSchema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const userSchema = yup.object({
    phone: yup.string().required("Phone is required"),
    password: yup.string().required("Password is required"),
  });

  const adminForm = useForm<AdminForm>({
    resolver: yupResolver(adminSchema),
  });

  const userForm = useForm<UserForm>({
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    adminForm.reset();
    userForm.reset();
  }, [userType]);

  const onSubmitAdmin = (data: AdminForm) => {
    console.log("Admin Login data:", data);
    handleLogin("Admin");
  };

  const onSubmitUser = (data: UserForm) => {
    console.log("User Login data:", data);
    handleLogin("User");
  };

  const handleLogin = (type: "Admin" | "User") => {
    const fakeToken = `${type.toLowerCase()}-token-${Date.now()}`;
    localStorage.setItem("authToken", fakeToken);
    localStorage.setItem("role", type);

    toast.success("Login successful!");
    router.push(`/dashboard/${type.toLowerCase()}`);
  };

  return (
    <div style={{background:'rgba(23, 110, 109, 0.1)'}} >
      <div className="flex">
        <div className="hidden lg:block flex-1 h-screen flex-grow">
          <img
            className="h-full w-full object-cover"
            src={loginimg.src}
            alt="Login"
          />
        </div>

        <div className="h-screen flex-1 flex flex-grow items-center justify-center px-2 lg:px-12">
          <div
            className="flex flex-col w-full mx-1 lg:mx-16 p-[20px] lg:p-[40px] items-center"
            style={{
              minHeight: "400px",
              border: "3px solid #fcfefe",
            }}
          >
            <div className="flex gap-6 mb-6">
              {["Admin", "User"].map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={type}
                    name="userType"
                    checked={userType === type}
                    onChange={() =>
                      setUserType(type as "Admin" | "User")
                    }
                    className="cursor-pointer"
                  />
                  <label htmlFor={type} className="cursor-pointer">
                    {type}
                  </label>
                </div>
              ))}
            </div>

            {userType === "Admin" ? (
              <form
                className="w-full"
                onSubmit={adminForm.handleSubmit(onSubmitAdmin)}
              >
                <h2 className="mb-6 text-2xl font-semibold uppercase">
                  Admin Login
                </h2>

                {/* Email */}
                <div className="mb-4">
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="border px-3 py-2 border-gray-300 text-[12px] w-full"
                    {...adminForm.register("email")}
                  />
                  <small className="text-red-600 text-xs font-bold">
                    {adminForm.formState.errors.email?.message}
                  </small>
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="block mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="border px-3 py-2 border-gray-300 text-[12px] w-full"
                    {...adminForm.register("password")}
                  />
                  <small className="text-red-600 text-xs font-bold">
                    {adminForm.formState.errors.password?.message}
                  </small>
                </div>

                {/* Submit */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[#5e947a] text-white rounded hover:bg-[#4F8A6D] transition duration-150 cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </form>
            ) : (
              <form
                className="w-full"
                onSubmit={userForm.handleSubmit(onSubmitUser)}
              >
                <h2 className="mb-6 text-2xl font-semibold uppercase">
                  User Login
                </h2>

                <div className="mb-4">
                  <label className="block mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    className="border px-3 py-2 border-gray-300 text-[12px] w-full"
                    {...userForm.register("phone")}
                  />
                  <small className="text-red-600 text-xs font-bold">
                    {userForm?.formState?.errors.phone?.message}
                  </small>
                </div>

                <div className="mb-4">
                  <label className="block mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="border px-3 py-2 border-gray-300 text-[12px] w-full"
                    {...userForm.register("password")}
                  />
                  <small className="text-red-600 text-xs font-bold">
                    {userForm.formState.errors.password?.message}
                  </small>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[#5e947a] text-white rounded hover:bg-[#4F8A6D] transition duration-150 cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
