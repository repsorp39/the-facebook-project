import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../store/features/posts-slice';
import SingleArticle from './SingleArticle';

const Article = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  
  useEffect(()=>{
     dispatch(fetchPosts());
  },[]);

  return (
    <section className='mt-5 flex flex-col items-center content-center'>
      {posts.map((post) => {
        return <SingleArticle key={post.post_id} post={post} />
      })}
    </section>
  );
};

export default Article;