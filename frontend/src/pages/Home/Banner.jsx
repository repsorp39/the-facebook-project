import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Images } from "lucide-react";
const Banner = () => {
  const user = useSelector((state) => state.auth.userinfo);
  const [isPosting, setPosting] = useState(false);
  const [inputContent, setInputContent] = useState("");

  return (
    <div className='shadow-sm rounded-lg bg-blue-50 '>
      <section className='flex items-center gap-4 justify-center pt-3 mb-[-25px]'>
        <div className='self-start'>
          <figure className='image is-48x48'>
            <img src={user.picture} alt='' className='is-rounded' />
          </figure>
        </div>
        <div className='w-[80%]'>
          <input
            className='w-full bg-gray-100 border-2 outline-gray-600 py-3 px-2 text-gray-700 rounded-2xl text-[18px]'
            type='text'
            placeholder={`${user.firstname}, à quoi penses-tu ?`}
            onChange={(e)=>setInputContent(e.target.value)}
          />
          {inputContent.trim() !== "" && (
            <button className='button is-success mt-4 float-right transition-all ease-linear'>
              Publier
            </button>
          )}
        </div>
      </section>
      <hr className='text-gray-600' />
      <div className='flex items-center content-center mx-auto place-content-center border-t-2'>
        <div className='py-4'>
          <Images className='text-emerald-600' />{" "}
        </div>
        <label htmlFor='content'>
          <span className='font-bold cursor-pointer'>Photos/Videos</span>
        </label>
      </div>
      <input type='file' className='hidden' id='content' name='content' />
    </div>
  );
};

export default Banner;
