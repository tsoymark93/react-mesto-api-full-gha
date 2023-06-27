import React from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin, isLoading }) {
    const [data, setData] = React.useState({
        email: '',
        password: '',
    });

    const buttonText = isLoading ? 'Выполнение...' : 'Войти';

    function onChange(e) {
        const { name, value } = e.target;
        setData((oldData) => ({ ...oldData, [name]: value }));
    }

    function onSubmit(e) {
        e.preventDefault();
        const { email, password } = data;
        onLogin(email, password);
    }

    return (
        <form className="authForm" name="login" onSubmit={onSubmit}>
            <h3 className="authForm__title">Вход</h3>
            <input
                type="email"
                className="authForm__inputs"
                name="email"
                placeholder="Email"
                required
                onChange={onChange}
                value={data.email}
            />
            <input
                type="password"
                className="authForm__inputs"
                name="password"
                placeholder="Пароль"
                required
                onChange={onChange}
                value={data.password}
            />
            <button type="submit" name="login" className="authForm__submitButton">
                {buttonText}
            </button>
            <p className="authForm__toEnter">
                Не зарегистрированы?
                <Link to="/signup" className="authForm__linkToEnter">
                    {' '}
                    Регистрация
                </Link>
            </p>
        </form>
    );
}

export default Login;
