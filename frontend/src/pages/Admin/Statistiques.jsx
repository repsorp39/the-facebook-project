import React, { useEffect, useState } from "react";
import AdminNavBar from "../../components/AdminNavBar";
import getAxiosInstance from "../../config/axios-config";
import toast from "react-hot-toast";
import { CiUser } from "react-icons/ci";
import { MdPublic } from "react-icons/md";

const Statistiques = () => {
  const http = getAxiosInstance();
  const [statistics, setStatistics] = useState({});

  async function getStats() {
    try {
      toast.loading("Chargement des statistiques", {
        position: "top-center",
        style: { color: "#fff",background:"black" },
      });
      const res = await http.get("/admin/getstat.admin.php/");
      setStatistics(res.data.data);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      console.log(error);
      toast.error("Une erreur est survenue!");
    }
  }

  useEffect(() => {
    toast.dismiss();
    getStats();
  }, []);

  return (
    <div className='overflow-x-auto'>
      <AdminNavBar />
      <div className='min-h-screen bg-slate-200 py-8 mt-10 overflow-x-auto'>
        {/* Header */}

        {statistics.total_users && (
          <div className='mb-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold text-gray-900'>Statistiques</h1>
            <p className='mt-2 text-gray-600'>
              Prenez de bonnes décisions grâce aux informations détaillées sur
              votre application.
            </p>
            <section>
              <h1 className='text-3xl font-bold text-gray-900 flex items-center mt-10'>
                {" "}
                <CiUser /> Utilisateurs
              </h1>
              <article>
                <section className='flex gap-4 flex-wrap  justify-center sm:flex-row sm:flex-nowrap'>
                  <div className='w-[150px] sm:w-[240px] h-[90px] shadow-lg text-white bg-emerald-500 rounded-lg mt-4 p-3'>
                    <span className='text-4xl font-bold'>
                      {" "}
                      {statistics.total_users}{" "}
                    </span>
                    <h4>Inscrits</h4>
                  </div>
                  <div className='w-[150px] sm:w-[240px] h-[90px] shadow-lg text-white bg-blue-600 rounded-lg mt-4 p-3'>
                    <span className='text-4xl font-bold'>
                      {" "}
                      {statistics.online_users}{" "}
                    </span>
                    <h4>En ligne</h4>
                  </div>
                  <div className='w-[150px] sm:w-[240px] h-[90px] shadow-lg text-white bg-gray-700 rounded-lg mt-4 p-3'>
                    <span className='text-4xl font-bold'>
                      {" "}
                      {statistics.total_moderators}{" "}
                    </span>
                    <h4>Modérateurs</h4>
                  </div>
                  <div className='w-[150px] sm:w-[240px] h-[90px] shadow-lg text-white bg-red-600 rounded-lg mt-4 p-3'>
                    <span className='text-4xl font-bold'>
                      {" "}
                      {statistics.total_admins}{" "}
                    </span>
                    <h4>Admin</h4>
                  </div>
                </section>
                <div>
                  <h2 className='text-2xl mt-5 font-bold'>
                    Dernières inscriptions sur la plateforme
                  </h2>
                  <table className='[&_tr]:border-b-2 [&_tr]:border-gray-300 mt-5 w-full overflow-x-auto'>
                    <tbody>
                      {statistics?.last_users?.map?.((user, index) => (
                        <tr key={user.id}>
                          <td className='px-4 py-2 border-b text-center'>
                            {index + 1}
                          </td>

                          <td className='px-4 py-2 border-b shrink-0 hidden md:inline-block'>
                            <img
                              src={user.picture}
                              alt='Avatar'
                              className='shrink-0 w-10 h-10 rounded-full object-cover border'
                            />
                          </td>

                          <td className='px-4 py-2 border-b font-medium'>
                            {user.firstname} {user.lastname}
                          </td>

                          <td className='px-4 py-2 border-b'>{user.email}</td>

                          <td className='hidden md:inline-block px-4 py-2 border-b'>
                            {user.createdAt}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </section>
            <section className=''>
              <h1 className='text-3xl font-bold text-gray-900 flex items-center mt-10'>
                {" "}
                <MdPublic /> Postes
              </h1>
              <article className='flex gap-4 flex-wrap  justify-center sm:flex-row sm:flex-nowrap'>
                <div className='w-[150px] sm:w-[240px] h-[90px] shadow-lg text-white bg-slate-400 rounded-lg mt-4 p-3'>
                  <span className='text-4xl font-bold'>
                    {" "}
                    {statistics.total_posts}{" "}
                  </span>
                  <h4>posts publiés</h4>
                </div>
                <div className='w-[150px] sm:w-[240px] h-[90px] shadow-lg text-white bg-pink-700 rounded-lg mt-4 p-3'>
                  <span className='text-4xl font-bold'>
                    {" "}
                    {statistics.total_likes}{" "}
                  </span>
                  <h4>likes</h4>
                </div>
                <div className='w-[150px] sm:w-[240px] h-[90px] shadow-lg text-white bg-yellow-500 rounded-lg mt-4 p-3'>
                  <span className='text-4xl font-bold'>
                    {statistics.total_comments}
                  </span>
                  <h4>commentaires</h4>
                </div>
              </article>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistiques;
