import React from "react";
import { Link } from "react-router-dom";

export default function HeaderInfo({ headerEmail, signOut }) {
  return (
    <div className="header__info">
      <p className="header__email">{headerEmail}</p>
      <Link to="/sign-in" className="header__link link" onClick={signOut}>
        Выйти
      </Link>
    </div>
  );
}