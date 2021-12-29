import React from "react";
import { Link } from "react-router-dom";

export default function LoginHeader() {
  return (
    <div className="header__sign">
      <Link to="/sign-in" className="header__link link">
        Войти
      </Link>
    </div>
  );
}