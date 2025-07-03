import React from "react";

function Modal({ title, onSuccess, onReject }) {
  return (
    <section className='z-20  pt-4 rounded-xl w-[340px] mx-auto shadow-lg h-[130px] bg-white fixed left-[calc(100vw/2-340px/2)] top-[calc(100vh/2-130px/2)]'>
      <h2 className='font-bold text-center'>{title}</h2>
      <div className='flex justify-center gap-2 items-center mt-2 rounded-4xl py-3'>
        <button
          onClick={onSuccess}
          className='text-white transition  hover:bg-red-500 bg-red-700 rounded-md px-3 py-1 '
        >
          Oui
        </button>
        <button
          onClick={onReject}
          className='text-white transition hover:bg-green-500 bg-green-700 rounded-md px-3 py-1'
        >
          Non
        </button>
      </div>
    </section>
  );
}

export default Modal;