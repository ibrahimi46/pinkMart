import Button from "@/app/components/Button";
import assets from "@/assets";

const Login = () => {
  return (
    <main className="flex justify-center mt-4 md:mt-14">
      <div className="md:w-96 w-80 flex flex-col">
        <p className="mb-6 text-h6 font-semibold">Login</p>
        <div className="flex flex-col gap-6 items-center">
          <div className="bg-black-100 md:w-96 w-80 rounded-3xl p-5 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <Button
                  name="Email"
                  icon={assets.icons.email}
                  iconPosition="left"
                  extraStyles="rounded-lg w-24 py-1 px-3 gap-[6px] border bg-black-200"
                  textStyles="text-body-md"
                  href=""
                />
                <Button
                  name="Phone"
                  icon={assets.icons.phone}
                  iconPosition="left"
                  extraStyles="rounded-lg w-24 py-1 px-3 gap-[6px] border bg-black-200"
                  textStyles="text-body-md"
                  href=""
                />
              </div>
              <div>
                <p className="text-body-md">Email</p>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="border-2 w-full h-10 p-4 text-body-md rounded-md mt-2"
                />
              </div>
            </div>
            <Button
              name="Continue"
              icon={assets.icons.arrow_right}
              iconPosition="right"
              extraStyles="bg-primary-600 h-10"
              textStyles="text-black-100"
              href=""
            />
          </div>
          <p>Or</p>
          <div className="w-full flex flex-col gap-3">
            <Button
              name="Sign in with Meta"
              icon={assets.socials.meta}
              iconPosition="left"
              textStyles="text-primary-600"
              extraStyles="h-12 text-body-md"
              href=""
            />
            <Button
              name="Sign in with Google"
              icon={assets.socials.google}
              iconPosition="left"
              extraStyles="h-12 text-body-md"
              href=""
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
