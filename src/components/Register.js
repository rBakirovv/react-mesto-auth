import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <form className="auth__form">
      <h2 className="auth__title">Регистрация</h2>
      <input
        className="auth__input"
        placeholder="Email"
        type="email"
        name="email">
      </input>
      <input
        className="auth__input"
        placeholder="Пароль"
        type="password"
        name="password">
      </input>
      <button className="auth__submit-button">Зарегистрироваться</button>
      <div className="auth__container">
        <p className="auth__subtitle">Уже зарегистрированы?</p>
        <a href='#' className="auth__link">Войти</a>
      </div>
    </form>

  )
}

export default Register;