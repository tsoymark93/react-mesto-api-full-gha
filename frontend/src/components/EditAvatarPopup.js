import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({ avatar: avatarRef.current.value });
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                id="avatar"
                placeholder="Ссылка на аватарку"
                name="avatar"
                className="popup__input popup__input_avatar"
                required
                minLength={2}
                ref={avatarRef}
            />
            <span className="popup__input-error avatar-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
