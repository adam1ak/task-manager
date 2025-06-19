import { useState } from "react";
import { useForm } from 'react-hook-form';

import { auth } from "../firebaseConfing"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget this line!
import '../styles/Toast.css'

function AuthForm() {

    const [isRegister, setIsRegister] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [authPopup, setAuthPopup] = useState('')

    const authQuotes = {
        register: {
            title: "Sign Up",
            quote: "One account. All your tasks. Zero chaos.",
            cta: "Create Account",
            switchText: "Already have an account?",
            switchAction: "Log In"
        },
        login: {
            title: "Welcome Back",
            quote: "Your unfinished tasks are waiting.",
            cta: "Log In",
            switchText: "Need an account?",
            switchAction: "Sign Up"
        }
    };

    const { title, quote, cta, switchText, switchAction } =
        isRegister ? authQuotes.register : authQuotes.login;

    const defaultValues = {
        name: '',
        email: '',
        password: ''
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm({
        defaultValues,
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all'
    });

    const onSubmit = async (data) => {
        try {
            if (isRegister) {
                await createUserWithEmailAndPassword(auth, data.email, data.password);
                toast.success('Registration successful!');
            } else {
                await signInWithEmailAndPassword(auth, data.email, data.password);
                toast.success('Login successful!');
            }
            reset(defaultValues);
        } catch (error) {
            let errorMessage = '';
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'Email already in use';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/invalid-credential':
                    errorMessage = "Invalid password";
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Password should be at least 6 characters';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = "Slow down"
                    break;
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    errorMessage = 'Invalid email or password';
                    break;
                default:
                    errorMessage = error.message;
            }
            toast.error(errorMessage);
        }
    };

    return (

        <div className="flex items-center justify-center w-full">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                limit={1}
            />
            <div className="
                flex flex-col items-center
                py-6
                auth_form-overlay
                rounded-xl
                w-full max-w-sm h-fit
                px-6
            ">
                <div className="header flex flex-col items-center mb-4">
                    <h1 className="text-lg font-medium mb-0.5">{title}</h1>
                    <p className=" text-center">{quote}</p>
                </div>
                <form className="
                    flex flex-col gap-5
                    w-full
                    px-4
                "
                    onSubmit={handleSubmit(onSubmit)} noValidate>
                    {isRegister && (
                        <>
                            <input
                                type="text"
                                placeholder="John"
                                className="input-shape"
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Name must be atleast 3 characters"
                                    },
                                    maxLength: {
                                        value: 25,
                                        message: "Name cannot exceed 25 characters"
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9]{2,}$/i,
                                        message: "Invalid name format",
                                    },
                                    validate: (value) => value.trim() !== "" || "Name cannot be empty"
                                })} />
                            {errors.name && <p className="text-red-600 ml-2 -mt-4 text-sm">{errors.name.message}</p>}
                        </>
                    )}
                    <input
                        type="email"
                        placeholder="johndoe@example.com"
                        className="input-shape"
                        {...register("email", {
                            required: "Email is required",
                            maxLength: {
                                value: 25,
                                message: "Email cannot exceed 25 characters"
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email format",
                            },
                            validate: (value) => value.trim() !== "" || "Email cannot be empty"
                        })} />
                    {errors.email && <p className="text-red-600 ml-2 -mt-4 text-sm">{errors.email.message}</p>}
                    <div className="w-full flex items-center">
                        <input className="
                            w-full
                            input-shape
                        "
                            type={showPassword ? "text" : "password"}
                            placeholder="johndoe1234"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be atleast 6 characters"
                                },
                                maxLength: {
                                    value: 25,
                                    message: "Password cannot exceed 25 characters"
                                },
                                validate: (value) => value.trim() !== "" || "Password cannot be empty"
                            })} />
                        <button className="
                            absolute translate-x-64 ml-3
                        "
                            onClick={(e) => { setShowPassword(prev => !prev); e.preventDefault() }}
                        >{showPassword ? <FaRegEyeSlash className="text-xl" /> : <FaRegEye className="text-xl" />}</button>
                    </div>
                    {errors.password && <p className="text-red-600 ml-2 -mt-4 text-sm">{errors.password.message}</p>}
                    <button
                        type="submit"
                        className="
                            bg-gray-50 text-[#181818]
                            py-1.5 rounded-md font-medium
                            disabled:bg-gray-50/75
                        "
                        disabled={!isValid}
                    >{cta}</button>
                </form>
                <div className="footer flex flex-col items-center mt-1">
                    {isRegister && (
                        <p className="text-center text-xs max-w-64 mb-6">
                            By signing up to create an account I accept{' '}
                            <a href="#x" className="font-semibold">Terms of Use</a>{' '}
                            and{' '}
                            <a href="#x" className="font-semibold">Privacy Policy</a>
                        </p>
                    )}
                    <p>
                        {switchText}
                        <a
                            className="ml-4 underline underline-offset-2"
                            href="#x"
                            onClick={() => setIsRegister(prev => !prev)}>{switchAction}</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
