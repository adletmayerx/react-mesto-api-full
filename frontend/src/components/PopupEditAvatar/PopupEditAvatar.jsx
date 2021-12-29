import React, { useRef, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import FormValidator from "../../utils/FormValidator.js";
import { selectors, editAvatarFormSelector } from "../../utils/selectors.js";

export default function PopupEditAvatar({ isOpen, onClose, onUpdateAvatar, buttonText }) {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  useEffect(() => {
    const editAvatarFormValidator = new FormValidator(
      selectors,
      editAvatarFormSelector
    );
    const handleEditAvatarValidation = () => {
      editAvatarFormValidator.enableValidation();
    };

    window.addEventListener("load", handleEditAvatarValidation);

    return () => {
      window.removeEventListener("load", handleEditAvatarValidation);
    };
  }, []);
  
  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"edit-avatar"}
      isOpen={isOpen}
      onClose={onClose}
      buttonValue={buttonText}
      onSubmit={handleSubmit}
    >
      <input
        name="avatar"
        type="url"
        className="popup__input popup__input_type_avatar form__input"
        id="avatar-input"
        placeholder="Обновить аватар"
        ref={inputRef}
        required
      />
      <span className="form__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}
