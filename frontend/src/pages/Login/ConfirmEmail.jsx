import React, { useEffect, useState } from "react";
import axios from "../../config/axios-config";
import { useNavigate, useSearchParams } from "react-router-dom";

const ConfirmEmail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [successfull, setSuccessful] = useState(false);
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  async function handleEmailConfirm() {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("token", token);
      const res = await axios.post("/users/user.confirm-email.php", formData);
      setSuccessful(true);
    } catch (err) {
      setSuccessful(false);
    } finally {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }

  useEffect(() => {
    if (email && token) handleEmailConfirm();
    else navigate("/");
  }, []);

  return (
    <>
      <article
        className={`message is-small w-[340px] mx-auto h-[300px] mt-10 ${
          successfull ? "is-success" : "is-danger"
        }`}
      >
        <div className='text-center message-header whitespace-nowrap'>
          {successfull ? (
            <p>Email confirmé avec succès</p>
          ) : (
            <p> L'email n'a pas pu être confirmé</p>
          )}
        </div>
        <div className='message-body'>
          <p>Vous serez redirigé vers l'accueil dans un moment ...</p>
        </div>
      </article>
    </>
  );
};

export default ConfirmEmail;
