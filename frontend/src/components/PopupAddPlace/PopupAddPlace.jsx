import React, { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useFormWithValidation } from "../../hooks/useForm";

export default function PopupAddPlace({
  isOpen,
  onClose,
  onAddPlace,
  buttonText,
}) {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add-place"}
      isOpen={isOpen}
      onClose={onClose}
      buttonValue={buttonText}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input
        name="title"
        type="text"
        className="popup__input popup__input_type_title form__input"
        id="title-input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={values.title}
        onChange={handleChange}
        required
      />
      <span className="form__input-error title-input-error">
        {errors.title || ""}
      </span>
      <input
        name="link"
        type="url"
        className="popup__input popup__input_type_link form__input"
        id="link-input"
        placeholder="Ссылка на картинку"
        value={values.link}
        onChange={handleChange}
        required
      />
      <span className="form__input-error link-input-error">
        {errors.link || ""}
      </span>
    </PopupWithForm>
  );
}
