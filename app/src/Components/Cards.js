import React from 'react';
import Card from './Card';
import Loader from './Loader';

const Cards = props => {
  console.log(`PROPS:`);
  console.log(JSON.stringify(props, null, 2));
  const activeClass = props.showAll ? 'active' : '';
  return (
    <div className="c-modules-overview__posts u-flex u-flex-v-start">
      {props.people.map(person => {
        return <Card key={person.person_id} card={person}/>;
        // labels={props.labels}
      })}

      {props.loading ? <Loader /> : null}

      {props.after !== '' && !props.loading ? (
        <div className="c-modules-overview__toggle-button-container">
          <div className="c-modules-overview__progress-bar">
            {/* <div className="c-modules-overview__progress" style={`width: ${(props.people.length / props.nrAll) * 100}%`} /> */}
            <div className="c-modules-overview__progress" style={{ width: `${(props.people.length / props.nrAll) * 100}%` }} />
          </div>

          <div className="c-modules-overview__posts-count">
            {props.people.length}
          </div>

          <div className={`c-modules-overview__toggle-button u-flex ${activeClass}`} onClick={props.handleShowMore}>
            <div className="c-modules-overview__show-more">Load more</div>
            <div className="c-modules-overview__show-less">All items loaded</div>
            <svg className="c-icon c-modules-overview__icon">
              <use href="#arrow-down" xlinkHref="#arrow-down" />
            </svg>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Cards;