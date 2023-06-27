import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function ConfirmPopup({ isOpen, isLoading, onClose, onConfirmRemove }) {
    const onSubmit = (e) => {
        e.preventDefault();
        onConfirmRemove();
    };

    return (
        <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            buttonText={isLoading ? 'Подождите...' : 'Да'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            children={undefined}
        />
    );
}
