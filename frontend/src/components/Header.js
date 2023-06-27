import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import burgerImg from '../images/burger.svg';
import closeImg from '../images/Close.svg';
import logo from '../images/header__logo.svg';

function Header({ loggedIn, onSignOut, userProfile }) {
    const [menuOpened, setMenuOpened] = useState(false);

    const toggleMenu = () => {
        setMenuOpened((state) => !state);
    };

    const handleSignOut = () => {
        setMenuOpened(false);
        onSignOut();
    };

    return (
        <header className="header">
            <div className="header__container">
                <img className="header__logo" src={logo} alt="Место" />
                <Switch>
                    <Route path="/signin">
                        <Link className="header__auth-action" to="/signup">
                            Регистрация
                        </Link>
                    </Route>
                    <Route path="/signup">
                        <Link className="header__auth-action" to="/signin">
                            Войти
                        </Link>
                    </Route>
                    <Route path="/">
                        {loggedIn && (
                            <button
                                type="button"
                                className="header__burger-button"
                                style={{ backgroundImage: `url(${menuOpened ? closeImg : burgerImg})` }}
                                onClick={toggleMenu}
                            />
                        )}
                    </Route>
                </Switch>
            </div>
            <div className={`header__auth ${!menuOpened && 'header__auth_hidden'}`}>
                {userProfile && <span className="header__auth-profile">{userProfile}</span>}
                {loggedIn && (
                    <button className="header__auth-action header__auth-action_type_exit" onClick={handleSignOut}>
                        Выйти
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
