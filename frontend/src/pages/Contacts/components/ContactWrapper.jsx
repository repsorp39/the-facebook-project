import React, { Children, useEffect, useRef, useState } from "react";
import { ChevronsDown} from "lucide-react";
import { redirect } from "react-router-dom";


const ContactListWrapper = ({ listLength ,children ,setLimit}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const offset = 6;
  const totalPages = Math.ceil(listLength / offset);
  const ref = useRef(null);

    useEffect(() => {
      if (currentPage > 1) {
        setLimit(currentPage * offset);
      }
    }, [currentPage]);

    useEffect(()=>{
      window.scrollTo(0, document.documentElement.scrollHeight);
    })
  return (
    <>
      <section
      ref={ref}
        className='flex flex-wrap items-center content-center justify-center  gap-8 mb-5'
      >
        { children }
      </section>
      {totalPages > currentPage && (
        <div>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className='mt-5 shadow-sm rounded-md ring-2 mx-auto flex hover:bg-blue-50 py-1 px-2 font-semibold text-blue-700'
          >
            Voir plus <ChevronsDown />
          </button>
        </div>
      )}
    </>
  );
};

export default ContactListWrapper;
