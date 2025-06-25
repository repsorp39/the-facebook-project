import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ContextMenu from "./ContextMenu";
import getAxiosInstance from "../../../config/axios-config";
import { timeAgo } from "../../../utils";
import NewComment from "./NewComment";
import Comments from "./Comments";
import ImageRounded from "../../../components/ImageRounded";

import {
   deletePost, 
   dislikePost, 
   likePost, 
   updatePost
} from "../../../store/features/posts-slice";

import {
  ChevronsDownUp,
  Forward,
  Heart,
  MessageCircle,
  ThumbsUp,
  X,
} from "lucide-react";
import PostDescription from "./PostDescription";

const SingleArticle = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const http = getAxiosInstance();

  const user = useSelector((state) => state.auth.userinfo);

  const [isEditing, setEditing] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [showCommentaires, setShowCommentaires] = useState(false);

  const [inputContent, setInputContent] = useState(post.description);
  const [hasLikedPost, setHasLikedPost] = useState(
    post?.likes?.includes?.(user.userid)
  );

  function handleClose(id) {
    dispatch(deletePost(id));
    toast.success(
      "Vous avez retiré ce post de votre fil. Mais vous pourriez le voir ailleurs.",{duration:3000}
    );
  }

  async function handleDelete(id) {
    try {
      await http.delete(
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

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      const res = await http.post("/articles/article.update.php", formData);
      toast.success("Article modifié avec succès");
      setEditing(false);
      //on met juste le post en question à jour ici por ne plus fetcher à nouveau la bdd
      dispatch(updatePost(data));
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'édition.");
    }
  }

  async function handleReaction(type = "like") {
    try {
      if (type === "like") {
        setHasLikedPost(true);
        const formData = new FormData();
        formData.append("post_id",post.post_id);
        await http.post(`/articles/article.like.php/`,formData);
        toast.success("Super",{
         icon:'🎉',
         duration:3000
        });
        dispatch(likePost({userid:user.userid,post_id:post.post_id}));
     }
     else {
      setHasLikedPost(false);
      await http.delete(`/articles/article.like.php?post_id=${post.post_id}`);
      dispatch(dislikePost({userid:user.userid,post_id:post.post_id})); 
     }
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue!");
    }
  }

  return (
    <article
      className={`w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition hover:shadow-lg mb-5 }`}
    >
      {/* Header */}
      <section className='flex items-start justify-between p-4'>
        <div
          className='flex items-center gap-3 cursor-pointer group'
          onClick={() => navigate(`/profile/${post.user_id}`)}
        >
          <ImageRounded imgUrl={post.user_picture} />
          <div>
            <p className='text-gray-800 font-semibold text-[15px]'>
              {post.firstname} {post.lastname}
            </p>
            <p className='text-gray-500 text-xs'>
              {" "}
              {timeAgo(post.created_at)}{" "}
            </p>
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
          <PostDescription description={post.description} />
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
          <span className='ml-4'> {post.likes.length} </span>
        </div>
        <div>
          <p
            className='cursor-pointer hover:underline-offset-1 hover:underline transition text-gray-500 font-semibold'
            onClick={() => setShowCommentaires(true)}
          >
            Commentaires ({post.comments.length}){" "}
          </p>
        </div>
      </section>

      <section className='relative'>
        {(showCommentaires || isCommenting) && (
          <span
            className='absolute top-10 left-3 w-4 h-2 m-t-3 cursor-pointer text-gray-400 hover:text-gray-500 transition'
            title='Fermer'
            onClick={() => {
              setIsCommenting(false);
              setShowCommentaires(false);
            }}
          >
            {" "}
            <ChevronsDownUp />{" "}
          </span>
        )}
        {showCommentaires && <Comments comments={post.comments} />}

        {isCommenting && (
          <NewComment
            postid={post.post_id}
            hideCommentForm={() => setIsCommenting(false)}
          />
        )}
      </section>

      <hr className='my-3 border-gray-200' />
      {/* Footer actions */}
      <section className='px-4 pb-4 flex justify-around text-gray-600 text-sm'>
        <button
          className={`flex items-center gap-2 transition ${
            hasLikedPost ? "text-pink-600" : ""
          } `}
          onClick={() => handleReaction(hasLikedPost ? "dislike" : "like")}
        >
          <Heart className='w-4 h-4 ${hasLikedPost ? "text-pink-600":""}' fill="currentColor" />
          <span>J'aime</span>
        </button>
        <button
          className='flex items-center gap-2 hover:text-blue-500 transition'
          onClick={() => {
            setIsCommenting(true);
            setShowCommentaires(true);
          }}
        >
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
