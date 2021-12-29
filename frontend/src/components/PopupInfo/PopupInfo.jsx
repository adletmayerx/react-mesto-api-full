import React from "react";

export default function PopupInfo({
  popupType,
  popupInfoImage,
  popupInfoTitle,
  isOpen,
  onClose,
}) {
  return (
    <div
      className={`popup popup-info popup-info__${popupType} ${
        isOpen && "popup_opened"
      }`}
      onClick={onClose}
    >
      <div className="popup__container popup-info__container">
        <button type="button" className="popup__close-button button"></button>
        <img
          src={popupInfoImage}
          alt="иконка для попапа"
          className="popup-info__image"
        />
        <h2 className="popup-info__title">{popupInfoTitle}</h2>
      </div>
    </div>
  );
}
