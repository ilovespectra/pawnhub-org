import React from 'react';

const Modal = ({ showModal, setShowModal, children }) => {
    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        // Conditionally render the modal based on the showModal prop
        <>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
