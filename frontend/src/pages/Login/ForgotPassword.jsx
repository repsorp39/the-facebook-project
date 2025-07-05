import React, { useState } from "react";
import getAxiosInstance from "../../config/axios-config";

function ForgotPassword({ setOpenForgetPasswordModal }) {
  const http = getAxiosInstance();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");


  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData(e.target);
      await http.post("/users/user.reset-code.php", data);
      setStep(2);
    } catch (err) {
      console.log(err);
      setError("Aucun n'utilisateur avec cet email n'existe.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCodeSent(e) {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const data = new FormData(e.target);
      data.append("email",email);
      await http.post("/users/user.forgot-password.php", data);
      setOpenForgetPasswordModal(false);
    } catch (err) {
      setError("Code entrer incorrecte ou déjà expiré!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {step === 1 && (
        <div>
          <div className='mx-auto modal is-active p-5'>
            <div className='modal-background'></div>
            <div className='modal-content bg-slate-100 p-5'>
              <p className='text-[16px] text-gray-500 mb-5 text-center'>
                Veuillez renseigner votre adresse email dans ce champ. Un code
                de récupération vous y sera envoyée.
              </p>
              <form onSubmit={handleSubmit}>
                {error && <p className='is-danger help text-center'> {error} </p>}
                <div>
                  <label
                    htmlFor='email'
                    className='text-xl mb-10 text-gray-400'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    className='input is-medium w-[300px] is-link mt-2'
                    placeholder='email@exemple.com'
                    autoFocus='true'
                    required
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    className={`button is-link float-right mt-4 w-full ${
                      loading ? "is-loading" : ""
                    }`}
                  >
                    Envoyer
                  </button>
                  <button
                    className='modal-close is-medium'
                    aria-label='close'
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenForgetPasswordModal(false);
                    }}
                  ></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className='mx-auto modal is-active p-5'>
            <div className='modal-background'></div>
            <div className='modal-content bg-slate-100 p-5'>
              <p className='text-[16px] text-gray-500 mb-5 text-center'>
                Un code vous a été envoyé à l'adresse <span>{email}</span>.
                Renseigner-le dans le champ ci-dessous.
              </p>
              <form onSubmit={handleCodeSent}>
                {error && <p className='is-danger help text-center'> {error} </p>}
                <div className='field'>
                  <p className='control'>
                    <label htmlFor='code' className='label '>
                      Entrer le code reçu
                    </label>
                    <input
                      type='text'
                      name='otp'
                      className='input is-medium w-[300px] is-link mt-2'
                      autoFocus='true'
                      required
                    />
                  </p>
                </div>
                <div className='field'>
                  <p className='control'>
                    <label htmlFor='password' className='label '>
                      Entrer votre nouveau mot de passe
                    </label>
                    <input
                      type='password'
                      name='password'
                      className='input is-medium w-[300px] is-link mt-2'
                      autoFocus='true'
                      required
                      minLength={8}
                    />
                  </p>
                </div>
                <div>
                  <button
                    className={`button is-link float-right mt-4 w-full ${
                      loading ? "is-loading" : ""
                    }`}
                  >
                    Envoyer
                  </button>
                </div>
                <button
                  className='modal-close is-medium'
                  aria-label='close'
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenForgetPasswordModal(false);
                  }}
                ></button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgotPassword;
