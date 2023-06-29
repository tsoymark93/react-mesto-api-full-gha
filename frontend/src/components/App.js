import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import * as auth from '../utils/mestoAuth';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import ErrorPopup from './ErrorPopup';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Main from './Main';
import Popup from './Popup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';

function App() {
    const history = useHistory();

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isRemoveCardPopupOpen, setIsRemoveCardPopupOpened] = useState(false);
    const [cardToDelete, setCardTodelete] = useState({});
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userProfile, setUserProfile] = useState('');
    const [isRegisterResultPopupOpen, setIsRegisterResultPopupOpen] = React.useState(false);
    const [isRegisterSucceed, setIsRegisterSucceed] = React.useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isErrorMessagePopupOpen, setIsErrorMessagePopupOpen] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleEditPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setIsRemoveCardPopupOpened(false);
    }

    function handleClickTooltipPopupClose() {
        setIsRegisterResultPopupOpen(false);
        if (isRegisterSucceed) {
            history.push('/signin');
        } else {
            history.push('/signup');
        }
    }

    function handleCardClick(card) {
        setIsImagePopupOpen(true);
        setSelectedCard(card);
    }

    function closeErrorMessage() {
        setIsErrorMessagePopupOpen(false);
        setTimeout(() => setErrorMessage(''), 500);
    }

    function handleLikeClick(card) {
        // @ts-ignore
        const isLiked = card.likes.some((like) => like === currentUser._id);
    
        api
          .changeLikeCardStatus(card._id, !isLiked)
          .then((newCard) => {
            setCards((cards) =>
              cards.map((item) => (item._id === card._id ? newCard : item))
            );
          })
          .catch((err) => console.log(err));
      };

    function showErrorPopup({ message }) {
        setErrorMessage(message);
        setIsErrorMessagePopupOpen(true);
    }

    function handleCardDelete(card) {
        setIsRemoveCardPopupOpened(true);
        setCardTodelete(card);
    }

    function handleUpdateUser(userData) {
        setIsLoading(true);
        api.setUser(userData)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .finally(() => setIsLoading(false))
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(avatarData) {
        setIsLoading(true);
        api.updateAvatar(avatarData)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .finally(() => setIsLoading(false))
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(cardData) {
        setIsLoading(true);
        api.createCard(cardData)
            .then((newCard) => {
                setCards((cards) => [newCard, ...cards]);
                closeAllPopups();
            })
            .finally(() => setIsLoading(false))
            .catch((err) => {
                console.log(err);
            });
    }

    function handleConfirmRemove() {
        setIsLoading(true);
        // @ts-ignore
        api.removeCard(cardToDelete._id)
            .then(() => {
                // @ts-ignore
                setCards((state) => state.filter((item) => item._id !== cardToDelete._id));
                closeAllPopups();
            })
            .finally(() => setIsLoading(false))
            .catch((err) => {
                console.log(err);
            });
    }

    const tokenCheck = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const res = await auth.getContent(token);
                if (res.data) {
                    setLoggedIn(true);
                    setUserProfile(res.data.email);
                    history.push('/');
                }
            } catch (err) {
                setLoggedIn(false);
                history.push('/signin');
                showErrorPopup(err);
            }
        }
        setIsPageLoading(false);
    };

    function onRegister(email, password) {
        setIsRegisterLoading(true);
        auth.register(email, password)
            .then((data) => {
                if (data._id || data.email) {
                    setIsRegisterSucceed(true);
                }
            })
            .catch((err) => {
                console.log(err);
                setIsRegisterSucceed(false);
            })
            .finally(() => {
                setIsRegisterLoading(false);
            });
        setIsRegisterResultPopupOpen(true);
    }

    function onLogin(email, password) {
        setIsLoginLoading(true);
        auth.login(email, password)
            .then(() => {
                setUserProfile(email);
                setLoggedIn(true);
                history.push('/');
                setIsPageLoading(true);
            })
            .catch((err) => {
                console.log(err);
                setIsRegisterSucceed(false);
                setIsRegisterResultPopupOpen(true);
            })
            .finally(() => {
                setIsLoginLoading(false);
            });
    }

    function onSignOut() {
        localStorage.removeItem('token');
        history.push('/signin');
        setLoggedIn(false);
        setUserProfile('');
    }

    useEffect(() => {
        tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function loadMainContent() {
        if (loggedIn) {
            setIsPageLoading(true);
            Promise.all([api.getUser(), api.getInitialCards()])
                .then(([user, cards]) => {
                    setCurrentUser(user);
                    setCards(cards);
                    setIsPageLoading(false);
                })
                .catch(showErrorPopup);
        }
    }

    useEffect(() => {
        loadMainContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                {isPageLoading && <div className="loading-screen" />}
                <Header loggedIn={loggedIn} onSignOut={onSignOut} userProfile={userProfile} />
                <Switch>
                    <Route path="/signin">
                        <Login onLogin={onLogin} isLoading={isLoginLoading} />
                    </Route>
                    <Route path="/signup">
                        <Register onRegister={onRegister} isLoading={isRegisterLoading} />
                    </Route>
                    <ProtectedRoute
                        exact
                        path="/"
                        loggedIn={loggedIn}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleEditPlaceClick}
                        onEditProfile={handleEditProfileClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleLikeClick}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                        component={Main}
                    />
                    <Route path="*">{loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}</Route>
                </Switch>
                <Footer />
                <Popup
                    component={EditAvatarPopup}
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                />
                <Popup
                    component={EditProfilePopup}
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                />
                <Popup
                    component={AddPlacePopup}
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoading}
                />
                <Popup
                    component={ConfirmPopup}
                    isOpen={isRemoveCardPopupOpen}
                    onClose={closeAllPopups}
                    onConfirmRemove={handleConfirmRemove}
                    isLoading={isLoading}
                />
                <Popup component={ImagePopup} card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
                <Popup
                    component={ErrorPopup}
                    isOpen={isErrorMessagePopupOpen}
                    errorMessage={errorMessage}
                    onClose={closeErrorMessage}
                />
                <Popup
                    component={InfoTooltip}
                    isSuccess={isRegisterSucceed}
                    isOpen={isRegisterResultPopupOpen}
                    onClose={handleClickTooltipPopupClose}
                />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;