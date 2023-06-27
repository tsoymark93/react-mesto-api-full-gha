import React from 'react';

const ErrorPopup = ({ isOpen, errorMessage, onClose }) => {
    return (
        <div className={`popup popup_content_error-message${isOpen ? ' popup_opened' : ''}`} onMouseDown={onClose}>
            <div className="popup__container">
                <button aria-label="закрыть" className="popup__close-btn" />
                <p className="popup__error-message">{errorMessage}</p>
            </div>
        </div>
    );
};

export default ErrorPopup;
