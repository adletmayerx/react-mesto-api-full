import React from "react";
import PopupInfo from "../PopupInfo/PopupInfo";
import infoImage from "../../images/popupInfoImage_fail.png";

export default function PopupFail({ isOpen, onClose }) {
  return (
    <PopupInfo
      popupType="fail"
      popupInfoImage={infoImage}
      popupInfoTitle="Что-то пошло не&nbsp;так! Попробуйте ещё раз!"
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}
