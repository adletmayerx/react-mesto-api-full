import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import FormValidator from "../../utils/FormValidator.js";
import { selectors, editProfileFormSelector } from "../../utils/selectors.js";

export default function PopupEditProfile({
  isOpen,
  onClose,
  onUpdateUser,
  buttonText,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({ name, about: description });
  };

  useEffect(() => {
    const editProfileFormValidator = new FormValidator(
      selectors,
      editProfileFormSelector
    );
    const handleEditProfileValidation = () => {
      editProfileFormValidator.enableValidation();
    };

    window.addEventListener("load", handleEditProfileValidation);

    return () => {
      window.removeEventListener("load", handleEditProfileValidation);
    };
  }, []);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit-profile"}
      isOpen={isOpen}
      onClose={onClose}
      buttonValue={buttonText}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        type="text"
        className="popup__input popup__input_type_name form__input"
        id="name-input"
        required
        minLength="2"
        maxLength="40"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="form__input-error name-input-error"></span>
      <input
        name="about"
        type="text"
        className="popup__input popup__input_type_about form__input"
        id="about-input"
        required
        minLength="2"
        maxLength="200"
        placeholder="Расскажите о себе"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <span className="form__input-error about-input-error"></span>
    </PopupWithForm>
  );
}
