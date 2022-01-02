import React, { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useFormWithValidation } from "../../hooks/useForm";

export default function PopupEditAvatar({
  isOpen,
  onClose,
  onUpdateAvatar,
  buttonText,
}) {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  useEffect(() => {
    resetForm({});
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values);
  }

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"edit-avatar"}
      isOpen={isOpen}
      onClose={onClose}
      buttonValue={buttonText}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input
        name="avatar"
        type="url"
        className="popup__input popup__input_type_avatar form__input"
        id="avatar-input"
        placeholder="Обновить аватар"
        value={values.avatar || ""}
        onChange={handleChange}
        required
      />
      <span className="form__input-error avatar-input-error">
        {errors.avatar || ""}
      </span>
    </PopupWithForm>
  );
}
