import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ children,showModal, toggleModal }) => {



  return (
    <div>
      {showModal && (
        <div className="overlay">
          <div>
            <div className="modal">
              <div>
                {children}
              </div>
              <div>
                <button
                  className='button'
                  onClick={toggleModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;