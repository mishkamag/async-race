import React from "react";

const Modal = () => {
  return (
    <div className="modal">
      <div className="modal__container">
        <p className="modal__message">Server not found</p>
        <p className="modal__message">
          Please run server or download it from
          <a
            className="modal__link"
            href="https://github.com/mikhama/async-race-api"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  );
};

export default Modal;
