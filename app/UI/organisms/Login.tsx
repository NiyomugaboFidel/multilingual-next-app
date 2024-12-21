"use client";
import Link from "next/link";
import Logo from "../atoms/Logo";
import FormField from "../molecules/FormField";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidationSchema } from "@/app/validations/LoginValidation";
import useLogin from "@/app/hooks/useLogin";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const router = useRouter()
  const { handleLogin, mutation } = useLogin();
  const methods = useForm({
    resolver: yupResolver(LoginValidationSchema),
  });
  const onSubmit = (data: any) => {
    handleLogin(data);
    methods.reset();
    const token = localStorage.getItem('token')
    if(mutation.isSuccess &&  token){
      router.push('/');
    }else{
      return
    }
  };

  return (
    <div className="w-full h-full min-h-[95vh]">
      <div className="w-full h-full min-h-[95vh] gap-5 flex flex-col items-center justify-between lg:pl-[50px]  xl:pl-[200px] 2xl:pl-[316px] lg:pr-[50px] ">
        <div className="w-full ">
          <Logo textDark="dark:text-[#ffffff]" textLight="text-[#ffffff]" />
        </div>
        <div className="h-full w-full flex flex-col gap-[24px]">
          <div className="w-full flex flex-col gap-[24px]">
            <h2 className="w-full text-headingH2 text-Gary-900 font-[600] dark:text-textColor-light">
              Welcome back
            </h2>
            <p className="w-full text-bodyDefault dark:text-[#CAD0D9] flex md:flex-row flex-col ">
              Do not have an account?{" "}
              <Link className="underline font-[500] px-1" href="/signup">
                Create an account
              </Link>
            </p>
          </div>

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-[24px]"
            >
              <FormField
                iconName={
                  methods.formState.errors.email ? "input-x.svg" : "input-v.svg"
                }
                placeholder="Email"
                name="email"
                id="email"
                registeration={methods.register("email")}
                errorMessage={methods.formState.errors.email?.message}
              />
              <FormField
                iconName={
                  methods.formState.errors.password
                    ? "input-x.svg"
                    : "input-v.svg"
                }
                placeholder="Password"
                name="password"
                id="password"
                type="password"
                registeration={methods.register("password")}
                errorMessage={methods.formState.errors.password?.message}
              />

              <div className="w-full flex justify-between lg:items-center lg:flex-row flex-col">
                <span className="flex items-center justify-start gap-2">
                  <span className="flex items-center justify-center">
                    <Input type="checkbox" />
                  </span>
                  <p className="text-bodyDefault dark:text-[#CAD0D9]">
                    Remember for 30 days
                  </p>
                </span>
                <span className="text-bodyDefault lg:text-end font-[500]">
                  <Link href="/forget-password">Forgot password?</Link>
                </span>
              </div>

              <div className="w-full">
                <Button
                  label={mutation.isPending ? 'Sign in...' : 'Sign in'}
                  type="submit"
                  isLoading={mutation.isPending}
                  disabled={mutation.isPending}
                  className="w-full text-center"
                />
              </div>
            </form>
          </FormProvider>

          <div className="w-full flex flex-col gap-[5px] 2xl:gap-[10px] justify-center">
            <div className="w-full flex gap-2">
              <span className="w-2/3 flex items-center justify-center">
                <span className="h-[2px] bg-gray-200 dark:bg-Gary-700 w-full"></span>
              </span>
              <span className="w-full flex items-center justify-center text-bodyDefault">
                Or continue with
              </span>
              <span className="w-2/3 flex items-center justify-center">
                <span className="h-[2px] bg-gray-200 dark:bg-Gary-700 w-full"></span>
              </span>
            </div>
            <div className="w-full flex md:flex-row flex-col justify-center items-center gap-[16px] dark:text-white">
              {["Google", "Facebook", "Apple"].map((item, index) => (
                <button
                  key={index}
                  className=" w-full border dark:border-Gary-700 px-[24px] py-[12px] rounded-[8px] dark:text-white bg-white dark:bg-primaryColor-dark text-[16px] leading-[24px] font-[500] text-Gary-700"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <span className="underline text-bodyDefault font-[600]">
            <Link href="/help">Need help?</Link>{" "}
          </span>
          <p className="text-bodyDefault dark:text-[#CAD0D9]">
            &copy; All rights reserved. Made by Virunga
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
