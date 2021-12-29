import React from 'react';
import { Routes, Route} from 'react-router-dom';
import logo from '../../images/logo.svg'
import HeaderInfo from '../HeaderInfo/HeaderInfo';
import LoginHeader from '../LoginHeader/LoginHeader';
import RegisterHeader from '../RegisterHeader/RegisterHeader';

export default function Header({ headerEmail, signOut, loggedIn }) {
  return (
    <header className="header">
      <img src={logo} alt="лого сайта 'Место'" className="header__logo" />
      <Routes>
        {loggedIn && <Route exact path="/" element={<HeaderInfo headerEmail={headerEmail} signOut={signOut} />} />}
        <Route exact path="/sign-up" element={<LoginHeader />} />
        <Route exact path="/sign-in" element={<RegisterHeader />} />
      </Routes>
    </header>
  );
}
