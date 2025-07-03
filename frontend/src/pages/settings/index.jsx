import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaCamera,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import getAxiosInstance from "../../config/axios-config";
import { toast } from "react-hot-toast";
import Wrapper from "../../components/Wrapper";
import { fetchUser } from "../../store/features/user-slice";

const Settings = () => {
  const http = getAxiosInstance();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const user = useSelector((state) => state.auth.userinfo);

  const [profileData, setProfileData] = useState({
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    email: user.email || "",
    birthday: user.birthday || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [file, setFile] = useState(null);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstname", profileData.firstname);
    formData.append("lastname", profileData.lastname);
    formData.append("email", profileData.email);
    formData.append("birthday", profileData.birthday);
    if (file) {
      formData.append("picture", file);
    }
    try {
      const response = await http.post("users/user.update.php", formData);
      toast.success("Profil mis à jour avec succès!");
      dispatch(fetchUser());
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour du profil");
    }finally{
      setTimeout(()=>{
        toast.dismiss();
      },1500)
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error(
        "Le nouveau mot de passe doit contenir au moins 8 caractères"
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("old_password",passwordData.currentPassword);
      formData.append("new_password",passwordData.newPassword);
      const response = await http.post("users/user.change-pass.php",formData);

      toast.success("Mot de passe modifié avec succès!");

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
      if(error.status === 403) toast.error("Ancien mot de passe incorrecte!")
      toast.error(
          "Erreur lors du changement de mot de passe"
      );
    }
  };

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image") && selectedFile.size < 5_000_000) {
      setFile(selectedFile);
      toast.success("Vous avez sélectionner une photo",{ duration:Infinity})
      console.log("Image uploaded:", selectedFile);
    }else{
      toast.error("Image de moins de 5 mo autorisés!");
    }
  };

  return (
    <Wrapper>
      <div className='min-h-screen bg-slate-200 py-8'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900'>
              Paramètres du compte
            </h1>
            <p className='mt-2 text-gray-600'>
              Gérez vos informations personnelles et la sécurité de votre compte
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
            {/* Tabs */}
            <div className='border-b border-gray-200'>
              <nav className='flex space-x-8 px-6' aria-label='Tabs'>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "profile"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <FaUser className='inline mr-2' />
                  Profil
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "security"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <FaLock className='inline mr-2' />
                  Sécurité
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className='p-6'>
              {activeTab === "profile" && (
                <div className='space-y-6'>
                  {/* Profile Picture Section */}
                  <div className='flex items-center space-x-6'>
                    <div className='relative'>
                      <img
                        src={user.picture}
                        alt='Profile'
                        className='w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg'
                      />
                      <label className='absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors'>
                        <FaCamera className='w-4 h-4' />
                        <input
                          type='file'
                          className='hidden'
                          accept='image/*'
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    <div>
                      <h3 className='text-lg font-medium text-gray-900'>
                        Photo de profil
                      </h3>
                      <p className='text-sm text-gray-500'>
                        JPG, PNG ou GIF. Max 5MB.
                      </p>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <form onSubmit={handleProfileSubmit} className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <label
                          htmlFor='firstName'
                          className='block text-sm font-medium text-gray-700 mb-2'
                        >
                          Prénom
                        </label>
                        <input
                          type='text'
                          id='firstName'
                          name='firstname'
                          value={profileData.firstname}
                          onChange={handleProfileChange}
                          className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='lastName'
                          className='block text-sm font-medium text-gray-700 mb-2'
                        >
                          Nom
                        </label>
                        <input
                          type='text'
                          id='lastName'
                          name='lastname'
                          value={profileData.lastname}
                          onChange={handleProfileChange}
                          className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700 mb-2'
                      >
                        <FaEnvelope className='inline mr-2' />
                        Adresse email
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='birthday'
                        className='block text-sm font-medium text-gray-700 mb-2'
                      >
                        Date de naissance
                      </label>
                      <input
                        type='date'
                        id='birthday'
                        name='birthday'
                        value={profileData.birthday}
                        onChange={handleProfileChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        required
                      />
                    </div>

                    <div className='flex justify-end'>
                      <button
                        type='submit'
                        className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
                      >
                        Sauvegarder les modifications
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "security" && (
                <div className='space-y-6'>
                  <div className='bg-blue-50 border border-blue-200 rounded-md p-4'>
                    <h3 className='text-sm font-medium text-blue-800'>
                      Conseils de sécurité
                    </h3>
                    <p className='mt-1 text-sm text-blue-700'>
                      Utilisez un mot de passe fort avec au moins 8 caractères,
                      incluant des lettres majuscules, minuscules, chiffres et
                      symboles.
                    </p>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className='space-y-6'>
                    <div>
                      <label
                        htmlFor='currentPassword'
                        className='block text-sm font-medium text-gray-700 mb-2'
                      >
                        Mot de passe actuel
                      </label>
                      <div className='relative'>
                        <input
                          type={showPassword ? "text" : "password"}
                          id='currentPassword'
                          name='currentPassword'
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className='w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                          required
                        />
                        <button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute inset-y-0 right-0 pr-3 flex items-center'
                        >
                          {showPassword ? (
                            <FaEyeSlash className='h-5 w-5 text-gray-400' />
                          ) : (
                            <FaEye className='h-5 w-5 text-gray-400' />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor='newPassword'
                        className='block text-sm font-medium text-gray-700 mb-2'
                      >
                        Nouveau mot de passe
                      </label>
                      <div className='relative'>
                        <input
                          type={showNewPassword ? "text" : "password"}
                          id='newPassword'
                          name='newPassword'
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className='w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                          required
                        />
                        <button
                          type='button'
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className='absolute inset-y-0 right-0 pr-3 flex items-center'
                        >
                          {showNewPassword ? (
                            <FaEyeSlash className='h-5 w-5 text-gray-400' />
                          ) : (
                            <FaEye className='h-5 w-5 text-gray-400' />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor='confirmPassword'
                        className='block text-sm font-medium text-gray-700 mb-2'
                      >
                        Confirmer le nouveau mot de passe
                      </label>
                      <div className='relative'>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id='confirmPassword'
                          name='confirmPassword'
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className='w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                          required
                        />
                        <button
                          type='button'
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className='absolute inset-y-0 right-0 pr-3 flex items-center'
                        >
                          {showConfirmPassword ? (
                            <FaEyeSlash className='h-5 w-5 text-gray-400' />
                          ) : (
                            <FaEye className='h-5 w-5 text-gray-400' />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className='flex justify-end'>
                      <button
                        type='submit'
                        className='bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors'
                      >
                        Changer le mot de passe
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Settings;
