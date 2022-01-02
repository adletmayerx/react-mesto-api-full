import React from "react";

export default function HeaderInfo({ headerEmail, signOut }) {
  return (
    <div className="header__info">
      <p className="header__email">{headerEmail}</p>
      <p to="/sign-in" className="header__link link" onClick={signOut}>
        Выйти
      </p>
    </div>
  );
}
