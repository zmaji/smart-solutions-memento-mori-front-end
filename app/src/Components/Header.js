import React from 'react';
import logoImage from '../images/logo-stichting-memento-mori.jpg';
import bannerImage from '../images/Weezenkerkhof_treurbeuk.jpg';

const Header = () => {
  return (
    <header className="c-graveyard-header__container">
      <div className="c-graveyard-header__logo u-squeeze u-squeeze--xl">
        <img src={logoImage} alt="Logo Stichting Memento Mori" />
      </div>
      <div className="c-graveyard-header__banner">
        <img src={bannerImage} alt="Banner" />
        <div className="c-graveyard-header__content-container">
          <div className="c-graveyard-header__content-container--title">Database Weezenkerkhof</div>
          <div className="c-graveyard-header__content-container--description">
            Voor meer informatie kunt u contact opnemen met het bestuur van Stichting Memento Mori op onderstaand adres
          </div>
          <div className="c-graveyard-header__content-container--email">mementomori1878@gmail.com</div>
        </div>
      </div>
    </header>
  );
};

export default Header;