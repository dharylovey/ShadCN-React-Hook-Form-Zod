"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./LoginSchema";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

// {/* <FaRegEye /> */}
// {/* <FaRegEyeSlash /> */}

import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

type LoginSchema = z.infer<typeof schema>;
export default function LoginForm() {
    const [isOpen, setIsOpen] = useState(false)

    const togglePasswordVisibility = () => {
        setIsOpen(!isOpen)
    }

    const form = useForm<LoginSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: '',
        },
    });

    const { formState: { isSubmitting }, reset } = form

    const onSubmit = async (data: LoginSchema) => {
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            const resData = await response.json()
            console.log(resData)

            reset()

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Form {...form}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">Login</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">Register an account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@gmail.com" {...field} />
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
                                        <div className="relative flex items-center">

                                            <Input placeholder={isOpen ? "********" : "Password"} {...field} type={isOpen ? "text" : "password"} />
                                            <button onClick={togglePasswordVisibility} className="absolute right-2">
                                                {isOpen ? <FaRegEyeSlash /> : <FaRegEye />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full mb-4" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Loading..." : "Login"}
                        </Button>
                        <Separator />
                        <p className="text-center">Don't have an account? <Link href="/register" className="hover:underline text-sky-500">Register</Link></p>
                    </form>
                </CardContent>
            </Card>
        </Form>
    );
}
