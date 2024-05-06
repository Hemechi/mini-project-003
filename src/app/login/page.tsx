"use client";

import React, { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import style from "./style.module.css";
import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
type ValueTypes = {
	email: string;
	password: string;
};

const initialValues: ValueTypes = {
	email: "",
	password: "",
};

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string().required("Required"),
});

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
		// Toggle password visibility
	};

	//  handle submit
	const handleSubmit = (values: ValueTypes) => {
		setLoading(true);
		fetch(`http://localhost:3000/api/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			router.push('/')
			setLoading(false);

		})
		.catch((error) => {
			console.log(error);
			setLoading(false);
		});
	};

	if (loading) {
		return (
			<div className={`${style.container}`}>
				<h1 className="text-6xl text-center">Loading...</h1>
			</div>
		);
	}

	return (
		<main className={`${style.container}`}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values, actions) => {
					handleSubmit(values);
				}}
			>
				<Form className="bg-gray-100 p-4 rounded-lg w-96 shadow-lg">
					<h1 className={`${style.title}`}>Login</h1>
					{/* Email */}
					<div className="mb-5">
						<label className={`${style.label}`} htmlFor="email">
							Email
						</label>
						<Field
							type="email"
							name="email"
							id="email"
							className={`${style.input}`}
						/>
						<ErrorMessage
							name="email"
							component="section"
							className={`${style.error}`}
						/>
					</div>

					{/* Password */}
					<div className="mb-5">
						<label className={`${style.label}`} htmlFor="password">
							Password
						</label>
						<div className="relative">
							<Field
								type={showPassword ? "text" : "password"}
								name="password"
								id="password"
								className={`${style.input}`}
							/>
							{!showPassword ? (
								<IoEyeOffSharp
									onClick={() => handleShowPassword()}
									className="cursor-pointer absolute right-2 top-4"
								/>
							) : (
								<IoEyeSharp
									onClick={() => handleShowPassword()}
									className="cursor-pointer absolute right-2 top-4"
								/>
							)}
						</div>
						<ErrorMessage
							name="password"
							component="section"
							className={`${style.error}`}
						/>
					</div>

					{/* button submit */}
					<button type="submit" className={`${style.button}`}>
						Submit
					</button>
					<div className="grid grid-cols-2 gap-3 py-4">
						<button onClick={() => signIn('google', { callbackUrl: '/' })} className="bg-white hover:bg-base-color-green hover:text-white shadow-lg flex justify-center rounded-lg p-4">
							<FaGoogle />
						</button>
						<button onClick={() => signIn('github', { callbackUrl: '/' })} className="bg-white hover:bg-base-color-green hover:text-white shadow-lg flex justify-center rounded-lg p-4">
							<FaGithub />
						</button>
					</div>
					<div>
						Doesn't has an account?&nbsp;
						<Link className={`${style.link}`} href="/register">Create new account</Link>
					</div>
				</Form>
			</Formik>
		</main>
	);
}
