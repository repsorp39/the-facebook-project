import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../store/features/posts-slice";
import SingleArticle from "./SingleArticle";
import { Inbox } from "lucide-react";

const Article = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state => state.posts.posts));
  const loading = useSelector((state) => state.posts.loading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (posts.length === 0)
    return (
      <div className='w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition hover:shadow-lg mb-5 flex items-center justify-center gap-3 p-6 text-gray-500'>
        <Inbox className='w-6 h-6 text-gray-400' />
        <span className='text-sm font-medium'>Aucun post disponible</span>
      </div>
    );

  return (
    <section className='mt-5 flex flex-col items-center content-center'>
      {posts.map((post) => {
        return <SingleArticle key={post.post_id} post={post} />;
      })}
    </section>
  );
};

export default Article;
