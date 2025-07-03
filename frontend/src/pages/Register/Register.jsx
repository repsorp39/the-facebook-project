import React, { useEffect, useState } from 'react';
import { Mail,Lock,UsersRound,UserRound, VenusAndMars, Cake } from 'lucide-react';
import SiteMark from '../../components/SiteMark';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  isLoggedInSelector, 
  registerError,
  isRegisteringSelector,
  registerUser, 
} from '../../store/features/user-slice';

function Register() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
  
   const isLogin = useSelector(isLoggedInSelector);
   const errorMessage = useSelector(registerError);
   const loading = useSelector(isRegisteringSelector);

   const [formError,setFormError] = useState({});
   const [user,setUser] = useState({
    email:'',
    password:'',
    firstname:'',
    lastname:'',
    birthday:'',
    gender:''
   });

   const isInvalidForm = Object.keys(formError).some((key) => Boolean(formError[key]));

  async function handleSubmit(e){
      e.preventDefault();
      const data = new FormData(e.target);
      dispatch(registerUser(data));
    }

  const validate = {
    password(){
      if(!user.password.trim() || user.password.length <7){
        setFormError({...formError,password:'Votre mot de passe doit faire au moins 8 caracères'});
      }else{
        setFormError({...formError,password:''});
      }
    },
    email(){
      if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)){
        setFormError({...formError,email:'Veuillez renseigner une adresse email valide'});
      }else{
        setFormError({...formError,email:""});
      }
    },
    firstname(){
      if(!/[A-Za-z éÉÈ']/.test(user.firstname)){
        setFormError({...formError,firstname:"Veuillez entrer un prénom valide"});
      }
      else{
        setFormError({...formError,firstname:""});
      }
    },
    lastname(){
      if(!/[A-Za-z éÉÈ']/.test(user.lastname)){
        setFormError({...formError,lastname:"Veuillez entrer un nom valide"});
      }
      else{
        setFormError({...formError,lastname:""});
      }
    },
  }


  function handleChange (e){
    const { value, name } = e.target;
    setUser({ ...user, [name]:value});
  }

  useEffect(()=>{
    if(isLogin) navigate("/");
  },[isLogin])

  return (
      <section className='flex flex-col justify-center content-center'>
        <form
          className=' bg-white p-5 shadow-lg mt-10 w-[330px] sm:w-[400px] md:w-[600px] mx-auto' 
          onSubmit={handleSubmit}
        >
          <SiteMark />
            {
              errorMessage && <p className="help is-danger text-center"> { errorMessage } </p>
            }
            <div className="field">
                <label htmlFor="email" className='label'>Email</label>
                <p className="control has-icons-left">
                  <input 
                    className="input" 
                    id='email'
                    type="email" 
                    placeholder="e.g. exemple@gmail.com" 
                    name='email'
                    value={user.email}
                    onChange={handleChange}
                    onBlur={validate.email}
                    required
                  />
                  <span className="icon is-small is-left">
                    <Mail />
                  </span>
                </p>
                { formError.email && <p className='help is-danger'> { formError.email } </p>}
            </div>
            <div className="field">
                <label htmlFor="password" className='label'>Mot de passe</label>
                <p className="control has-icons-left">
                  <input 
                    id='password'
                    className="input" 
                    type="password" 
                    placeholder="e.g. 123456"
                    name='password'
                    value={user.password}
                    onBlur={validate.password}
                    required
                    onChange={handleChange}
                  />
                  <span className="icon is-small is-left">
                    <Lock />
                  </span>
                </p>
                { formError.password && <p className='help is-danger'> { formError.password } </p>}
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="field w-full md:w-[260px]">
                <label htmlFor="firstname" className='label'>Prénoms</label>
                <p className="control has-icons-left">
                  <input 
                    className="input" 
                    id='firstname'
                    type="firstname" 
                    placeholder="e.g. John" 
                    name='firstname'
                    value={user.firstname}
                    onChange={handleChange}
                    onBlur={validate.firstname}
                    required
                  />
                  <span className="icon is-small is-left">
                    <UsersRound />
                  </span>
                </p>
                { formError.firstname && <p className='help is-danger'> { formError.firstname } </p>}
              </div>
              <div className="field w-full md:w-[260px]">
                <label htmlFor="lastname" className='label'>Nom</label>
                <p className="control has-icons-left">
                  <input 
                    id='lastname'
                    className="input" 
                    type="lastname" 
                    placeholder="e.g. Doe"
                    name='lastname'
                    value={user.lastname}
                    onBlur={validate.lastname}
                    required
                    onChange={handleChange}
                  />
                  <span className="icon is-small is-left">
                    <UserRound />
                  </span>
                </p>
                { formError.lastname && <p className='help is-danger'> { formError.lastname } </p>}
            </div>
        </div>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="field w-full md:w-[260px]">
                <label htmlFor="birthday" className='label'>Date de naissance</label>
                <p className="control has-icons-left">
                  <input 
                    className="input" 
                    id='birthday'
                    type="date" 
                    name='birthday'
                    value={user.birthday}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon is-small is-left">
                    <Cake />
                  </span>
                </p>
              </div>
              <div className="field">
                <label htmlFor="gender" className='label'>Genre</label>
                <div className="control has-icons-left">
                  <div className='select w-full'>
                      <select name="gender" id="gender" defaultValue="M" className='w-full md:w-[260px]'>
                          <option value="M">Masculin</option>
                          <option value="F">Féminin</option>
                      </select>
                  </div>
                  <span className="icon is-small is-left">
                     <VenusAndMars />
                  </span>
                </div>
            </div>
        </div>
          <div className="control">
            <button
              disabled={isInvalidForm}
              className={`button is-link w-full mt-5 ${loading ?  "is-loading": ""}`}
              >
              S'inscrire
            </button>
          </div>
          <p className='text-center mt-4 text-[14px]'>
            Déjà un compte ? 
                <span>
                  <Link to="/login" className='underline hover:decoration-dashed transition-all'>
                      Se connecter
                  </Link>
              </span>
            </p>
        </form>
      </section>
  );
}

export default Register;