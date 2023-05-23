import React, { Component, Fragment } from 'react';
import PeopleAPI from './api/PeopleAPI'
import Loader from './Components/Loader';
import Cards from './Components/Cards';
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
  }

  componentDidMount() {
    this.initiate();
  }

  initiate() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.setState({ isLoading: true });
    PeopleAPI.all({
      searchText: this.state.searchText,
      count: this.state.count,
      categories: this.state.currentCategories,
    })
    .then(data => {
      let sortedData = data;
      let currentSort = this.state.currentSort[this.state.currentSort.length -1];

      // Sort the data based on the currentSort value
      if (currentSort == 'Grafnummer') {
        console.log(`Sorting by Grafnummer`);
        sortedData.sort((a, b) => a.grave_id.localeCompare(b.grave_id));
      } else if (currentSort == "Naam oplopend" || currentSort == "Naam aflopend") {
        sortedData.sort((a, b) => {
          const achternaamA = a.achternaam.replace(/[()]/g, '');
          const achternaamB = b.achternaam.replace(/[()]/g, '');
        
          if (currentSort == "Naam oplopend") {
            return achternaamA.localeCompare(achternaamB);
          } else {
            return achternaamB.localeCompare(achternaamA);
          }
        });
      } else if (currentSort == "Datum overlijden") {
        console.log(`Sorting by Datum overlijden`);
        sortedData.sort((a, b) => a.datum_overlijden.localeCompare(b.datum_overlijden));
      }
      
      window.setTimeout(() => {
        this.setState({
          people: sortedData, // Set the sorted data in the state
          totalAmountPeople: sortedData.length,
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
  

  handleChange(e) {
    const currentTargetName = e.currentTarget.name;
    const target = e.currentTarget.dataset.target;
    const currentElements = [...this.state[target]];
  
    if (currentElements.includes(currentTargetName)) {
      currentElements.splice(currentElements.indexOf(currentTargetName), 1);
    } else {
      currentElements.push(currentTargetName);
  
      // Uncheck the first checkbox if it is already checked
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

  handleShowMore(e) {
    this.setState(prevState => ({ count: prevState.count + 6 }));
  }

  handleSearch(searchText) {
    this.setState({
      searchText: searchText,
      people: [],
    }, this.initiate);
  }

  handleSearchSubmit() {
    this.setState(
      this.initiate,
    );
  }

  handleReset(e) {
    this.setState(() => {
      return {
        currentCategories: [],
        searchText: '',
        people: [],
      };
    }, this.initiate);
  }

  render() {
    return (  
      <section className="c-graveyard-overview u-bg-color--white u-pad--top-none u-pad--bot-none u-pad-t--top-none u-pad-t--bot-none u-pad-m--top-none u-pad-m--bot-none">
        <div className="o-container">
          <div className="u-squeeze u-squeeze--xl">
            <div className="c-graveyard-overview__container">
              <div className="c-graveyard-overview__app-container">
              <Filter
                currentCategories={this.state.currentCategories}
                currentSort={this.state.currentSort}
                handleChange={this.handleChange.bind(this)}
                searchText={this.state.searchText}
                onSearch={this.handleSearch.bind(this)}
                onSubmit={this.handleSearchSubmit.bind(this)}
              />
                <div className="c-graveyard-overview__posts-wrapper">
                  {this.state.people.length > 0 ? (
                    <Fragment>
                      <div className="c-graveyard-overview__posts-container">
                        <Cards
                          people={this.state.people}
                          nrAll={this.state.totalAmountPeople}
                          loading={this.state.isLoading}
                          handleChange={this.handleChange.bind(this)}
                          handleShowMore={this.handleShowMore.bind(this)}
                          count={this.state.count}
                        />
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {this.state.isLoading ? (
                        <Loader />
                      ) : (
                        <div className="c-graveyard-overview__no-posts">
                          {'Geen resultaten gevonden'}
                          <br />
                          <div className="c-graveyard-overview__reset" onClick={this.handleReset.bind(this)}>
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
        </div>
      </section>
    );
  }
}

export default App;
