import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Images, X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "../../../config/axios-config";
import { fetchPosts } from "../../../store/features/posts-slice";
import ImageRounded from "../../../components/ImageRounded";


const CreatePost = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.userinfo);
  const [inputContent, setInputContent] = useState("");
  const [media, SetMedia] = useState({});
  const [isLoading, setLoading] = useState(false);

  async function handlePostSubmit() {
    try {
      setLoading(true);

      const formData = new FormData();

      if (media.preview) {
        formData.append("content", media.content);
      }

      formData.append("type", media.type ?? "text");
      formData.append("description", inputContent);
      const res = await axios.post("/articles/article.create.php", formData);
      toast.success("Article publiée avec succès");
      dispatch(fetchPosts());
    } catch (err) {
      toast.error("Une erreur est survenue lors de la publication");
      console.log(err);
    } finally {
      setLoading(false);
      setInputContent("");
      SetMedia({});
    }
  }

  function handleMediaUpload(e) {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      return toast.error("Vous ne pouvez uploader qu'une vidéo ou une photo");
    }

    if (file.size > 10_000_000) {
      return toast.error("Media beaucoup trop volumineux");
    }
    SetMedia({
      type: file.type.split("/")[0],
      content: file,
      preview: URL.createObjectURL(file),
    });
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-5 w-full max-w-2xl mx-auto border border-gray-200">
    {/* Zone de saisie */}
    <section className="flex gap-4">
      {/* Avatar */}
      <div className="shrink-0">
        <ImageRounded imgUrl={user.picture} />
      </div>
  
      {/* Zone de texte */}
      <div className="flex-1">
        <textarea
          placeholder={`${user.firstname}, à quoi penses-tu ?`}
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          className="w-full bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:outline-none text-gray-800 text-sm rounded-xl px-4 py-3 resize-none transition h-20 placeholder-gray-500"
        />
  
        {/* Bouton publier */}
        {(inputContent.trim() !== "" || media.preview) && (
          <button
            onClick={handlePostSubmit}
            disabled={isLoading}
            className={` animate-fade-in-down mt-3 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full float-right transition duration-200 ${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Publication..." : "Publier"}
          </button>
        )}
      </div>
    </section>
  
    {/* Séparateur */}
    <hr className="my-5 border-gray-300" />
  
    {/* Zone d'upload */}
    <section className="text-center">
      {!media.preview ? (
        <>
          <label
            htmlFor="content"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer text-gray-700 font-medium transition"
          >
            <Images className="text-emerald-600 w-5 h-5" />
            <span>Ajouter une photo ou vidéo</span>
          </label>
          <input
            id="content"
            name="content"
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaUpload}
            className="hidden"
          />
        </>
      ) : (
        <div className="relative w-[80%] mx-auto rounded-xl overflow-hidden mt-2 border shadow-md bg-white">
          <button
            onClick={() => SetMedia({})}
            className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center shadow-md"
          >
            <X className="w-4 h-4" />
          </button>
          {media.type === "image" ? (
            <img src={media.preview} alt="preview" className="w-full object-cover" />
          ) : (
            <video src={media.preview} controls className="w-full max-h-[400px]" />
          )}
        </div>
      )}
    </section>
  </div>
  
  );
};

export default CreatePost;
