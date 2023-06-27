import React from 'react';

function PopupWithForm({ isOpen, onClose, name, title, buttonText, children, onSubmit }) {
    const classOpenPopup = `${isOpen && 'popup_opened'}`;

    return (
        <div className={`popup popup_type_${name} ${classOpenPopup}`}>
            <div className="popup__container">
                <button className="popup__close-btn" onClick={onClose} type="button" aria-label="Закрыть" />
                <h3 className="popup__title">{title}</h3>
                <form name={name} className="popup__form" onSubmit={onSubmit}>
                    <div>{children}</div>
                    <button type="submit" className="popup__save-btn" aria-label="Сохранить">
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
