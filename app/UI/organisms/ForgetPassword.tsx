"use client";
import Link from "next/link";
import Logo from "../atoms/Logo";
import FormField from "../molecules/FormField";

import Button from "../atoms/Button";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgetPasswordValidationSchema } from "@/app/validations/ForgetPassword";

import { useRouter } from "next/navigation";

const Forgetpassword: React.FC = () => {
  const router = useRouter()

  const methods = useForm({
    resolver: yupResolver(ForgetPasswordValidationSchema),
  });
  const onSubmit = (data: any) => {
    console.log(data); 
    methods.reset();

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
            Forgot password?
            </h2>
            <p className="w-full text-bodyDefault dark:text-[#CAD0D9] flex md:flex-row flex-col ">
            Enter the email address you used when you joined and we’ll send you instructions to reset your password
             
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
            

              <div className="w-full">
                <Button
                  label={false? 'Reset password...' : 'Reset password'}
                  type="submit"
                //   isLoading={mutation.isPending}
                //   disabled={mutation.isPending}
                  className="w-full text-center"
                />
              </div>
            </form>
          </FormProvider>

        
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

export default Forgetpassword;
