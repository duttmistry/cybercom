// import { useState, CSSProperties } from "react";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override={
  margin: '0 auto',
  position: 'absolute',
  
  borderColor: '#f69727',
  borderWidth:'3px',
  zIndex:100
};

function LoadingIndicator() {
  return (
    <div className="loading" style={{ zIndex: 999 }}>
      <ClipLoader cssOverride={override} size={100} />
    </div>
  );
}

export default LoadingIndicator;