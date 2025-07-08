import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../store/features/posts-slice";
import SingleArticle from "./SingleArticle";
import { Inbox } from "lucide-react";
import EmptyComponent from "../../../components/EmptyComponent";
import Loader from "../../../components/Loader";

const Article = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const isPostsLoading = useSelector((state) => state.posts.isFetching);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      {isPostsLoading && <Loader message={"Chargement des posts"} />}
      {!isPostsLoading && posts.length === 0 && (
        <EmptyComponent Icon={Inbox} message='Aucun post disponible' />
      )}
      <section className='mt-5 flex flex-col items-center content-center'>
        {posts.map((post) => {
          return <SingleArticle key={post.post_id} post={post} />;
        })}
      </section>
    </>
  );
};

export default Article;
