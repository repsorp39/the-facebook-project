import React from "react";
import { Frown, Trash2Icon } from "lucide-react";
import { timeAgo } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import getAxiosInstance from "../../../config/axios-config";
import toast from "react-hot-toast";
import { fetchPosts } from "../../../store/features/posts-slice";

const Comments = ({ comments }) => {
  const userid = useSelector((state) => state.auth.userinfo.userid);
  const isPostLoading = useSelector((state) => state.posts.isFetching);

  const dipatch = useDispatch();
  const http = getAxiosInstance();

  async function handleDelete(id) {
    try {
      const res = await http.delete(
        `/comments/comments.delete.php?comment_id=${id}`
      );
      dipatch(fetchPosts());
      toast.success("Commentaire supprimé");
    } catch (err) {
      toast.error("Une erreur est survenue lors de l'ajout!");
      console.log(err);
    }
  }

  if (isPostLoading) {
    return (
      <div className='place-content-center flex flex-col justify-center content-center items-center'>
        <div className='w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
      </div>
    );
  }

  return (
    <section className='mt-4 max-h-[150px] overflow-y-auto '>
      <hr className='my-3 border-gray-200' />

      {comments.length === 0 ? (
        <div className='flex items-center justify-center gap-2 text-gray-500 text-sm py-4 '>
          <Frown className='w-5 h-5' />
          <span>Aucun commentaire pour l'instant</span>
        </div>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.comment_id}
            className='flex flex-col gap-1 mb-4 px-2 py-3 rounded-md hover:bg-gray-50 transition w-[80%] mx-auto border-l-2 mt-2'
          >
            {/* Header */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <img
                  src={comment.user_picture}
                  alt='user'
                  className='w-9 h-9 rounded-full object-cover border'
                />
                <div>
                  <p className='text-gray-800 font-semibold text-[15px]'>
                    {comment.firstname} {comment.lastname}
                  </p>
                  <p className='text-gray-500 text-xs'>
                    {" "}
                    {timeAgo(comment.created_at, false)}{" "}
                  </p>
                </div>
              </div>
              {userid === comment.user_id && (
                <Trash2Icon
                  className='w-4 h-4 text-red-500 cursor-pointer hover:text-red-600 transition'
                  onClick={() => handleDelete(comment.comment_id)}
                />
              )}
            </div>

            {/* Content */}
            <p className='text-sm text-gray-700 px-11'>{comment.content}</p>
          </div>
        ))
      )}
    </section>
  );
};

export default Comments;
