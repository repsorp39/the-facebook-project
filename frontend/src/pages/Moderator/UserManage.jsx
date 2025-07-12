import React, { useEffect, useState } from "react";
import AdminNavBar from "../../components/AdminNavBar";
import getAxiosInstance from "../../config/axios-config";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
  TbTrashXFilled,
} from "react-icons/tb";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import Modal from "../../components/Modal";
import { PersonStanding } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserManage = () => {
  const http = getAxiosInstance();
  const navigate = useNavigate();

  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const defaultLimit = 10;

  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(defaultLimit);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isModeratorModalOpen, setModeratorModalOpen] = useState(false);

  const [id, setId] = useState("");

  const fields = [
    "index",
    "Photo",
    "Nom",
    "Email",
    "Email confirmé",
    "Genre",
    "Actions",
  ];

  async function fetchUsers() {
    try {
      toast.dismiss();
      toast.loading("Chargement des utilisateurs", {
        position: "top-center",
        style: { background: "black", color: "#fff" },
      });
      const res = await http.get("/moderator/users.get.php");
      toast.dismiss();
      setUsers(res.data);
    } catch (error) {
      toast.dismiss();
      console.log(error);
      toast.error("Une erreur est survenue");
    } 
  }

  async function handleDelete() {
    try {
      toast.loading("Suppression d'un utilisateur", {
        position: "top-center",
        style: { background: "black", color: "red" },
      });
      await http.delete(`/moderator/user-delete.php?id=${id}`);      
      //remove the users locally
      const filteredUsers = users.filter((user) => user.id != id);
      setUsers(filteredUsers);
      handleModalClose();
    } catch (error) {
      console.log(error);
      handleModalClose();
      toast.error("Une erreur est survenue lors de la suppression");
    }
  }

  async function addModerator() {
    try {
      toast.loading("Ajout d'un modérateur", {
        position: "top-center",
        style: {  color: "green" },
      });
      const formData = new FormData();
      formData.append("id", id);

      await http.post(`/admin/moderator.create.php`, formData);
      toast.success("Modérateur créé!");

      //remove the users locally
      const filteredUsers = users.filter((user) => user.id != id);
      setUsers(filteredUsers);
      handleModalClose();
    } catch (error) {
      console.log(error);
      handleModalClose();
      toast.error("Une erreur est survenue lors de l'ajout");
    }
  }

  const handleSeeMore = () => setLimit(limit + defaultLimit);

  const handleSeeLess = () =>
    setLimit(
      limit - defaultLimit >= defaultLimit ? limit - defaultLimit : defaultLimit
    );

  const handleOpenDeleteModal = (id) => {
    setDeleteModalOpen(true);
    setId(id);
  };

  const handleOpenModeratorModal = (id) => {
    setModeratorModalOpen(true);
    setId(id);
  };

  const handleModalClose = () => {
    setDeleteModalOpen(false);
    setModeratorModalOpen(false);
    setId("");
    toast.dismiss();
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <AdminNavBar />
      <div
        className={`min-h-screen bg-slate-200 py-8 mt-10 ${
          isDeleteModalOpen || isModeratorModalOpen
            ? "blur-sm brightness-50 pointer-events-none"
            : ""
        }`}
      >
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900'>
              Gestion des Utilisateurs
            </h1>
            <p className='mt-2 text-gray-600'>
              Consulter les informations sur vos utilisateurs et les supprimer.
            </p>
          </div>
          <div>
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
                {Array.from(users)
                  .slice(0, limit)
                  .map((user, index) => (
                    <tr key={user.id} className='hover:bg-gray-50 transition'>
                      <td className='px-4 py-2 border-b text-center'>
                        {index + 1}
                      </td>

                      <td className='px-4 py-2 border-b'>
                        <img
                          src={user.picture}
                          alt='Avatar'
                          onClick={()=>navigate(`/profile/${user.id}`)}
                          className='w-10 h-10 rounded-full object-cover border shrink-0 hover:scale-105 cursor-pointer'
                        />
                      </td>

                      <td className='px-4 py-2 border-b font-medium'>
                        {user.firstname} {user.lastname}
                      </td>

                      <td className='px-4 py-2 border-b'>{user.email}</td>

                      <td className='px-4 py-2 border-b'>
                        {user.confirmed_email ? (
                          <span className='inline-block px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full'>
                            Oui
                          </span>
                        ) : (
                          <span className='inline-block px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full'>
                            Non
                          </span>
                        )}
                      </td>

                      <td className='px-4 py-2 border-b capitalize'>
                        {user.gender}
                      </td>

                      <td className='px-4 py-2 border-b flex justify-between items-center'>
                        <div>
                          <span
                            id={`delete-${user.id}`}
                            onClick={() => handleOpenDeleteModal(user.id)}
                            className='flex items-center text-red-700 bg-red-100 mx-auto place-content-center cursor-pointer'
                          >
                            <TbTrashXFilled className='w-5 h-5' />{" "}
                          </span>
                          <Tooltip
                            anchorSelect={`#delete-${user.id}`}
                            content='Supprimer'
                          />
                        </div>
                        {isAdmin && (
                          <div>
                            <span
                              id={`moderator-${user.id}`}
                              onClick={() => handleOpenModeratorModal(user.id)}
                              className='flex items-center text-green-700 bg-green-100 mx-auto place-content-center cursor-pointer'
                            >
                              <FaPlus className='w-5 h-5' />{" "}
                            </span>
                            <Tooltip
                              anchorSelect={`#moderator-${user.id}`}
                              content='Ajouter comme modérateur'
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td className='flex justify-between'>
                    {limit > defaultLimit && (
                      <button
                        onClick={handleSeeLess}
                        className='block float-right p-2 m-2  shadow-md rounded-md hover:bg-gray-200 hover:text-red-600'
                      >
                        <TbPlayerTrackPrevFilled />
                      </button>
                    )}
                    {users.length > limit && (
                      <button
                        onClick={handleSeeMore}
                        className='block float-right p-2 m-2  shadow-md rounded-md hover:bg-gray-200 hover:text-emerald-600'
                      >
                        <TbPlayerTrackNextFilled />
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            {users.length === 0 && (
              <div className='w-full flex flex-col items-center flex-grow justify-center bg-red-40 text-gray-500 font-semibold p-2 place-content-center'>
                <div className='w-[250px] h-[100px] mx-auto flex flex-col items-center justify-center '>
                  {" "}
                  <PersonStanding /> Aucun utilisateurs trouvés{" "}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <Modal
          title={"Êtes-vous sûr de vouloir supprimer cet utilisateur ?"}
          onSuccess={handleDelete}
          onReject={handleModalClose}
        />
      )}

      {isModeratorModalOpen && (
        <Modal
          title={
            "Êtes-vous sûr de vouloir ajouter cet utilisateur en tant que modérateur ?"
          }
          onSuccess={addModerator}
          onReject={handleModalClose}
        />
      )}
    </div>
  );
};

export default UserManage;
