/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useHover } from '@uidotdev/usehooks';
import UseClickOutSide from '../../hooks/UseClickOutSide';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

/* eslint-disable no-unused-vars */
const ToolTip = ({ children, ...props }) => {
  const navigate = useNavigate();

  const myRef = useRef(null);
  const { show, setShow, nodeRef } = UseClickOutSide();
  show;
  const [ref, hovering] = useHover();
  //   const [coords, setCoords] = useState();
  //   const position = hovering ? `var(--${})` : 'var(--charcoal)';
  //   (coords);
  const handleLogOut = () => {
    navigate('/login');
    sessionStorage.removeItem('account');
    window.location.reload(false);
    // ('ok');
  };

  return (
    <div ref={ref} onClick={(e) => setShow(!show)}>
      <div ref={nodeRef}>{children}</div>
      {hovering && (
        <span
          className="p-2 bg-[#282828] text-white rounded-md absolute text-xs translate-y-1/2"
          style={{
            bottom: 0,
            right: 0,
          }}
        >
          {props.text}
        </span>
      )}
      {show && (
        <div className="p-1 pr-0 rounded-sm absolute translate-y-3 top-full right-2 w-[100px] overflow-hidden mt-2 bg-[#282828] overflow-y-scroll -z-10 text-xs">
          <div
            className="p-3 cursor-pointer hover:bg-[#ffffff50] transition w-full rounded-sm"
            onClick={(e) => {
              e.preventDefault();
              navigate('/profile');
            }}
          >
            Edit
          </div>
          <div
            className="p-3 cursor-pointer hover:bg-[#ffffff50] transition w-full rounded-sm"
            onClick={handleLogOut}
          >
            Log out
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolTip;
