import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import { db } from "../firebaseConfig"
import { setDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { useTasks } from "../TaskContext";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { PropagateLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Toast.css'


function AuthForm() {

    const { handleSetUserInfo } = useTasks();

    const [isRegister, setIsRegister] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showAuth, setShowAuth] = useState(false);

    const auth = getAuth();

    const navigate = useNavigate();

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
        userName: '',
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

    useEffect(() => {
        let timer;
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                timer = setTimeout(() => {
                    navigate("/all-tasks", { replace: true })
                }, 500)
            } else {
                setShowAuth(true)
            }
        });

        return () => {
            unsubscribe();
            clearTimeout(timer);
        };

    }, [navigate, auth]);

    const addUserToDb = async (name, email, uid) => {
        try {
            await setDoc(doc(db, "users", uid), {
                userName: name,
                userEmail: email,
                uid: uid
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const onSubmit = async (data) => {
        const { password, ...dataWithoutPassword } = data
        try {
            if (isRegister) {
                const userCredential = await createUserWithEmailAndPassword(auth, data.email, password);
                const user = userCredential.user;
                addUserToDb(data.userName, data.email, user.uid)

                let userInfoData = {
                    ...dataWithoutPassword,
                    uid: user.uid
                }

                handleSetUserInfo(userInfoData)

                toast.success('Registration successful!');
                navigate("/all-tasks")
            } else {
                await signInWithEmailAndPassword(auth, data.email, password);

                toast.success('Login successful!');
                navigate("/all-tasks")
            }
            reset(defaultValues);
        }
        catch (error) {
            const errorMap = {
                'auth/email-already-in-use': 'Email already in use',
                'auth/invalid-email': 'Invalid email address',
                'auth/invalid-credential': 'Invalid password',
                'auth/weak-password': 'Password should be at least 6 characters',
                'auth/too-many-requests': 'Slow down',
                'auth/user-not-found': 'Invalid email or password',
                'auth/wrong-password': 'Invalid email or password',
                'auth/operation-not-allowed': 'This operation is not allowed', // new
                'auth/account-exists-with-different-credential': 'Account exists with different credential', // new
                'auth/requires-recent-login': 'Please login again to perform this action', // new
                'auth/user-disabled': 'This account has been disabled', // new
                'auth/network-request-failed': 'Network error, please try again', // new
                'auth/provider-already-linked': 'This provider is already linked', // new
                'auth/credential-already-in-use': 'This credential is already in use' // new
            };
            const errorMessage = errorMap[error.code] || error.message;
            toast.error(errorMessage);
        }
    };

    if (!showAuth) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <div className="text-center">
                    <PropagateLoader
                        color="#16A34A"
                        loading
                        size={25}
                    />
                </div>
            </div>
        )
    }

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
                                {...register("userName", {
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
                            {errors.userName && <p className="text-red-600 ml-2 -mt-4 text-sm">{errors.userName.message}</p>}
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
