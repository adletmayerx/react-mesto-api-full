import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import PopupEditAvatar from "./PopupEditAvatar/PopupEditAvatar";
import PopupEditProfile from "./PopupEditProfile/PopupEditProfile";
import PopupAddPlace from "./PopupAddPlace/PopupAddPlace";
import PopupDeleteConfirm from "./PopupDeleteConfirm/PopupDeleteConfirm";
import ImagePopup from "./PopupImage/PopupImage";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import PopupSuccess from "./PopupSuccess/PopupSuccess";
import PopupFail from "./PopupFail/PopupFail";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import auth from "../utils/auth.js";
import { createBrowserHistory } from "history";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] =
    useState(false);
  const [isFailPopupOpen, setIsFailPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [deletingCardId, setDeletingCardId] = useState("");
  const [buttonAvatarText, setButtonAvatarText] = useState("Сохранить");
  const [buttonProfileText, setButtonProfileText] = useState("Сохранить");
  const [buttonAddPlaceText, setButtonAddPlaceText] = useState("Создать");
  const [buttonDeleteText, setButtonDeleteText] = useState("Да");
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const history = createBrowserHistory();
  const [currentPath, setCurrentPath] = useState(history.location.pathname);

  const navigate = useNavigate();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleRemoveButtonClick = (id) => {
    setDeletingCardId(id);
    setIsDeleteConfirmPopupOpen(true);
  };

  const handleCardClick = (url, title) => {
    setSelectCard({ url, title });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteConfirmPopupOpen(false);
    setIsFailPopupOpen(false);
    setIsSuccessPopupOpen(false);

    setSelectCard({});
  };

  const handlePopupClosing = (e) => {
    if (
      e.target.classList.contains("popup") ||
      e.target.classList.contains("popup__close-button")
    ) {
      closeAllPopups();
    }
  };

  const handleUpdateUser = ({ name, about }) => {
    setButtonProfileText("Сохранение...");
    api
      .editProfile(name, about)
      .then((res) => setCurrentUser(res))
      .then(() => {
        closeAllPopups();
        setButtonProfileText("Сохранить");
      })
      .catch((err) => {
        console.log(err);

        return [];
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setButtonAvatarText("Сохранение...");
    api
      .editAvatar(avatar)
      .then((res) => setCurrentUser(res))
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);

        return [];
      })
      .finally(() => setButtonAvatarText("Сохранить"));
  };

  const handleAddPlaceSubmit = ({ title, link }) => {
    setButtonAddPlaceText("Сохранение...");
    api
      .addCard(title, link)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);

        return [];
      })
      .finally(() => setButtonAddPlaceText("Создать"));
  };

  const handleCardDelete = () => {
    setButtonDeleteText("Удаление...");
    api
      .deleteCard(deletingCardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deletingCardId));
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);

        return [];
      })
      .finally(() => setButtonDeleteText("Да"));
  };

  const handleCardLike = (likes, id) => {
    const isLiked = likes.some((i) => i === currentUser._id);

    if (isLiked) {
      api
        .removeLike(id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
        })
        .catch((err) => {
          console.log(err);

          return [];
        });
    } else {
      api
        .addLike(id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
        })
        .catch((err) => {
          console.log(err);

          return [];
        });
    }
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        setLoggedIn(false);
        setCurrentUserEmail("");
        navigate("/");
      })
      .catch((e) => console.log(`${e} при выходе из приложения`));
  };

  const handleSignIn = ({ email, password }) => {
    auth
      .authorise(email, password)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUserEmail(email);
        setCurrentUser(res);
        navigate("/");
      })
      .catch((e) => {
        console.log(`${e} при авторизации`);
        setIsFailPopupOpen(true);
      });
  };

  const handleSignUp = ({ email, password }) => {
    auth
      .register(email, password)
      .then((res) => {
        if (res.statusCode !== 400) {
          setIsSuccessPopupOpen(true);

          navigate("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);

        setIsFailPopupOpen(true);

        return [];
      });
  };

  useEffect(() => {
    if (loggedIn) {
      const promises = [api.getUserInfo(), api.getInitialCards()];

      Promise.all(promises)
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards);
        })
        .catch((result) => console.log(`${result} при загрузке данных`));
    }
  }, [loggedIn]);

  const tokenCheck = useCallback(() => {
    auth
      .getContent()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUserEmail(res.email);
          navigate("/");
        } else {
          setIsFailPopupOpen(true);
        }
      })
      .catch((e) => console.log(`${e} при проверке токена`));
  }, [navigate]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  useEffect(() => {
    const handleEscClick = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", handleEscClick);
    return () => {
      document.removeEventListener("keydown", handleEscClick);
    };
  }, []);

  useEffect(() => {
    const { pathname } = history.location;
    setCurrentPath(pathname);
  }, [history.location]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        headerEmail={currentUserEmail}
        signOut={handleSignOut}
        loggedIn={loggedIn}
      />

      <Routes>
        <Route
          exact
          path="/sign-in"
          element={
            <Login handleSignIn={handleSignIn} currentPath={currentPath} />
          }
        ></Route>

        <Route
          exact
          path="/sign-up"
          element={
            <Register handleSignUp={handleSignUp} currentPath={currentPath} />
          }
        ></Route>

        <Route
          exact
          path="/"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onRemoveButtonClick={handleRemoveButtonClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          }
        />

        <Route
          path="*"
          element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
        />
      </Routes>

      <Footer />

      <PopupEditAvatar
        isOpen={isEditAvatarPopupOpen}
        onClose={handlePopupClosing}
        onUpdateAvatar={handleUpdateAvatar}
        buttonText={buttonAvatarText}
      />

      <PopupEditProfile
        isOpen={isEditProfilePopupOpen}
        onClose={handlePopupClosing}
        onUpdateUser={handleUpdateUser}
        buttonText={buttonProfileText}
      />

      <PopupAddPlace
        isOpen={isAddPlacePopupOpen}
        onClose={handlePopupClosing}
        onAddPlace={handleAddPlaceSubmit}
        buttonText={buttonAddPlaceText}
      />

      <ImagePopup
        onClose={handlePopupClosing}
        url={selectedCard.url}
        title={selectedCard.title}
      />

      <PopupDeleteConfirm
        isOpen={isDeleteConfirmPopupOpen}
        onClose={handlePopupClosing}
        onDelete={handleCardDelete}
        buttonText={buttonDeleteText}
      />

      <PopupSuccess isOpen={isSuccessPopupOpen} onClose={handlePopupClosing} />
      <PopupFail isOpen={isFailPopupOpen} onClose={handlePopupClosing} />
    </CurrentUserContext.Provider>
  );
}

export default App;
