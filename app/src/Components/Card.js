import { useState } from 'react';
import ChevronDown from '../icons/chevron-down.svg';
import ChevronUp from '../icons/chevron-up.svg';
import Cross from '../icons/cross.svg';
import Question from '../icons/question.svg';

function stringToDate(string) {
  const parts = string.split('/'); // Split the string by '/'
  const day = parseInt(parts[0], 10); // Extract the day part and convert to integer
  const month = parseInt(parts[1], 10); // Extract the month part and convert to integer
  const year = parseInt(parts[2], 10); // Extract the year part and convert to integer

  // Create a new Date object using the extracted day, month, and year
  const date = new Date(year, month - 1, day);

  // Extract the day, month, and year from the Date object and format them as strings
  const formattedDate =
    ('0' + date.getDate()).slice(-2) + '/' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
    date.getFullYear();

  return formattedDate;
}

const Post = ({ card }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  let geboorteDatum = card.geboortedatum ? stringToDate(card.geboortedatum) : 'Onbekend';
  let sterfDatum = card.datum_overlijden ? stringToDate(card.datum_overlijden) : 'Onbekend';

  let leeftijd = card.leeftijd_tijdens_overlijden;

  if ((leeftijd.includes("mnd") || leeftijd.includes("maand")) && leeftijd !== '1') {
    leeftijd = leeftijd.replace("maand", "maanden").replace("mnd", "maanden");
  } else {
    leeftijd += " jaar";
  }
  
  const descriptionClassName = 'c-graveyard-item__description';
  const descriptionBlackClassName = `${descriptionClassName}--black`;
  const descriptionBiggerClassName = `${descriptionClassName}--bigger`;

  return (
    <div className="c-graveyard-overview__post c-graveyard-item">
        <div className="c-graveyard-item__content-container">

          {!card.grave_id.toLowerCase().includes('onbekend') ? (
            <h2 className="c-graveyard-item__title--big c-graveyard-item__title--round">
              {card.grave_id}
            </h2>
          ) : (
            <div className="c-graveyard-item__title--big c-graveyard-item__title--round">
              <svg className="c-icon c-graveyard-item__icon--question">
                <use href={`${Question}#question`} />
              </svg>
            </div>
          )}
          <h2 className="c-graveyard-item__title">
            {card.voornamen} {card.achternaam}
          </h2>
          {card.roepnaam && card.roepnaam !== card.voornamen && (
            <h2 className={descriptionClassName}>
              ({card.roepnaam})
            </h2>
          )}
          <div className={descriptionBiggerClassName}>
            {geboorteDatum} - {sterfDatum}
            <svg className="c-icon c-graveyard-item__icon--cross">
              <use href={`${Cross}#cross`} />
            </svg>
          </div>
          {card.leeftijd_tijdens_overlijden !== null && card.leeftijd_tijdens_overlijden !== undefined && (
            <div className="c-graveyard-item__description c-graveyard-item__description--negative-margin">
              ({leeftijd})
            </div>
          )}
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
