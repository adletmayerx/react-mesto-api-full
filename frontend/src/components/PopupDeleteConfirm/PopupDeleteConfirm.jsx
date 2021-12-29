import React, { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import FormValidator from "../../utils/FormValidator.js";
import { selectors, editProfileFormSelector } from "../../utils/selectors.js";

export default function PopupDeleteConfirm({
  isOpen,
  onClose,
  onDelete,
  buttonText,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    onDelete();
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

  return (
    <PopupWithForm
      title={"Вы уверены?"}
      name={"delete-confirm"}
      isOpen={isOpen}
      onClose={onClose}
      buttonValue={buttonText}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}
