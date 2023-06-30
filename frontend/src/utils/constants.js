export const selectors = {
    formSelector: 'popup__container',
    inputSelector: 'popup__input',
    submitButtonSelector: 'popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible',
};

export const apiConfig = {
    baseUrl: 'https://api.tsoymark93.nomoreparties.sbs',
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    },
};

// Константы связанные с Popup Edit
export const popupEdit = '.popup_type_edit';
export const popupEditOpen = document.querySelector('.profile__edit-btn');
export const profileName = '.profile__name';
export const profileProfession = '.profile__profession';
export const inputEditName = document.querySelector('.popup__input_name');
export const inputEditProfession = document.querySelector('.popup__input_profession');
export const profileAvatar = '.profile__avatar';
export const profileAvatarContainer = document.querySelector('.profile__avatar-container');
// Константы связанные с Popup Add
export const popupAdd = '.popup_type_add';
export const popupAddOpen = document.querySelector('.profile__add-btn');
export const popupAddForm = document.querySelector('.popup__add-form');
// Константы связанные с Gallery массивом
export const gallerySection = '.gallery';
export const galleryTemplate = '.gallery-template';

// Константы связанные с Popup FullScreen
export const popupFs = '.popup_type_img';
export const popupFsClose = document.querySelector('.popup__close-btn');

export const popupConfirm = '.popup_type_confirm';
export const popupAvatar = '.popup_type_avatar';
// Валидация
export const formValidators = {};
