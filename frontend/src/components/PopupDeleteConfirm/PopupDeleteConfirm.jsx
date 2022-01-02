import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

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
