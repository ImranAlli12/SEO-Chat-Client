import React, { useEffect, useState } from 'react';
import { BiSolidHide, BiShow } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from '../redux/authReducer/action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import CustomInput from "../components/CommonComponents/CustomInput"
import CustomPasswordInput from '../components/CommonComponents/CustomPasswordInput';
import logo from "../assets/logo.jpg";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sign_up_processing = useSelector((state) => state.authReducer.sign_up_processing);
    const sign_up_message = useSelector((state) => state.authReducer.sign_up_message);
    const sign_up_success = useSelector((state) => state.authReducer.sign_up_success);
    const sign_up_failed = useSelector((state) => state.authReducer.sign_up_failed);
    const sign_in_success = useSelector((state) => state.authReducer.sign_in_success);

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });

    //  handel input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //  handel user input submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission or validation here

        const user = {
            name: formData.name.trim(),
            password: formData.password.trim(),
            email: formData.email.trim(),
        };

        if (
            user.password.length > 30 ||
            user.email.length > 40 ||
            user.name.length > 30 ||
            formData.confirmPassword.trim().length > 30
        ) {
            toast.error('Maximum input length exceeded', { position: toast.POSITION.BOTTOM_LEFT });
            return;
        } else if (user.password !== formData.confirmPassword.trim()) {
            toast.error('Passwords do not match', { position: toast.POSITION.BOTTOM_LEFT });
            return;
        } else if (user.password.length < 7) {
            toast.error('Password must be at least 8 characters long', { position: toast.POSITION.BOTTOM_LEFT });
            return;
        } else {
            dispatch(createAccount(user));
        }
    };

    //  set password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    //  useEffect
    useEffect(() => {

        //  if user already login
        if(sign_in_success){
            navigate('/');
        }

        //  sign up fail
        if (!sign_up_processing && sign_up_failed && !sign_up_success) {
            toast.error(sign_up_message, { position: toast.POSITION.BOTTOM_LEFT });
        }

        // sign up success
        if (!sign_up_processing && !sign_up_failed && sign_up_success) {
            toast.success('Account Successfully Created.', { position: toast.POSITION.BOTTOM_LEFT });

            setTimeout(() => {
                navigate('/signin');
            }, 1000);
        }
    }, [sign_up_processing, sign_up_success, sign_up_failed, sign_in_success]);

    return (
        <section className="bg-primary-100 dark:bg-white">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-primary-900 dark:text-green-600">
                    <img className="w-20 h-20 mr-2" src={logo} alt="logo" />
                    SEO Toolers Chat
                </a>
                <div className="w-full bg-primary-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-yellow-500">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-primary-900 md:text-2xl dark:text-black">
                            Sign up to continue.
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} action="#">

                            {/* user name input */}
                            <CustomInput
                                label="Your name"
                                value={formData.name}
                                onChange={handleChange}
                                name="name"
                                placeholder="Imran ALI"
                                required
                            />

                            {/* user email password */}
                            <CustomInput
                                label="Your email"
                                value={formData.email}
                                type="email"
                                onChange={handleChange}
                                name="email"
                                placeholder="Imraan.dev@example.com"
                                required
                            />

                            {/* password input */}
                            <CustomPasswordInput
                                label="Password"
                                value={formData.password}
                                onChange={handleChange}
                                name="password"
                                placeholder="••••••••"
                                required
                            />

                            {/* confirm password input */}
                            <CustomPasswordInput
                                label="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                name="confirmPassword"
                                placeholder="••••••••"
                                required
                            />


                            <button
                                type="submit"
                                disabled={sign_up_processing}
                                className={`w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-yellow-500 ${sign_up_processing ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {sign_up_processing ? (
                                    <div className="flex items-center justify-center">
                                        <span className="mr-2">Please wait</span>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                    </div>
                                ) : (
                                    'Sign Up'
                                )}
                            </button>

                            <p className="text-sm font-semibold text-primary-500 dark:text-primary-400">
                                Already have an account?{' '}
                                <span onClick={(e) => { navigate('/signin') }} className="cursor-pointer font-bold ml-2 text-primary-600 hover:underline dark:text-primary-500">
                                    Sign in
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </section>
    );
};

export default Signup;
