import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useFormWithValidation } from "../../hooks/useForm";

export default function PopupEditProfile({
  isOpen,
  onClose,
  onUpdateUser,
  buttonText,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser(values);
  };

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, isOpen, resetForm]);

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit-profile"}
      isOpen={isOpen}
      onClose={onClose}
      buttonValue={buttonText}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
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
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="form__input-error name-input-error">
        {errors.name || ""}
      </span>
      <input
        name="about"
        type="text"
        className="popup__input popup__input_type_about form__input"
        id="about-input"
        required
        minLength="2"
        maxLength="200"
        placeholder="Расскажите о себе"
        value={values.about || ""}
        onChange={handleChange}
      />
      <span className="form__input-error about-input-error">
        {errors.about || ""}
      </span>
    </PopupWithForm>
  );
}
