/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';

export default function UseClickOutSide() {
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);
  useEffect(() => {
    function handleClickOutDropdown(e) {
      if (nodeRef.current && !nodeRef.current.contains(e.target)) {
        setShow(false);
      }
    }
    document.addEventListener('click', handleClickOutDropdown);
    return () => {
      document.removeEventListener('click', handleClickOutDropdown);
    };
  }, []);
  return {
    show,
    setShow,
    nodeRef,
  };
}
