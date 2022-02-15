import React from 'react';

function Header() {
    return (
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__login-container">
                <p className="header__user-mail">email@mail.com</p>
                <button className="header__button-exit">Выйти</button>
            </div>
        </header>
    )
}

export default Header;