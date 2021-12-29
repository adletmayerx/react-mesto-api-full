import React, {useContext} from 'react';
import Card from '../Card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onRemoveButtonClick,
  cards,
  onCardLike,
  }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-container" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt="фотография обладателя профиля"
            className="profile__image"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            url={card.link}
            alt={card.name}
            title={card.name}
            likes={card.likes}
            owner={card.owner}
            id={card._id}
            key={card._id}
            onCardClick={onCardClick}
            onRemoveButtonClick={onRemoveButtonClick}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  );
}
