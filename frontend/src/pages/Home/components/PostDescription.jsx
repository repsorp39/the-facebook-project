import { Ellipsis } from "lucide-react";
import React, { useState } from "react";

const PostDescription = ({ description }) => {
  const [seeMore, setSeeMore] = useState(false);
  return (
    <div className='px-4 pb-2 text-gray-700 text-sm leading-relaxed'>
      {description.length < 300 ? (
        description
      ) : (
        <div>
          {seeMore ? description : description.substr(0, 300)}
          <span
            onClick={() => setSeeMore(!seeMore)}
            className='font-semibold text-blue-600 hover:underline transition cursor-pointer'
          >
            {!seeMore ? " ... voir plus" : " ... voir moins"}
          </span>
        </div>
      )}
    </div>
  );
};

export default PostDescription;
