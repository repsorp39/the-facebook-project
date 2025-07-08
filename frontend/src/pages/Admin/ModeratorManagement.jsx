import React, { useEffect, useState } from "react";
import AdminNavBar from "../../components/AdminNavBar";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import getAxiosInstance from "../../config/axios-config";
import { TbTrashXFilled } from "react-icons/tb";
import { PersonStanding } from "lucide-react";
import Modal from "../../components/Modal";

const ModeratorManagement = () => {
  const http = getAxiosInstance();

  const [moderators, setModerators] = useState([]);
  const [isModeratorModalOpen, setModeratorModalOpen] = useState(false);

  const [id, setId] = useState("");

  const fields = ["index", "Photo", "Nom", "Email", "Créé le", "Actions"];

  async function fetchModerators() {
    try {
      toast.loading("Chargement des modérateurs", {
        position: "top-center",
        style: { background: "black",color:"#fff" },
      });
      const res = await http.get("/admin/moderator.get.php");
      setModerators(res.data);
      toast.dismiss();
    } catch (err) {
      toast.dismiss();
      console.log(err);
      toast.error("Une erreur est survenue!");
    }
  }

  async function removeModerator() {
    try {
      toast.loading("Suppression d'un modérateur", {
        position: "top-center",
        style: { background: "black", color: "red" },
      });
      await http.delete(`/admin/moderator.delete.php?id=${id}`);
      toast.success("Utilisateur supprimé");

      //remove local moderator
      const filteredModerators = moderators.filter((moderator) => moderator.id !== id);
      setModerators(filteredModerators);
      closeModal();
    } catch (error) {
      closeModal();
      console.log(error);
      toast.error("Une erreur est survenue!");
    }
  }

  const openModeratorModal = (id) => {
    setModeratorModalOpen(true);
    setId(id);
  };

  const closeModal = () => {
    setModeratorModalOpen(false);
    setId("");
    toast.dismiss();
  };

  useEffect(() => {
    toast.dismiss();
    fetchModerators();
  }, []);

  return (
    <div>
      <AdminNavBar />
      <div
        className={`min-h-screen bg-slate-200 py-8 mt-10 transition-all ease-linear ${
          isModeratorModalOpen
            ? "blur-sm brightness-50 pointer-events-none"
            : ""
        }`}
      >
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900'>
              Gestion de vos modérateurs
            </h1>
            <p className='mt-2 text-gray-600'>
              Gérer les modérateurs, consulter, ajouter ou retirer.
            </p>
          </div>
          <section>
            <table className='min-w-full table-auto border-collapse bg-white shadow-sm rounded-md overflow-hidden relative'>
              <thead className='bg-gray-100 text-gray-700 text-sm capitalize text-left'>
                <tr>
                  {fields.map((field) => (
                    <th key={field} className='px-4 py-3 border-b'>
                      {field}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='text-gray-700 text-sm'>
                {moderators.map((moderator, index) => (
                  <tr
                    key={moderator.id}
                    className='hover:bg-gray-50 transition'
                  >
                    <td className='px-4 py-2 border-b text-center'>
                      {index + 1}
                    </td>

                    <td className='px-4 py-2 border-b'>
                      <img
                        src={moderator.picture}
                        alt='Avatar'
                        className='w-10 h-10 rounded-full object-cover border'
                      />
                    </td>

                    <td className='px-4 py-2 border-b font-medium'>
                      {moderator.firstname} {moderator.lastname}
                    </td>

                    <td className='px-4 py-2 border-b'>{moderator.email}</td>

                    <td className='px-4 py-2 border-b capitalize'>
                      {moderator.createdAt}
                    </td>

                    <td className='px-4 py-2 border-b flex justify-between items-center'>
                      <div>
                        <span
                          id={`delete-${moderator.id}`}
                          onClick={() => openModeratorModal(moderator.id)}
                          className='flex items-center text-red-700 bg-red-100 mx-auto place-content-center cursor-pointer'
                        >
                          <TbTrashXFilled className='w-5 h-5' />{" "}
                        </span>
                        <Tooltip
                          anchorSelect={`#delete-${moderator.id}`}
                          content='Retirer des modérateurs'
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {moderators.length === 0 && (
              <div className='w-full flex flex-col items-center flex-grow justify-center bg-red-40 text-gray-500 font-semibold p-2 place-content-center'>
                <div className='w-[250px] h-[100px] mx-auto flex flex-col items-center justify-center '>
                  {" "}
                  <PersonStanding /> Aucun modérateurs trouvés{" "}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
      {isModeratorModalOpen && (
        <Modal
          title='Êtes-vous sûre de vouloir le retirer des modérateurs ?'
          onReject={closeModal}
          onSuccess={removeModerator}
        />
      )}
    </div>
  );
};

export default ModeratorManagement;
