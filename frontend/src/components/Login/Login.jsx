import React, { useState, useRef, useEffect } from "react";
import FormValidator from "../../utils/FormValidator.js";
import { selectors, loginFormSelector } from "../../utils/selectors.js";

export default function Login({ handleSignIn, currentPath }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginFormRef = useRef(null);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email || password) {
      handleSignIn(email, password);
      loginFormRef.current.reset();
    }
  };

  useEffect(() => {
    const loginFormValidator = new FormValidator(selectors, loginFormSelector);
    const handleLoginValidation = () => {
      loginFormValidator.enableValidation();
    };

    handleLoginValidation();
  }, []);

  return (
    <div className="login">
      <h2 className="title login__title">Вход</h2>
      <form
        ref={loginFormRef}
        name="login-form"
        className="form login__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          name="email"
          id="email-input"
          type="email"
          className="form__input login__input input input_type_email"
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
          className="form__input login__input input input_type_password"
          placeholder="Пароль"
          value={password}
          onChange={handleChangePassword}
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__input-error password-input-error"></span>
        <button type="submit" className="login__submit-button form__submit">
          Войти
        </button>
      </form>
    </div>
  );
}
