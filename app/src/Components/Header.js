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
        <div className="c-graveyard-header__banner-title">Database Weezenkerkhof</div>
      </div>
    </header>
  );
};

export default Header;