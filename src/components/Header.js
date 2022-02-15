import React from 'react';

function Header(props) {
    return (
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__login-container">
                {props.loggedIn && (
                    <>
                        <p className="header__user-mail">email@mail.com</p>
                        <button className="header__button">Выйти</button>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header;