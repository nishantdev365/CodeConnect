import React from 'react';
import Avatar from "react-avatar";

const user = ({userName}) => {
  return (
    <div className="user flex flex-col justify-items-center items-center text-center font-semibold mb-6">
        <Avatar name={userName} size={50} round="50%"/>
        <span className='userName'>
          {userName}
        </span>
    </div>
  )
}

export default user