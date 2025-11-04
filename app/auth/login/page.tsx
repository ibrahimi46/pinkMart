"use client";
import Button from "@/app/components/Button";
import assets from "@/assets";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  const [loginOption, setLoginOption] = useState<string>("email");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email ? email : null,
          phone: phone ? phone : null,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to login");
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex justify-center mt-4 md:mt-14">
      <div className="md:w-96 w-80 flex flex-col">
        <p className="mb-6 text-h6 font-semibold">Login</p>
        <div className="flex flex-col gap-6 items-center">
          <div className="bg-black-100 md:w-96 w-80 rounded-3xl p-5 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div onClick={() => setLoginOption("email")}>
                  <Button
                    name="Email"
                    icon={assets.icons.email}
                    iconPosition="left"
                    extraStyles={`rounded-lg w-24 py-1 px-3 gap-[6px] border bg-black-200 hover:bg-black-300
                  focus:border focus:border-primary-600
                  ${
                    loginOption === "email" &&
                    "border border-primary-600 bg-primary-100"
                  }

                  focus:bg-primary-100`}
                    textStyles="text-body-md"
                  />
                </div>
                <div onClick={() => setLoginOption("phone")}>
                  <Button
                    name="Phone"
                    icon={assets.icons.phone}
                    iconPosition="left"
                    extraStyles={`rounded-lg w-24 py-1 px-3 gap-[6px] border ${
                      loginOption === "phone" &&
                      "border border-primary-600 bg-primary-100"
                    } bg-black-200 cursor-pointer hover:bg-black-300
                  focus:border focus:border-primary-600 focus:bg-primary-100`}
                    textStyles="text-body-md"
                  />
                </div>
              </div>
              <div>
                {loginOption === "email" ? (
                  <div className="flex flex-col gap-2">
                    <p className="text-body-md">Email</p>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      className="border-2 w-full h-10 p-4 text-body-md rounded-md"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="text-body-md">Password</p>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="border-2 w-full h-10 p-4 text-body-md rounded-md"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <p className="text-body-md">Phone</p>
                    <input
                      type="text"
                      placeholder="Enter your phone"
                      className="border-2 w-full h-10 p-4 text-body-md rounded-md"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <p className="text-body-md">Password</p>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="border-2 w-full h-10 p-4 text-body-md rounded-md"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            <Button
              name="Continue"
              icon={assets.icons.arrow_right}
              iconPosition="right"
              extraStyles="bg-primary-600 h-10 hover:border hover:border-black-700 hover:bg-primary-500 transition-all duration-300"
              textStyles="text-black-100"
              handleOnClick={handleLogin}
            />
          </div>
          <p>Or</p>
          <div className="w-full flex flex-col gap-3">
            <Button
              name="Sign in with Google"
              icon={assets.socials.google}
              iconPosition="left"
              extraStyles="h-12 text-body-md hover:border hover:border-black-400 hover:bg-black-200 transition-all duration-300"
              handleOnClick={() => signIn("google", { callbackUrl: "/" })}
            />
          </div>
          <div className="flex justify-center mt-4">
            <p className="text-body-sm">
              Don&apos;t have an account?
              <Link href="sign-up" className="text-primary-600 font-semibold">
                &nbsp;&nbsp;Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
