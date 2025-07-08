import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import getAxiosInstance from "../../../config/axios-config";
import { fetchPosts } from "../../../store/features/posts-slice";

const CommentCreation = ({ postid, hideCommentForm }) => {
  const dispatch = useDispatch();
  
  const userprofile = useSelector((state) => state.auth.userinfo.picture);
  const [comment, setComment] = useState("");
  const [isLoading,setLoading] = useState(false);

  async function handleNewComment() {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("post_id", postid);
      formData.append("content", comment);
      const http = getAxiosInstance();
      const res = await http.post("/comments/comments.create.php", formData);
      dispatch(fetchPosts());
      toast.success("Commentaire ajouté");
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue lors de l'ajout du commentaire");
    } finally {
      hideCommentForm?.();
    }
  }

  return (
    <div>
      {/* Commentaires */}
      <hr className='my-3 border-gray-200' />
      <section className='p-2  rounded-md flex items-start content-center w-[90%] md:w-[80%] mx-auto bg-slate-200'>
        <div className='flex'>
          <div className='-me-3'>
            <img
              src={userprofile}
              alt=''
              className='w-12 h-12 rounded-full object-cover border border-gray-300 group-hover:scale-105 transition'
            />
          </div>
          <div>
            <textarea
              value={comment}
              placeholder='Que voulez-vous dire ?'
              autoFocus
              onChange={(e) => setComment(e.target.value)}
              className='w-full ms-5 bg-gray-100 border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:outline-none text-gray-800 text-sm rounded-xl px-4 py-3 resize-none transition h-16 placeholder-gray-500'
            />
          </div>
        </div>
        <div className='self-end w-[100px] ms-9'>
          <button
            disabled={comment.trim() === ""}
            onClick={handleNewComment}
            className={`text-[14px] p-2 font-light rounded-md text-white shadow-sm bg-blue-600 hover:bg-blue-500 transition ms-2 disabled:cursor-not-allowed disabled:bg-blue-500 ${ isLoading ? "button is-loading":""}`}
          >
            Commenter
          </button>
        </div>
      </section>
    </div>
  );
};

export default CommentCreation;
