import React, { useEffect, useState } from "react";
import AdminNavBar from "../../components/AdminNavBar";
import SingleArticle from "../Home/components/SingleArticle";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts,deletePost } from "../../store/features/posts-slice";
import Loader from  "../../components/Loader";

const ArticleManage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const defaultLimit = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = new Array(Math.ceil(posts.length / defaultLimit)).fill(0);
  const isFetching = useSelector(state => state.posts.isFetching);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      <AdminNavBar />
      <div className='min-h-screen bg-slate-200 py-8 mt-10'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900'>
              Gestion des articles
            </h1>
            <p className='mt-2 text-gray-600'>
              Consulter les articles et supprimer ceux qui ne respectent pas les
              politiques de Let's Chat
            </p>
          </div>
          {/* All posts */}
          {
            isFetching && <Loader message={"Chargement des posts"} />
          }
          <div>
            {Array.from(posts)
              .slice(0, defaultLimit * currentPage)
              .map((post) => (
                <SingleArticle
                  key={post.post_id}
                  post={post}
                  moderatorAction={() => {
                   dispatch( deletePost(post.post_id))
                  }}
                />
              ))}
          </div>
          {/* Pagination */}
          <div className='mt-8 w-full overflow-x-auto'>
            {totalPages.map((e, i) => (
              <span
                onClick={() => setCurrentPage(i+1)}
                className={`cursor-pointer inline-flex place-content-center  me-2 w-10 h-10 font-bold p-2 rounded-md border-2 border-blue-300 ${
                  currentPage === i + 1 ? "bg-blue-500" : ""
                }`}
                key={i}
              >
                {" "}
                {i + 1}{" "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleManage;
