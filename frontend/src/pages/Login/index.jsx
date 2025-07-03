import React, { useEffect, useState } from "react";
import { Mail, Lock } from "lucide-react";
import SiteMark from "../../components/SiteMark";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoggedInSelector,
  isLoggingState,
  loginErrorMessage,
  loginUser,
} from "../../store/features/user-slice";
import ForgotPassword from "./ForgotPassword";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = useSelector(isLoggedInSelector);
  const errorMessage = useSelector(loginErrorMessage);
  const loading = useSelector(isLoggingState);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [user, setUser] = useState({ email: "", password: "" });

  const [openForgotPasswordModal, setOpenForgetPasswordModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    dispatch(loginUser(data));
  }

  function validateEmail() {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)) {
      setEmailError("Veuillez renseigner une adresse email valide!");
    } else {
      setEmailError("");
    }
  }

  function handleChange(e) {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  }

  useEffect(() => {
    if (isLogin) navigate("/");
  }, [isLogin]);

  return (
    <>
      <section className={`flex flex-col items-center content-center ${openForgotPasswordModal ? "blur-sm":""}`}>
        <form
          className='mx-auto bg-white p-5 shadow-lg mt-10 w-[330px] md:w-[400px]'
          onSubmit={handleSubmit}
        >
          <SiteMark />
          {errorMessage && (
            <p className='help is-danger text-center'> {errorMessage} </p>
          )}
          <div className='field'>
            <label htmlFor='email' className='label'>
              Email
            </label>
            <p className='control has-icons-left'>
              <input
                className='input is-medium'
                id='email'
                type='email'
                placeholder='e.g. exemple@gmail.com'
                name='email'
                value={user.email}
                onChange={handleChange}
                onBlur={validateEmail}
                required
              />
              <span className='icon is-small is-left'>
                <Mail />
              </span>
            </p>
            {emailError && <p className='help is-danger'> {emailError} </p>}
          </div>
          <div className='field'>
            <label htmlFor='password' className='label'>
              Mot de passe
            </label>
            <p className='control has-icons-left'>
              <input
                id='password'
                className='input is-medium'
                type='password'
                placeholder='e.g. 123456'
                name='password'
                value={user.password}
                required
                onChange={handleChange}
              />
              <span className='icon is-small is-left'>
                <Lock />
              </span>
            </p>
            {passwordError && (
              <p className='help is-danger'> {passwordError} </p>
            )}
          </div>
          <div>
            <span
              className='hover:decoration-dashed text-[14px] text-gray-600 text-center hover:text-gray-500 cursor-pointer'
              onClick={() => setOpenForgetPasswordModal(true)}
            >
              Mot de passe oublié ?
            </span>
          </div>
          <div className='control'>
            <button
              className={`button is-link w-full mt-5 ${
                loading ? "is-loading" : ""
              }`}
              disabled={passwordError || emailError}
            >
              Se connecter
            </button>
          </div>
          <p className='text-center mt-4'>
            Pas encore de compte?
            <span>
              <Link
                to='/register'
                className='text-[14px] underline hover:decoration-dashed transition-all'
              >
                S'inscrire
              </Link>
            </span>
          </p>
        </form>
      </section>
      <section>
        {openForgotPasswordModal && (
          <ForgotPassword
            setOpenForgetPasswordModal={setOpenForgetPasswordModal}
          />
        )}
      </section>
    </>
  );
}

export default SignIn;
