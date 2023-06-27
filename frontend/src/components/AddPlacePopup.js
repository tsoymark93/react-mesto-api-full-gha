import React, { useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
    const { values, setValues, handleChange } = useForm({ name: '', link: '' });

    useEffect(() => {
        if (isOpen) {
            setValues({ name: '', link: '' });
        }
    }, [setValues, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(values);
    }

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                id="gallery-name"
                placeholder="Название"
                name="name"
                className="popup__input popup__input_gallery"
                required
                // @ts-ignore
                minLength="2"
                // @ts-ignore
                maxLength="30"
                value={values.name}
                onChange={handleChange}
            />
            <span className="popup__input-error gallery-name-error"></span>
            <input
                type="url"
                id="gallery-link"
                placeholder="Ссылка на картинку"
                name="link"
                className="popup__input popup__input_link"
                required
                value={values.link}
                onChange={handleChange}
            />
            <span className="popup__input-error gallery-link-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
