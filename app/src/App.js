import React, { Component, Fragment } from 'react';
import ItemsAPI from './api/ItemsAPI'
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
    ItemsAPI.all(this.state)
      .then(data => {
        console.log(`FETCH DATA:`);
        console.log(data);
        window.setTimeout(() => {
          this.setState({
            people: [...this.state.people, ...data],
            totalAmountPeople: data.length,
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
    let currentElements = [...this.state[e.currentTarget.dataset.target]];

    if (currentElements.includes(e.currentTarget.name)) {
      currentElements = currentElements.filter(item => item !== e.currentTarget.name);
    } else {
      currentElements.push(e.currentTarget.name);
    }

    this.setState(() => {
      return {
        [e.currentTarget.dataset.target]: currentElements,
        posts: [],
      };
    }, this.initiate);
  }

  handleShowMore(e) {
    this.setState(prevState => ({ count: prevState.count + 6 }));
  }

  handleSearch(searchText) {
    this.setState({
      searchText: searchText,
    });
  }

  handleSearchSubmit() {
    this.setState(
      {
        posts: [],
      },
      this.initiate,
    );
  }

  handleReset(e) {
    this.setState(() => {
      return {
        currentCategories: [],
        // currentLocations: [],
        // currentYears: [],
        searchText: '',
        posts: [],
      };
    }, this.initiate);
  }

  render() {
    const count = 6;

    return (
      <section className="c-modules-overview u-bg-color--white u-pad--top-none u-pad--bot-none u-pad-t--top-none u-pad-t--bot-none u-pad-m--top-none u-pad-m--bot-none">
        <div className="o-container">
          <div className="u-squeeze u-squeeze--">
            <div className="c-modules-overview__container">
              <div className="c-modules-overview__app-container">
              <Filter
                currentCategories={this.state.currentCategories}
                handleChange={this.handleChange.bind(this)}
                searchText={this.state.searchText}
                onSearch={this.handleSearch.bind(this)}
                onSubmit={this.handleSearchSubmit.bind(this)}
              />
                <div className="c-modules-overview__posts-wrapper">
                  {this.state.people.length > 0 ? (
                    <Fragment>
                      <div className="c-modules-overview__posts-container">
                        <Cards
                          people={this.state.people}
                          nrAll={this.state.totalAmountPeople}
                          loading={this.state.isLoading}
                          handleChange={this.handleChange.bind(this)}
                          handleShowMore={this.handleShowMore.bind(this)}
                          count={count}
                        />
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {this.state.isLoading ? (
                        <Loader />
                      ) : (
                        <div className="c-modules-overview__no-posts">
                          {'No results'}
                          <br />
                          <div className="c-modules-overview__reset" onClick={this.handleReset.bind(this)}>
                            Reset filters
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
