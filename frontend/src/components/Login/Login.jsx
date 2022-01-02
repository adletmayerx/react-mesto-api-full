import React from "react";
import { useFormWithValidation } from "../../hooks/useForm";

export default function Login({ handleSignIn }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  // useEffect(() => {
  //   resetForm({});
  // }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    handleSignIn(values);
  }

  return (
    <div className="login">
      <h2 className="title login__title">Вход</h2>
      <form
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
          className="form__input login__input input input_type_password"
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
          type="submit"
          disabled={!isValid}
          className={`login__submit-button form__submit ${
            !isValid && "popup__submit-button_inactive"
          }`}
        >
          Войти
        </button>
      </form>
    </div>
  );
}
