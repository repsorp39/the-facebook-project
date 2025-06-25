import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deletePost,
  updatePost,
} from "../../../store/features/posts-slice";

import {
  Forward,
  Heart,
  MessageCircle,
  ThumbsUp,
  X,
} from "lucide-react";

import toast from "react-hot-toast";
import ContextMenu from "./ContextMenu";
import axios from "../../../config/axios-config";
import { timeAgo } from "../../../utils";

const SingleArticle = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditing, setEditing] = useState(false);
  const [inputContent, setInputContent] = useState(post.description);
  const user = useSelector((state) => state.auth.userinfo);

  function handleClose(id) {
    dispatch(deletePost(id));
    toast.success(
      "Vous avez retiré ce post de votre fil. Mais vous pourriez le voir ailleurs."
    );
  }

  async function handleDelete(id) {
    try {
      const res = await axios.delete(
        `/articles/article.delete.php?post_id=${id}`
      );
      //lui il retire seulement du fil actuellement pour éviter des requetes pour recuperer
      //tous les postes à nouveau
      dispatch(deletePost(id));
      toast.success("Post supprimé!");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la suppression!");
    }
  }

  async function handleEdit(id) {
    try {
      const formData = new FormData();
      const data = {
        ...post,
        post_id: id,
        description: inputContent,
      };

      Object.keys(data).map((key) => {
        formData.append(key, data[key]);
      });

      const res = await axios.post("/articles/article.update.php", formData);
      toast.success("Article modifié avec succès");
      setEditing(false);
      //on met juste le post en question à jour ici por ne plus fetcher à nouveau la bdd
      dispatch((updatePost(data)));
    } catch (error) {
      console.log(error);

      toast.error("Une erreur est survenue lors de l'édition.");
    }
  }

  return (
    <article className='w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition hover:shadow-lg mb-5'>
      {/* Header */}
      <section className='flex items-start justify-between p-4'>
        <div
          className='flex items-center gap-3 cursor-pointer group'
          onClick={() => navigate(`/profile/${post.user_id}`)}
        >
          <img
            src={post.user_picture}
            alt=''
            className='w-12 h-12 rounded-full object-cover border border-gray-300 group-hover:scale-105 transition'
          />
          <div>
            <p className='text-gray-800 font-semibold text-[15px]'>
              {post.firstname} {post.lastname}
            </p>
            <p className='text-gray-500 text-xs'> { timeAgo(post.created_at)} </p>
          </div>
        </div>

        {/* Menu actions */}
        <div className='flex gap-3 items-center text-gray-500'>
          {user.userid === post.user_id && (
            <ContextMenu
              editable={Boolean(post.description)}
              onEdit={() => setEditing(true)}
              onDelete={() => handleDelete(post.post_id)}
            />
          )}

          <X
            onClick={() => handleClose(post.post_id)}
            className='hover:text-red-500 cursor-pointer transition'
          />
        </div>
      </section>

      {/* Description */}
      {!isEditing ? (
        post.description && (
          <section className='px-4 pb-2 text-gray-700 text-sm leading-relaxed'>
            {post.description}
          </section>
        )
      ) : (
        <div className='flex items-end content-center'>
          <textarea
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            className='w-[80%] ms-5 bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:outline-none text-gray-800 text-sm rounded-xl px-4 py-3 resize-none transition h-20 placeholder-gray-500'
          />
          <div>
            <button
              onClick={() => handleEdit(post.post_id)}
              className='ms-3 shadow-sm bg-emerald-700 hover:bg-emerald-600 px-3 py-2 rounded-md text-white text-[14px]'
            >
              Éditer
            </button>
          </div>
        </div>
      )}

      {/* Media */}
      {post.type !== "text" && (
        <div className='w-full max-h-[500px] overflow-hidden rounded-lg my-2'>
          {post.type === "image" ? (
            <img
              src={post.content}
              alt=''
              className='w-full object-cover max-h-[500px] transition hover:scale-[1.02]'
            />
          ) : (
            <video
              src={post.content}
              controls
              className='w-full max-h-[500px] rounded-lg'
            />
          )}
        </div>
      )}

      {/* Reactions */}
      <section className='px-4 pt-2 flex items-center justify-between text-sm text-gray-600'>
        <div className='flex items-center gap-1'>
          <div className='relative'>
            <Heart className='text-pink-600 w-5 h-5' />
            <ThumbsUp className='text-blue-600 w-5 h-5 absolute left-3 top-0' />
          </div>
          <span className='ml-6'>10</span>
        </div>
      </section>

      <hr className='my-3 border-gray-200' />

      {/* Footer actions */}
      <section className='px-4 pb-4 flex justify-around text-gray-600 text-sm'>
        <button className='flex items-center gap-2 hover:text-pink-600 transition'>
          <Heart className='w-4 h-4' />
          <span>J'aime</span>
        </button>
        <button className='flex items-center gap-2 hover:text-blue-500 transition'>
          <MessageCircle className='w-4 h-4' />
          <span>Commenter</span>
        </button>
        <button className='flex items-center gap-2 hover:text-green-600 transition'>
          <Forward className='w-4 h-4' />
          <span>Partager</span>
        </button>
      </section>
    </article>
  );
};

export default SingleArticle;
