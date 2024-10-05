"use client";
import Link from "next/link";
import Logo from "../atoms/Logo";
import FormField from "../molecules/FormField";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupValidationSchema } from "@/app/validations/SignupValidation";
import useSignup from "@/app/hooks/useSignup";
import { useRouter } from "next/navigation";


const SignUp: React.FC = () => {
  const router = useRouter();
  const {handleSignup, mutation} = useSignup()
  const methods = useForm({
    resolver: yupResolver(SignupValidationSchema),
  });

  const onSubmit = (data: any) => {
   handleSignup(data);
   methods.reset();
   const token = localStorage.getItem('token')
   if(mutation.isSuccess &&  token){
     router.push('/');
   }else{
     return
   }
  };

  return (
    <div className="w-full h-full ">
      <div className="w-full h-full  gap-5 flex flex-col items-center justify-between lg:pl-[50px]  xl:pl-[200px] 2xl:pl-[316px] lg:pr-[50px] ">
        <div className="w-full ">
          <Logo textDark="dark:text-[#ffffff]" textLight="text-[#ffffff]" />
        </div>
        <div className="h-full w-full  flex flex-col gap-[24px]">
          <div className=" w-full flex flex-col gap-[24px]">
            <h2 className="w-full text-headingH2 text-Gary-900 font-[600] dark:text-textColor-light">
              Create an account
            </h2>
            <p className=" w-full text-bodyDefault dark:text-[#CAD0D9] flex md:flex-row flex-col ">
              I already have an account{" "}
              <Link className="underline font-[500] px-1" href="/login">
                Sign in
              </Link>
            </p>
          </div>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-[24px] "
            >
              <FormField
                iconName={
                  methods.formState.errors.firstName
                    ? "input-x.svg"
                    : "input-v.svg"
                }
                placeholder="FirstName"
                name="firstName"
                id="firstName"
                registeration={methods.register("firstName")}
                errorMessage={methods.formState.errors.firstName?.message}
              />
              <FormField
                iconName={
                  methods.formState.errors.lastName
                    ? "input-x.svg"
                    : "input-v.svg"
                }
                placeholder="LastName"
                name="lastName"
                id="lastName"
                registeration={methods.register("lastName")}
                errorMessage={methods.formState.errors.lastName?.message}
              />
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
                placeholder="password"
                name="password"
                id="password"
                type="password"
                registeration={methods.register("password")}
                errorMessage={methods.formState.errors.password?.message}
              />
              <div className=" w-full  flex  flex-col gap-[10px]">
                <span className="flex items-center justify-center gap-2">
                  <span className="flex  items-center justify-center">
                    <Input type="checkbox" onChange={() => {}} value="" />
                  </span>
                  <p className="w-full text-start text-bodyDefault dark:text-[#CAD0D9]">
                    Save the password
                  </p>
                </span>
                <span className="flex items-start justify-start gap-2">
                  <span className="flex  items-center justify-center">
                    <Input
                      name=""
                      type="checkbox"
                      onChange={() => {}}
                      value=""
                    />
                  </span>
                  <p className="w-full text-start text-bodyDefault dark:text-[#CAD0D9]">
                    I would like to receive personalized commercial offers from
                    Cartzilla by email.
                  </p>
                </span>
              </div>
              <div className="w-full">
                <Button
                  label={mutation.isPending ? "Create an account...": "Create an account"}
                  type="submit"
                  className=" w-full  text-center"
                  isLoading={mutation.isPending}
                  disabled={mutation.isPending}
                />
              </div>
            </form>
          </FormProvider>
          <div className=" w-full flex flex-col gap-[5px] 2xl:gap-[10px] justify-center ">
            <div className=" w-full flex gap-2">
              <span className="w-2/3 flex items-center justify-center  ">
                <span className="h-[2px] bg-gray-200 dark:bg-Gary-700 w-full"></span>
              </span>
              <span className=" w-full flex items-center justify-center text-bodyDefault text-center ">
                Or continue with
              </span>
              <span className="w-2/3  flex items-center justify-center">
                <span className="h-[2px] bg-gray-200 dark:bg-Gary-700 w-full"></span>
              </span>
            </div>
            <div className=" w-full flex md:flex-row flex-col justify-center items-center gap-[16px] dark:text-white">
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
          <span className="underline text-bodyDefault font-[600] ">
            <Link href={"/help"}>Need help?</Link>{" "}
          </span>
          <p className="text-bodyDefault dark:text-[#CAD0D9]">
            {" "}
            &copy; All rights reserved. Made by Virunga
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
