import React, { Component, Fragment } from 'react';
import PeopleAPI from './api/PeopleAPI';
import Loader from './Components/Loader';
import Cards from './Components/Cards';
import Header from './Components/Header';
import Filter from './Containers/Filter';
import './scss/main.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      people: [],
      currentCategories: [],
      currentSort: '',
      searchText: '',
      count: 6,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    this.initiate();
  }

  initiate() {
    this.fetchPosts();
  }

  fetchPosts() {
    const { searchText, count, currentCategories, currentSort } = this.state;

    this.setState({ isLoading: true });
    PeopleAPI.all({
      searchText,
      count,
      categories: currentCategories,
    })
      .then(data => {
        let sortedPeople = this.sortData(currentSort, data);

        window.setTimeout(() => {
          this.setState({
            people: sortedPeople,
            totalAmountPeople: sortedPeople.length,
            isLoading: false,
          });
        }, 250);
      })
      .catch(error => {
        this.setState({
          error: true,
          isLoading: false,
        }); 
      });
  }

  sortData(currentSort, data) {
    let sortedData = [...data];
    currentSort = this.state.currentSort[this.state.currentSort.length - 1];

    if (currentSort === 'Grafnummer') {
      console.log(`Sorting by Grafnummer`);
      sortedData.sort((a, b) => a.grave_id.localeCompare(b.grave_id));
    } else if (currentSort === 'Naam oplopend' || currentSort === 'Naam aflopend') {
      sortedData.sort((a, b) => {
        const achternaamA = a.achternaam.replace(/[()]/g, '');
        const achternaamB = b.achternaam.replace(/[()]/g, '');

        if (currentSort === 'Naam oplopend') {
          return achternaamA.localeCompare(achternaamB);
        } else {
          return achternaamB.localeCompare(achternaamA);
        }
      });
    } else if (currentSort === 'Datum overlijden aflopend') {
      console.log('Sorting by Datum overlijden aflopend');
      sortedData.sort((a, b) => new Date(b.datum_overlijden) - new Date(a.datum_overlijden));
    } else if (currentSort === 'Datum overlijden oplopend') {
      console.log('Sorting by Datum overlijden oplopend');
      sortedData.sort((a, b) => new Date(a.datum_overlijden) - new Date(b.datum_overlijden));
    }

    return sortedData;
  }

  handleChange(e) {
    const currentTargetName = e.currentTarget.name;
    const target = e.currentTarget.dataset.target;
    const currentElements = [...this.state[target]];

    if (currentElements.includes(currentTargetName)) {
      currentElements.splice(currentElements.indexOf(currentTargetName), 1);
    } else {
      currentElements.push(currentTargetName);

      if (currentElements.length > 1 && target === 'currentSort') {
        const firstCheckboxName = currentElements[0];
        const firstCheckboxIndex = currentElements.indexOf(firstCheckboxName);
        currentElements.splice(firstCheckboxIndex, 1);
      }
    }

    this.setState(
      {
        [target]: currentElements,
        people: [],
      },
      () => {
        this.initiate();
      }
    );
  }

  handleShowMore(count) {
    this.setState({ count });
  }

  handleSearch(searchText) {
    this.setState(
      {
        searchText,
        people: [],
      },
      this.initiate
    );
  }

  handleSearchSubmit() {
    this.setState(this.initiate);
  }

  handleReset(e) {
    this.setState(
      {
        currentCategories: [],
        searchText: '',
        people: [],
      },
      this.initiate
    );
  }

  render() {
    const { currentCategories, currentSort, searchText, people, totalAmountPeople, isLoading, count } = this.state;

    return (
      <section className="c-graveyard-overview u-bg-color--white u-pad--top-none u-pad--bot-none u-pad-t--top-none u-pad-t--bot-none u-pad-m--top-none u-pad-m--bot-none">
        <Header />
          <div className="u-squeeze u-squeeze--xl">
            <div className="c-graveyard-overview__container">
              <div className="c-graveyard-overview__app-container">
                <Filter
                  currentCategories={currentCategories}
                  currentSort={currentSort}
                  handleChange={this.handleChange}
                  searchText={searchText}
                  onSearch={this.handleSearch}
                  onSubmit={this.handleSearchSubmit}
                />
                <div className="c-graveyard-overview__posts-wrapper">
                  {people.length > 0 ? (
                    <Fragment>
                      <div className="c-graveyard-overview__posts-container">
                        <Cards
                          people={people}
                          nrAll={totalAmountPeople}
                          loading={isLoading}
                          handleChange={this.handleChange}
                          handleShowMore={this.handleShowMore}
                          count={count}
                        />
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <div className="c-graveyard-overview__no-posts">
                          {'Geen resultaten gevonden'}
                          <br />
                          <div className="c-graveyard-overview__reset" onClick={this.handleReset}>
                            Filters resetten
                          </div>
                        </div>
                      )}
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }

export default App;
