"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail, Lock, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const result = await signIn('credentials', {
          username: values.username,
          password: values.password,
          redirect: false,
        });

        if (result?.error) {
          toast.error(result?.error);
          console.log(result?.error);
        } else {
          toast.success('Login successful');
          router.push('/');
        }
      } catch (error) {
        toast.error('An error occurred during login');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    className="pl-10"
                    {...formik.getFieldProps('username')}
                  />
                </div>
                {formik.touched.username && formik.errors.username && (
                  <p className="text-sm text-red-500">{formik.errors.username}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    {...formik.getFieldProps('password')}
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-red-500">{formik.errors.password}</p>
                )}
              </div>
            </div>
            <CardFooter className="flex flex-col space-y-2 px-0 pt-6">
              <Button
                className="w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Log in'
                )}
              </Button>
              <div className="flex items-center justify-between w-full text-sm">
                <Link
                  href="/forgot-password"
                  className="text-muted-foreground hover:text-primary"
                >
                  Forgot password?
                </Link>
                <Link
                  href="/signup"
                  className="text-muted-foreground hover:text-primary"
                >
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
