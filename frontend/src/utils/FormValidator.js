export default class FormValidator {
  constructor(selectors, formSelector) {
    this._selectors = selectors;
    this._form = document.querySelector(formSelector);
    this._inputList = Array.from(
      this._form.querySelectorAll(this._selectors.inputSelector)
    );
    this._buttonElement = this._form.querySelector(
      this._selectors.submitButtonSelector
    );
  }

  enableValidation = () => {
    this._setEventListeners(this._form);
  };

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._form.addEventListener("reset", () => {
      this._setInitialFormState();
    });
  };

  _setInitialFormState() {
    this._inputList.forEach((inputElement) => {
      this._errorElement = this._form.querySelector(
        `.${inputElement.id}-error`
      );
      this._hideInputError(inputElement);
    });
    this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  };

  _checkInputValidity = (inputElement) => {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _showInputError = (inputElement, errorMessage) => {
    inputElement.classList.add(this._selectors.inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._selectors.errorClass);
  };

  _hideInputError = (inputElement) => {
    inputElement.classList.remove(this._selectors.inputErrorClass);
    this._errorElement.classList.remove(this._selectors.errorClass);
    this._errorElement.textContent = "";
  };
}

