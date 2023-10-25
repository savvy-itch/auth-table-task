"use client"

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { logIn, logOut } from '@/app/redux/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";

const TEST_USERNAME = "testuser";
const TEST_PASSWORD = "testpassword123";
const baseUrl = "https://technical-task-api.icapgroupgmbh.com/api";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  })
});

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const requestBody = {
        username: values.username,
        password: values.password
      }

      const response = await fetch(`${baseUrl}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (response.status === 200) {
        const data = await response.json();
        dispatch(logIn(values.username));
        router.push('/main-table');
        toast({
          description: "You've successfully logged in",
        });
      } else {
        dispatch(logOut());
        toast({
          variant: "destructive",
          description: "Authentication failed",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-zinc-400 space-y-8 p-4 rounded-md">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder={TEST_USERNAME} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder={TEST_PASSWORD} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">Sign In</Button>
      </form>
    </Form>
  )
}