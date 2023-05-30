import { useState } from 'react';
import ChevronDown from '../icons/chevron-down.svg';
import ChevronUp from '../icons/chevron-up.svg';
import Cross from '../icons/cross.svg';

const Post = ({ card }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  let geboorteDatum = card.geboortedatum ? new Date(card.geboortedatum).toLocaleDateString("nl-NL", options) : card.periode_geleefd.split('-')[0].trim().replace(/[()]/g, '');
  let sterfDatum = card.datum_overlijden ? new Date(card.datum_overlijden).toLocaleDateString("nl-NL", options) : card.periode_geleefd.split('-')[1].trim().replace(/[()]/g, '');


  const descriptionClassName = 'c-graveyard-item__description';
  const descriptionBlackClassName = `${descriptionClassName}--black`;

  return (
    <div className="c-graveyard-overview__post c-graveyard-item">
      <div className="c-graveyard-item__content-container">
        <h2 className="c-graveyard-item__title--big c-graveyard-item__title--round">{card.grave_id}</h2>
        <h2 className="c-graveyard-item__title">
          {card.voornamen} {card.achternaam}
        </h2>
        {card.roepnaam && card.roepnaam !== card.voornamen && (
          <h2 className={descriptionClassName}>
            ({card.roepnaam})
          </h2>
        )}
        <div className={descriptionClassName}>
          {geboorteDatum} - {sterfDatum}
          <svg className="c-icon c-graveyard-item__icon--cross">
            <use href={`${Cross}#cross`} />
          </svg>
        </div>
        <h2 className="c-graveyard-item__subtitle">{card.functie ?? null}</h2>
      </div>

      <div className="c-graveyard-item__button-container">
        <div className="c-graveyard-item__button c-button" onClick={toggleShowMore}>
          {showMore ? 'Bekijk minder' : 'Bekijk meer'}
          <svg className="c-icon c-graveyard-item__icon c-button__icon">
            <use href={showMore ? `${ChevronUp}#chevron-up` : `${ChevronDown}#chevron-down`} />
          </svg>
        </div>

        {showMore && (
          <div className="c-graveyard-item__show-more-container">
            {card.geslacht && (
              <div className={descriptionBlackClassName}>
                <strong>Geslacht:</strong> {card.geslacht}
              </div>
            )}
            {card.leeftijd_tijdens_overlijden && (
              <div className={descriptionBlackClassName}>
                <strong>Leeftijd:</strong> {card.leeftijd_tijdens_overlijden}
              </div>
            )}
            {card.rol && (
              <div className={descriptionBlackClassName}>
                <strong>Rol:</strong> {card.rol}
              </div>
            )}
            {card.geboorteplaats && (
              <div className={descriptionBlackClassName}>
                <strong>Geboorteplaats:</strong> {card.geboorteplaats}
              </div>
            )}
            {card.provincie && (
              <div className={descriptionBlackClassName}>
                <strong>Provincie:</strong> {card.provincie}
              </div>
            )}
            <div className={descriptionBlackClassName}>
              <strong>Vader:</strong> Vader niet bekend
            </div>
            <div className={descriptionBlackClassName}>
              <strong>Moeder:</strong> Moeder niet bekend
            </div>
            {card.reden_overlijden && (
              <div className={descriptionBlackClassName}>
                <strong>Reden overlijden:</strong> {card.reden_overlijden}
              </div>
            )}
            {card.pupil_vanaf && (
              <div className={descriptionBlackClassName}>
                <strong>Pupil van:</strong> {card.pupil_vanaf}
              </div>
            )}
            {card.pupil_tot && (
              <div className={descriptionBlackClassName}>
                <strong>Pupil tot:</strong> {card.pupil_tot}
              </div>
            )}
            {card.bijzonderheden && (
              <div className={descriptionBlackClassName}>
                <strong>Bijzonderheden:</strong> {card.bijzonderheden}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
