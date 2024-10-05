"use client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import api from "../lib/Axios";

interface Signup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  
}


async function signupUser(data: Signup) {
  const response = await api.post("/user/create", data);
  return response.data; 
}

const useSignup = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: signupUser,
    onError: (error: any) => {
      console.error("Signup error:", error);
      if (error.response && error.response.data) {
        console.error("Detailed error message from server:", error.response.data);
        toast.error(error.response.data.error ||error.response.data.message ||'Signup failed. Please try again.',{
          position:"top-right"
        })
      } else {
       
        console.log('Signup failed. Please try again.')
        toast.error('Signup failed. Please try again.',{
          position:"top-right"
        })
  
      }
    },
    onSuccess: (data) => {

      if (data.token) {
        localStorage.setItem("token", JSON.stringify(data.token));
        toast.success( data.message || 'Sign Up successfully, check email for more.',{
          position:"top-right"
        })
        router.push('/login')
      }
    },
  });


  const handleSignup = (data: Signup) => {
    
    mutation.mutate(data);
  };

  return { handleSignup, mutation }; 
};

export default useSignup;
