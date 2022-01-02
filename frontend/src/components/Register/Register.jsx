import React from "react";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useForm";

export default function Register({ handleSignUp, currentPath }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  // useEffect(() => {
  //   resetForm({});
  // }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    handleSignUp(values);
  }

  return (
    <div className="register">
      <h2 className="title register__title">Регистрация</h2>
      <form
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
          value={values.email || ""}
          onChange={handleChange}
          minLength="4"
          maxLength="40"
          required
        />
        <span className="form__input-error email-input-error">
          {errors.email}
        </span>
        <input
          name="password"
          id="password-input"
          type="password"
          className="register__input form__input input input_type_password"
          placeholder="Пароль"
          value={values.password || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__input-error password-input-error">
          {errors.password}
        </span>
        <button
          disabled={!isValid}
          type="submit"
          className={`register__submit-button form__submit ${
            !isValid && "popup__submit-button_inactive"
          }`}
        >
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="link register__tip">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}
