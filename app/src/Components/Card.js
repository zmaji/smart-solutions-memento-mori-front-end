import React from 'react';
import { useState } from 'react';
import ChevronDown from '../icons/chevron-down.svg'
import ChevronUp from '../icons/chevron-up.svg'

const Post = ({ card }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {  
    setShowMore(!showMore);
  };

  const formatDate = dateString => new Date(dateString).toLocaleDateString('nl-NL');

  return (
    <div className={`c-graveyard-overview__post c-graveyard-item ${!showMore ? 'c-graveyard-item--max-height' : ''}`}>
      <div className="c-graveyard-item__content-container">
        <h2 className="c-graveyard-item__title--big c-graveyard-item__title--round">{card.grave_id}</h2>
        <h2 className="c-graveyard-item__title">{card.voornamen} {card.achternaam}</h2>
        <h2 className="c-graveyard-item__description">{card.roepnaam && card.roepnaam !== card.voornamen ? `(${card.roepnaam})` : '(Geen roepna(a)m(en) bekend)'}</h2>
        <div className="c-graveyard-item__description">{formatDate(card.geboortedatum)} - {formatDate(card.datum_overlijden)}</div>
        <h2 className="c-graveyard-item__subtitle">{card.functie || 'Geen functie bekend'}</h2>
        {showMore && (
          <div className="c-graveyard-item__show-more-container">
            <div className="c-graveyard-item__description">Geslacht: {card.geslacht || 'Geen geslacht bekend'}</div>
            <div className="c-graveyard-item__description">Leeftijd: {card.leeftijd_tijdens_overlijden || 'Geen leeftijd bekend'}</div>
            <div className="c-graveyard-item__description">Rol: {card.rol || 'Geen rol bekend'}</div>
            <div className="c-graveyard-item__description">Geboorteplaats: {card.geboorteplaats || 'Geen geboorteplaats bekend'}</div>
            <div className="c-graveyard-item__description">Provincie: {card.provincie || 'Geen provincie bekend'}</div>
            <div className="c-graveyard-item__description">Vader: {'Geen vader bekend'}</div>
            <div className="c-graveyard-item__description">Moeder: {'Geen moeder bekend'}</div>
            <div className="c-graveyard-item__description">Reden overlijden: {card.reden_overlijden || 'Geen reden overlijden bekend'}</div>
            <div className="c-graveyard-item__description">Pupil van: {card.pupil_vanaf || 'Geen datum bekend'}</div>
            <div className="c-graveyard-item__description">Pupil tot: {card.pupil_tot || 'Geen datum bekend'}</div>
            <div className="c-graveyard-item__description">Bijzonderheden: {card.bijzonderheden || 'Geen bijzonderheden bekend'}</div>
          </div>
        )}
      </div>

      <div className="c-graveyard-item__button-container">
        <div className="c-graveyard-item__button c-button" onClick={toggleShowMore}>
          {showMore ? 'Bekijk minder' : 'Bekijk meer'}
          <svg className="c-icon c-graveyard-item__icon c-button__icon">
            <use href={showMore ? ChevronUp + '#chevron-up' : ChevronDown + '#chevron-down'}/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Post;
