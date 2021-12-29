import React from "react";

export default function ImagePopup({ url, title, onClose }) {
  return (
    <div
      className={`popup popup-image ${title && "popup_opened"}`}
      onClick={onClose}
    >
      <div className="popup__container popup-image__container">
        <button
          type="button"
          className="popup__close-button popup-image__close-button button"
        ></button>
        <figure className="popup-image__figure">
          <img className="popup-image__image" src={url} alt={title} />
          <figcaption className="popup-image__caption">{title}</figcaption>
        </figure>
      </div>
    </div>
  );
}
