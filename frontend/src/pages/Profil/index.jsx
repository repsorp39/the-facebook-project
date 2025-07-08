import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import getAxiosInstance from "../../config/axios-config";
import Wrapper from "../../components/Wrapper";
import {
  Ban,
  Camera,
  Dot,
  Ellipsis,
  Mail,
  PartyPopper,
  PersonStanding,
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchUser } from "../../store/features/user-slice";
import EmptyComponent from "../../components/EmptyComponent";
import { FaFemale, FaMale, FaUserEdit } from "react-icons/fa";
import SingleArticle from "../../pages/Home/components/SingleArticle";
import CreatePost from "../../pages/Home/components/CreatePost";
import EditProfile from "./components/EditProfile";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Loader from "../../components/Loader";



const Profil = () => {
  const http = getAxiosInstance();
  const loginUser = useSelector((state) => state.auth.userinfo);
  const dispatch = useDispatch();

  const { userid: paramsUserId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);
  const [user, setUser] = useState({});

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const isConnectedUser = user?.profile?.id === loginUser?.userid;

  async function handleEdit(e, userInfo) {
    try {
      toast.loading("Modification des informations", {
        position: "top-center",
        style: { color: "green" },
      });
      const formData = new FormData();
      const file = e?.target?.files?.[0];

      if (file) {
        if (!file.type.startsWith("image/")) {
          return toast.error("Seules les images sont autorisées");
        }
        if (file.size > 10_000_000) {
          return toast.error("Taille maximale 10mo");
        }
        formData.append("picture", file);
      }

      const info = userInfo ?? user.profile;
      //if there is no data (userInfo) set it will use info from the current logged in user
      Object.keys(info).forEach((key) => formData.append(key, info[key]));

      await http.post("/users/user.update.php", formData);
      if (file) toast.success("Photo de profil mis à jour.");
      else toast.success("Informations modifiées.");
      toast.dismiss();
      dispatch(fetchUser());
    } catch (error) {
      toast.dismiss();
      toast.error("Une erreur est survenue!");
      console.log(error);
    }
  }

  async function fetchProfileInfo() {
    try {
      setIsLoading(true);
      const { data: profile } = await http.get(
        `/users/user.get.php?id=${paramsUserId}`
      );
      const { data } = await http.get(
        `/users/users-informations.php?id=${paramsUserId}`
      );

      if (!profile.id) {
        setUserNotFound(true);
      }

      setUser({
        profile,
        friends: data.friends,
        posts: data.posts,
      });
    } catch (err) {
      console.log(err);
      setUserNotFound(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (paramsUserId) fetchProfileInfo();
  }, [paramsUserId]);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader message={"Chargement des informations du profil"} />
      ) : userNotFound ? (
        <EmptyComponent
          message={"Aucun utilisateur correspondant"}
          Icon={Ban}
        />
      ) : (
        <>
          <section className='w-[85%] min-w-[350px] max-w-[1000px] mx-auto'>
            <section>
              <div className='h-[30vh] w-full bg-gray-400 mx-auto gap-2 relative'>
                {user.profile.id === loginUser.userid && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className='flex items-center bottom-0 right-0 m-2 absolute font-sans hover:bg-slate-200 text-sm rounded-md text-black py-2 px-2 bg-white'
                  >
                    {" "}
                    <span>
                      {" "}
                      <FaUserEdit className='w-5 h-5 me-2' />{" "}
                    </span>{" "}
                    Modifier vos informations{" "}
                  </button>
                )}
              </div>
              <div>
                <div className='flex items-center gap-3'>
                  <div className='w-24 h-24  md:w-32 md:h-32 -translate-y-5 relative'>
                    <img
                      className='w-full h-full shadow-inner rounded-full object-cover border-4 border-white'
                      src={user.profile.picture}
                      alt=''
                    />
                    {isConnectedUser && (
                      <>
                        <label
                          htmlFor='profile-picture'
                          className='absolute cursor-pointer bottom-5 right-0 bg-white border-2 border-gray-500 p-2 rounded-full'
                        >
                          <Camera className='text-black' />
                        </label>
                        <input
                          type='file'
                          id='profile-picture'
                          className='hidden'
                          onChange={(e) => handleEdit(e, null)}
                          accept='image/*'
                        />
                      </>
                    )}
                  </div>
                  <div className='flex items-start flex-col content-start gap-1'>
                    <div>
                      <h1 className='text-2xl font-bold text-black'>
                        {`${user.profile.lastname} ${user.profile.firstname} ${
                          isConnectedUser ? "(Vous)" : ""
                        }`}
                      </h1>
                    </div>
                    <div className='flex '>
                      {" "}
                      <PersonStanding /> <Dot /> Amis {user.friends.length}{" "}
                    </div>
                    <div className='flex'>
                      {user.friends.slice(0, 5).map((friend) => (
                        <img
                          key={friend.id}
                          className='w-8 h-8 rounded-full object-cover shrink-0 border-1 border-black'
                          src={friend.picture}
                        />
                      ))}
                      {user.friends.length > 1 && (
                        <span className='w-8 h-8 rounded-full bg-gray-400 text-center flex items-center flex-col content-center place-content-center'>
                          {" "}
                          <Ellipsis className='w-6 text-white' />{" "}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <article className='flex flex-col content-center justify-center items-center place-content-center mt-3  md:flex-row  md:justify-between'>
                <div className='min-w-[260px] self-start group block rounded-xl bg-blue-50 transition border-gray-200 shadow-sm border-2 p-4 '>
                  <div className='flex items-center gap-4'>
                    <div className='p-2 bg-blue-100 text-blue-600 rounded-full'>
                      <Mail />
                    </div>
                    <div className='text-sm font-medium text-gray-800 group-hover:text-blue-700 transition'>
                      <h4 className='font-bold'>Email</h4>
                      {user.profile.email}
                    </div>
                  </div>
                </div>
                <div className='min-w-[260px] self-start group block rounded-xl bg-blue-50 transition border-gray-200 shadow-sm border-2 p-4 '>
                  <div className='flex items-center gap-4'>
                    <div className='p-2 bg-blue-100 text-red-600 rounded-full'>
                      <PartyPopper />
                    </div>
                    <div className='text-sm font-medium text-gray-800 group-hover:text-red-500 transition'>
                      <h4 className='font-bold'>Né(e) le </h4>
                      {format(
                        new Date(user.profile.birthday),
                        "EEEE d MMMM yyyy",
                        { locale: fr }
                      )}
                    </div>
                  </div>
                </div>
                <div className='min-w-[260px] self-start group block rounded-xl  bg-blue-50 transition border-gray-200 shadow-sm border-2 p-4 '>
                  <div className='flex items-center gap-4'>
                    <div className='p-2 bg-blue-100 text-blue-600 rounded-full'>
                      {user.profile.gender === "M" ? <FaMale /> : <FaFemale />}
                    </div>
                    <div className='text-sm font-medium text-gray-800 group-hover:text-blue-700 transition'>
                      <h4 className='font-bold'>Genre</h4>
                      {user.profile.gender === "M" ? "Homme" : "Femme"}
                    </div>
                  </div>
                </div>
              </article>
            </section>
            <hr className='h-[1px] bg-gray-400' />
          </section>
          <section className='w-[90%] md:w-[70%] lg:w-[50%] mx-auto'>
            <article>
              <div>
                <h1 className='flex items-center text-lg lg:text-2xl font-bold'>
                  <Dot className='w-10 h-10' />
                  {isConnectedUser
                    ? "Vos récentes publications"
                    : `Récentes publications de ${user.profile.lastname}`}{" "}
                </h1>
              </div>
              {user.posts.length === 0 ? (
                <EmptyComponent Icon={Ban} message={"Aucun posts récents"} />
              ) : (
                <>
                  <div className='mt-5'>
                    {user.posts.map((post) => (
                      <SingleArticle key={post.post_id} post={post} />
                    ))}
                  </div>
                </>
              )}
            </article>
          </section>
          <section className='w-[90%] md:w-[70%] lg:w-[50%] mx-auto'>
            <div>
              <h1 className='flex items-center text-lg lg:text-2xl font-bold'>
                <Dot className='w-10 h-10' />
                Ajouter un post
              </h1>
            </div>
            <CreatePost />
          </section>
        </>
      )}

      {isEditingProfile && (
        <EditProfile
          user={user.profile}
          setIsEditingProfile={setIsEditingProfile}
          handleEdit={handleEdit}
        />
      )}
    </Wrapper>
  );
};

export default Profil;
