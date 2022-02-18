import React from 'react';

export default function Login() {
  return (
    <form className="auth__form">
      <h2 className="auth__title">Вход</h2>
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
      <button className="auth__submit-button">Войти</button>
    </form>
  )
}