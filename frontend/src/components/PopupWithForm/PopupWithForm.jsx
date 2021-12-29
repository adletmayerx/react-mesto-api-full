import React, { useRef, useEffect } from "react";

export default function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  buttonValue,
  children,
  onSubmit,
}) {
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.reset();
  }, [isOpen]);

  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={onClose}
    >
      <div className="popup__container">
        <button type="button" className="popup__close-button button"></button>
        <h2 className="popup__title">{title}</h2>
        <form
          ref={formRef}
          name={name}
          className="form"
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            type="submit"
            className="popup__save-button popup__submit-button form__submit"
          >
            {buttonValue}
          </button>
        </form>
      </div>
    </div>
  );
}
