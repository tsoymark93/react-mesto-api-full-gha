import { CurrentUserContext } from 'contexts/CurrentUserContext';
import React, { useContext, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const { values, setValues, handleChange } = useForm({ name: '', about: '' });

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        if (isOpen && currentUser.name && currentUser.about) {
            setValues({ name: currentUser.name, about: currentUser.about });
        }
    }, [currentUser, isOpen, setValues]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(values);
    }

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                id="profile-name"
                placeholder="Имя"
                name="name"
                className="popup__input popup__input_name"
                required
                minLength={2}
                maxLength={40}
                onChange={handleChange}
                value={values.name}
            />
            <span className="popup__input-error profile-name-error"></span>
            <input
                type="text"
                id="profile-profession"
                placeholder="Профессия"
                name="about"
                className="popup__input popup__input_profession"
                required
                minLength={2}
                maxLength={200}
                onChange={handleChange}
                value={values.about}
            />
            <span className="popup__input-error profile-profession-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
