// import logo from './logo.svg';
// import './App.css';
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
      // portalId: props.portal,
      // tableId: props.table,
      isLoading: true,
      people: [],
      currentCategories: [],
      searchText: '',
      count: 6,
      after: '',
    };
  }

  componentDidMount() {
    this.initiate();
  }

  initiate() {
    this.fetchPosts();
  }

  // fetchPosts() {
  //   this.setState({ isLoading: true });
  //   ItemsAPI.all(this.state)
  //     .then(response => response.json())
  //     .then(data => {
  //       window.setTimeout(() => {
  //         this.setState({
  //           posts: [...this.state.posts, ...data],
  //           totalAmountPosts: data.total,
  //           isLoading: false,
  //           after: data.paging ? data.paging.next.after : '',
  //         });
  //       }, 250);
  //     })
  //     .catch(error => {
  //       this.setState({
  //         error: true,
  //         isLoading: false,
  //       });
  //     });
  // }

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
            // after: data.paging ? data.paging.next.after : '',
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
        after: '',
      };
    }, this.initiate);
  }

  handleShowMore(e) {
    this.initiate();
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
        after: '',
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
        after: '',
      };
    }, this.initiate);
  }

  render() {
    const count = this.state.people.length;

    return (
      <section class="c-modules-overview u-bg-color--white u-pad--top-none u-pad--bot-none u-pad-t--top-none u-pad-t--bot-none u-pad-m--top-none u-pad-m--bot-none">
        <div class="o-container">
          <div class="u-squeeze u-squeeze--">
            <div class="c-modules-overview__container">
              <div className="c-modules-overview__app-container">
              <Filter
                // labels={this.props.labels}
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
                          // labels={this.props.labels}
                          handleChange={this.handleChange.bind(this)}
                          handleShowMore={this.handleShowMore.bind(this)}
                          // after={this.state.after}
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
