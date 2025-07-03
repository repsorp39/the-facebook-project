import React from "react";
import { Edit } from "lucide-react";

const EditProfile = ({ setIsEditingProfile, user, handleEdit}) => {

  async function handleSubmit(e){
    e.preventDefault();
    const { email, firstname, lastname, gender, birthday } = e.target;

    const updatedUser = { 
      ...user,
      firstname:firstname.value,
      email:email.value,
      lastname:lastname.value,
      gender:gender.value,
      birthday:birthday.value
    }

    handleEdit(null,updatedUser);
  }

  return (
    <div>
      <div className='mx-auto modal is-active p-5'>
        <div className='modal-background'></div>
        <div className='modal-content bg-white rounded-xl'>
          <form
            className='[&_input]:w-full [&_input]:border-2  [&_input]:outline-none  [&_input]:p-2  py-10 w-[330px] sm:w-[400px] md:w-[600px] mx-auto'
            onSubmit={handleSubmit}
          >
            <div className='flex items-center mb-5 text-xl font-bold text-black'>
              <Edit className='me-2' /> Modifier vos informations
            </div>

            <div className='mb-2'>
              <label htmlFor='email' className='block font-bold mb-2'>
                Email
              </label>
              <input
                type='email'
                className='focus:ring-1 focus:ring-blue-500'
                name='email'
                defaultValue={user.email}
                required
              />
            </div>
            <div className='mb-2'>
              <label htmlFor='firstname' className='block font-bold mb-2'>
                Prénoms
              </label>
              <input
                className='focus:ring-1 focus:ring-blue-500'
                type='text'
                name='firstname'
                defaultValue={user.firstname}
                required
              />
            </div>
            <div className='mb-2'>
              <label htmlFor='lastname' className='block font-bold mb-2'>
                Nom
              </label>
              <input
                className='focus:ring-1 focus:ring-blue-500'
                type='text'
                name='lastname'
                defaultValue={user.lastname}
                required
              />
            </div>
            <div className='mb-2'>
              <label htmlFor='date' className='block font-bold mb-2'>
                Date de naissance
              </label>
              <input
                className='focus:ring-1 focus:ring-blue-500'
                type='date'
                name='birthday'
                defaultValue={user.birthday}
                required
              />
            </div>
            <div className='mb-2'>
              <label htmlFor='gender' className='block font-bold mb-2'>
                Genre
              </label>
              <select
                className='w-full p-2 bg-white border-2'
                name='gender'
                id='gender'
                required
                defaultValue={user.gender}
              >
                <option value='M'>Masculin</option>
                <option value='F'>Féminin</option>
              </select>
            </div>
            <button className='bg-blue-600 m-2 p-2 font-light float-end rounded-md text-white'>
              Mettre à jour
            </button>
          </form>
        </div>
        <button
          className='modal-close is-medium'
          aria-label='close'
          onClick={(e) => {
            e.preventDefault();
            setIsEditingProfile(false);
          }}
        ></button>
      </div>
    </div>
  );
};

export default EditProfile;
