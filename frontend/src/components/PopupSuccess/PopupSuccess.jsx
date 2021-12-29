import React from "react";
import PopupInfo from "../PopupInfo/PopupInfo";
import infoImage from '../../images/popupInfoImage_success.png'


export default function PopupSuccess({ isOpen, onClose }) {
  return (
    <PopupInfo
      popupType="success"
      popupInfoImage={infoImage}
      popupInfoTitle="Вы успешно зарегистрировались!"
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}