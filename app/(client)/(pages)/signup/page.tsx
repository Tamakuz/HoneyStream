"use client";
import React, { useState } from 'react';
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
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { client } from '../../lib/hc';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const signupSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string()
    .email("Invalid email address")
    .refine(email => email.endsWith('@gmail.com') || email.endsWith('@yahoo.com'), {
      message: "Only Gmail and Yahoo email addresses are allowed"
    }),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
})

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<SignupFormValues>({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: toFormikValidationSchema(signupSchema),
    onSubmit: async (values: SignupFormValues) => {
      setIsLoading(true);
      try {
        const res = await client.api.user.signup.$post({
          json: values
        });
        const data = await res.json() as { error?: string; message?: string };
        
        if (res.status === 400 || res.status === 500) {
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.error('An error occurred');
          }
        } else {
          if (data.message) {
            toast.success(data.message);
            router.push('/login');
          } else {
            toast.success('Signup successful');
          }
        }
      } catch (error) {
        toast.error('A network error occurred');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
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
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    {...formik.getFieldProps('email')}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    className="pl-10"
                    {...formik.getFieldProps('password')}
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-red-500">{formik.errors.password}</p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            className="w-full"
            type="submit"
            onClick={() => formik.handleSubmit()}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing Up...
              </>
            ) : (
              'Sign Up'
            )}
          </Button>
          <div className="flex items-center justify-center w-full text-sm">
            <span className="text-muted-foreground">Already have an account?</span>
            <Link
              href="/login"
              className="ml-1 text-primary hover:underline"
            >
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;