"use client"

import { cn } from "@/lib/utils";
import { FunctionComponent, useState } from "react";
import { Button } from "./ui/Button";
import {signIn} from 'next-auth/react'
import { Icons } from "./Icons";
import { useToast } from "@/hooks/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FunctionComponent<UserAuthFormProps> = ({
  className,
  ...props
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {toast} = useToast()

    const loginwithGoogle = async() => {
        setIsLoading(true)

        try {
            await signIn('google')
        } catch (error) {
            //toast notification
            toast({
              title: "There was a problem",
              description: "There was an error logging in with Google",
              variant: "destructive"
            })
            
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button onClick={loginwithGoogle} isLoading={isLoading}>
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-3" />}
        Google
        </Button>
    </div>
  );
};

export default UserAuthForm;
