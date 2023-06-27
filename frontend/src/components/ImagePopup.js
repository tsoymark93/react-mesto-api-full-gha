import React from 'react';

function ImagePopup({ card, isOpen, onClose }) {
    const classOpenPopup = `${isOpen && 'popup_opened'}`;
    return (
        <div className={`popup popup_type_image ${classOpenPopup}`}>
            <figure className="popup__figure">
                <button className="popup__close-btn" onClick={onClose} type="button" aria-label="Закрыть"></button>
                <img className="popup__image" src={card.link} alt={card.name} />
                <figcaption className="popup__description">{card.name}</figcaption>
            </figure>
        </div>
    );
}
export default ImagePopup;
