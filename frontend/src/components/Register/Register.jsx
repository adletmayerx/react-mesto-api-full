import React, { useState, useRef, useEffect } from "react";
import FormValidator from "../../utils/FormValidator.js";
import { selectors, registerFormSelector } from "../../utils/selectors.js";
import { Link } from "react-router-dom";

export default function Register({ handleSignUp, currentPath }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerFormRef = useRef(null);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      handleSignUp(email, password);
      registerFormRef.current.reset();
    }
  };

  useEffect(() => {
    const registerFormValidator = new FormValidator(selectors, registerFormSelector);
    const handleRegisterValidation = () => {
      registerFormValidator.enableValidation();
    };

    handleRegisterValidation();
  }, []);

  return (
    <div className="register">
      <h2 className="title register__title">Регистрация</h2>
      <form
        ref={registerFormRef}
        name="register-form"
        className="form register__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          name="email"
          id="email-input"
          type="email"
          className="register__input form__input input input_type_email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
          minLength="4"
          maxLength="40"
          required
        />
        <span className="form__input-error email-input-error"></span>
        <input
          name="password"
          id="password-input"
          type="password"
          className="register__input form__input input input_type_password"
          placeholder="Пароль"
          value={password}
          onChange={handleChangePassword}
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__input-error password-input-error"></span>
        <button type="submit" className="register__submit-button form__submit">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="link register__tip">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}
