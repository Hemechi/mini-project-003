"use client"
import { Field, Form, Formik ,ErrorMessage} from 'formik'
import React from 'react'
import * as Yup from "yup"
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";

const validatationSchema = Yup.object().shape({
    email:Yup.string().email("Email ").required("Email is requried"),
    password :Yup.string().required("password is requried"),
    confirmPassword:Yup.string().oneOf([Yup.ref("password")],"password must match").required("ConfirmPassword is requried"),
    lastName:Yup.string().min(3,"Last Name is too short").required("last Name is requried"),
    firstName:Yup.string().min(3,"first Name is too short").required("Frist Name is requried")
})

const fieldStyle ="border border-grey-300 rounded-md"
const baseApi="/store.istad.co/"

export default function RegisterForm() {
  const [viewPassword, setViewPassword]= React.useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = React.useState(false);
  function handleViewPassword(){
    setViewPassword(!viewPassword)
}
function handleViewConfirm() {
  setViewConfirmPassword(!viewConfirmPassword);
}
  async function handleRegister  (values:any){
      const {email, password, confirmPassword, firstName, lastName} = values
     
    try{
        const postData = await fetch(`${baseApi}user/register/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              email,
              password1: password,
              password2: confirmPassword,
              first_name: firstName,
              last_name: lastName
          })
      })
      const res = await postData.json()
      if(res.ok){
        console.log("User registered successfully")
      } else{
        console.log("Fail to register user ")
      }
    }catch(error)
    {
      console.log(error)
    }
  }
  return (
    <div className="w-[500px] bg-white rounded-lg shadow-sm">
      <Formik
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          handleRegister(values)
          setSubmitting(false)
        }}
        validationSchema={validatationSchema }
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex m-[30px] flex-col gap-4">
            {/* email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email: </label>
              <Field
                placeholder="example@gmail.com"
                className={fieldStyle}
                name="email"
                type="email"
              />
              <ErrorMessage name="email">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage>
            </div>
            {/* password */}
            <div className="flex relative flex-col gap-2">
              <label htmlFor="email">Password: </label>
              <Field
                placeholder="password"
                className={fieldStyle}
                name="password"
                type={viewPassword ? "text" : "password"}
              />
              <div
                onClick={() => handleViewPassword()}
                className="absolute cursor-pointer top-[45px] right-[20px]"
              >
                {viewPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              <ErrorMessage name="password">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage>
            </div>

            {/* confirm password */}
            <div className="flex relative flex-col gap-2">
              <label htmlFor="email">Confirm Password: </label>
              <Field
                placeholder="confirm password"
                className={fieldStyle}
                name="confirmPassword"
                type={viewConfirmPassword ? "text" : "password"}
              />
               <div
                onClick={() => handleViewConfirm()}
                className="absolute cursor-pointer top-[45px] right-[20px]"
              >
                {viewConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              <ErrorMessage name="confirmPassword">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage>
            </div>

            {/* first name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName">Firstname: </label>
              <Field
                placeholder="Firstname"
                className={fieldStyle}
                name="firstName"
                type="text"
              />
              <ErrorMessage name="firstName">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage>
            </div>

            {/* last name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName">Lastname: </label>
              <Field
                placeholder="Lastname"
                className={fieldStyle}
                name="lastName"
                type="text"
              />
              <ErrorMessage name="lastName">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-pink-600 text-white rounded-md"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

