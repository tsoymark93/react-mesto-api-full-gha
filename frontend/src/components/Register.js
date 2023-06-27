import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister, isLoading }) {
    const [data, setData] = React.useState({
        email: '',
        password: '',
    });

    const buttonText = isLoading ? 'Выполнение...' : 'Зарегистрироваться';

    function onChange(e) {
        const { name, value } = e.target;
        setData((oldData) => ({ ...oldData, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = data;
        onRegister(email, password);
    }

    return (
        <form className="authForm" name="sign-up" action="#" method="get" onSubmit={handleSubmit}>
            <h2 className="authForm__title">Регистрация</h2>
            <input
                className="authForm__inputs"
                name="email"
                placeholder="Email"
                type="email"
                required
                onChange={onChange}
                value={data.email}
                minLength={2}
                maxLength={50}
            ></input>
            <input
                className="authForm__inputs"
                placeholder="Пароль"
                type="password"
                required
                onChange={onChange}
                name="password"
                value={data.password}
                minLength={8}
                maxLength={20}
            ></input>
            <button className="authForm__submitButton" type="submit">
                {buttonText}
            </button>
            <p className="authForm__toEnter">
                Уже зарегистрированы?
                <Link to="/signin" className="authForm__linkToEnter">
                    {' '}
                    Войти
                </Link>
            </p>
        </form>
    );
}

export default Register;
