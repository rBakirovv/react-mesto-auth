import React, { useState, useEffect } from 'react';
import '../index.css'
import Main from './Main';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Register from './Register';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data)
      })
      .catch((err) => {
        console.log(err);
      })

    api.getInitialCards()
      .then(data => {
        setCards(data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const [selectedCard, setSelectedCard] = useState({
    isImageOpen: false,
    link: '',
    name: '',
  });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ isImageOpen: false, link: '', name: '' })
  };

  function handleCardClick(card) {
    const { link, name } = card
    setSelectedCard({ isImageOpen: true, link: link, name: name })
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body__container">
        <Header
          loggedIn={loggedIn}
        />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <PopupWithForm
          name='add'
          title='Новое место'
          buttonText='Создать'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          children={
            <>
              <input className="popup__field popup__field-mesto" id="popup__field-mesto" name="name" type="text"
                placeholder="Название" required minLength="2" maxLength="30" />
              <span id="popup__field-mesto-error" className="popup__error"></span>
              <input className="popup__field popup__field-link-mesto" id="popup__field-link-mesto" name="link" type="url"
                placeholder="Ссылка на картинку" required />
              <span id="popup__field-link-mesto-error" className="popup__error"></span>
            </>
          }
        />
        <PopupWithForm
          name='confirm'
          title='Вы уверены?'
          buttonText='Да'
        />
        <ImagePopup
          name={selectedCard.name}
          link={selectedCard.link}
          isOpen={selectedCard.isImageOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
