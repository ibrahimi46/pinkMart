"use client";
import Button from "@/app/components/Button";
import assets from "@/assets";
import Link from "next/link";
import { useState } from "react";
import CreatePassword from "../components/CreatePassword";

const SignUp = () => {
  const [loginOption, setLoginOption] = useState<string>("email");
  const [showCreatePassword, setShowCreatePassword] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [secondName, setSecondName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async () => {
    const fullName = `${firstName} ${secondName}`;

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginOption === "email" ? email : null,
          phone: loginOption === "phone" ? phone : null,
          fullName: fullName,
          password: password,
        }),
      });
      console.log(email);
      console.log(phone);
      console.log(password);
      console.log(fullName);
      console.log(res);
      const data = await res.json();

      console.log(data);
      if (!res.ok) throw new Error(data.error || "Failed to sign up");
      window.location.href = "/auth/login";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex justify-center mt-4 md:mt-14">
      {showCreatePassword ? (
        <CreatePassword
          setFirstName={setFirstName}
          setSecondName={setSecondName}
          setPassword={setPassword}
          setShowCreatePassword={setShowCreatePassword}
          showCreatePassword={showCreatePassword}
          handleSubmission={handleSignUp}
        />
      ) : (
        <>
          <div className="md:w-96 w-80 flex flex-col">
            <p className="mb-6 text-h6 font-semibold">Sign Up</p>
            <div className="flex flex-col gap-6 items-center">
              <div className="bg-black-100 md:w-96 w-80 rounded-3xl p-5 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3">
                    <div
                      onClick={() => {
                        setLoginOption("email");
                      }}
                    >
                      <Button
                        name="Email"
                        icon={assets.icons.email}
                        iconPosition="left"
                        extraStyles={`rounded-lg w-24 py-1 px-3 gap-[6px] border bg-black-200
                   ${
                     loginOption === "email" &&
                     "border border-primary-600 bg-primary-100"
                   }`}
                        textStyles="text-body-md"
                      />
                    </div>
                    <div
                      onClick={() => {
                        setLoginOption("phone");
                      }}
                    >
                      <Button
                        name="Phone"
                        icon={assets.icons.phone}
                        iconPosition="left"
                        extraStyles={`rounded-lg w-24 py-1 px-3 gap-[6px] border bg-black-200 cursor-pointer
                   ${
                     loginOption === "phone" &&
                     "border border-primary-600 bg-primary-100"
                   }`}
                        textStyles="text-body-md"
                      />
                    </div>
                  </div>
                  <div>
                    {loginOption === "email" ? (
                      <>
                        <p className="text-body-md">Email</p>
                        <input
                          type="text"
                          placeholder="Enter your email"
                          className="border-2 w-full h-10 p-4 text-body-md rounded-md mt-2"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </>
                    ) : (
                      <>
                        <p className="text-body-md">Phone</p>
                        <input
                          type="tel"
                          placeholder="Enter your phone"
                          required
                          pattern="[0-9]{10}"
                          className="border-2 w-full h-10 p-4 text-body-md rounded-md mt-2"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </>
                    )}
                  </div>
                </div>
                <Button
                  name="Continue"
                  icon={assets.icons.arrow_right}
                  iconPosition="right"
                  extraStyles={`bg-primary-600 h-10 hover:border hover:border-black-700 hover:bg-primary-500 
                    transition-all duration-300`}
                  textStyles="text-black-100"
                  btnDisabled={
                    !loginOption || (loginOption === "email" ? !email : !phone)
                  }
                  handleOnClick={() => {
                    setShowCreatePassword(true);
                  }}
                />
              </div>
              <p>Or</p>
              <div className="w-full flex flex-col gap-3">
                <Button
                  name="Sign in with Google"
                  icon={assets.socials.google}
                  iconPosition="left"
                  extraStyles="h-12 text-body-md hover:border hover:border-black-400 hover:bg-black-200 transition-all duration-300"
                />
                <div className="flex justify-center mt-4">
                  <p className="text-body-sm">
                    Already have an account?
                    <Link
                      href="login"
                      className="text-primary-600 font-semibold"
                    >
                      &nbsp;&nbsp;Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default SignUp;
