import React, { useState } from 'react';

export default function Register({handleRegistration}) {

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegistration(data);
  };

  return (
    <form className="auth__form" onSubmit={handleSubmit}>
      <h2 className="auth__title">Регистрация</h2>
      <input
        className="auth__input"
        placeholder="Email"
        type="email"
        name="email"
        onChange={handleChange}>
      </input>
      <input
        className="auth__input"
        placeholder="Пароль"
        type="password"
        name="password"
        onChange={handleChange}>
      </input>
      <button className="auth__submit-button">Зарегистрироваться</button>
      <div className="auth__container">
        <p className="auth__subtitle">Уже зарегистрированы?</p>
        <a href='#' className="auth__link">Войти</a>
      </div>
    </form>

  )
}