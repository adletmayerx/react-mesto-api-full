import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Card({
  url,
  alt,
  title,
  likes,
  owner,
  id,
  onCardClick,
  onRemoveButtonClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);

  const handleClick = () => {
    onCardClick(url, title);
  };

  const handLikeClick = () => {
    onCardLike(likes, id);
  };

  const handleDeleteClick = () => {
    onRemoveButtonClick(id);
  };

  const isOwn = owner === currentUser._id;

  const elementRemoveButtonClassName = `button element__remove-button ${
    isOwn ? "element__remove-button_visible" : "element__remove-button_hidden"
  }`;

  const isLiked = likes.some((i) => {
    console.log(i, currentUser._id);
    return i === currentUser._id;
    
  });
  const elementLikeButtonClassName = `button element__like-button ${
    isLiked && "element__like-button_active"
  }`;

  return (
    <article className="element">
      <button
        type="button"
        className={elementRemoveButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <img
        src={url}
        alt={alt}
        className="element__image"
        onClick={handleClick}
      />
      <div className="element__description">
        <h2 className="element__title">{title}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={elementLikeButtonClassName}
            onClick={handLikeClick}
          ></button>
          <p className="element__like-counter">{likes.length}</p>
        </div>
      </div>
    </article>
  );
}
