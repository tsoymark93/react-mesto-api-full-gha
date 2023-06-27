import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({ onEditAvatar, onAddPlace, onEditProfile, onCardClick, onCardLike, onCardDelete, cards }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                </div>
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            className="profile__edit-btn"
                            onClick={onEditProfile}
                            type="button"
                            aria-label="Изменить"
                        ></button>
                    </div>
                    <p className="profile__profession">{currentUser.about}</p>
                </div>
                <button className="profile__add-btn" onClick={onAddPlace} type="button" aria-label="Добавить"></button>
            </section>

            <section className="gallery">
                {cards.map((card) => (
                    <Card
                        card={card}
                        key={card._id}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;
