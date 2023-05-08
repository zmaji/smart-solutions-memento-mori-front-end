import React, { Component } from 'react';
import ItemsAPI from '../api/ItemsAPI';
import TableAPI from '../api/TableAPI';
import onClickOutside from 'react-onclickoutside';
import Dropdown from './Dropdown';
import SearchFilter from '../Components/SearchFilter';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      error: false,
      isLoading: false,
      activeFilter: '',
    };
  }

  componentDidMount() {
    console.log(`Mount Filter Component`);
    this.fetchFilters();
  }

  handleClick(e) {
    const current = this.state.activeFilter;
    console.log(e.currentTarget.dataset.target);
    console.log(this.state.activeFilter);
    this.setState({
      activeFilter: e.currentTarget.dataset.target === current ? '' : e.currentTarget.dataset.target,
    });
  }

  handleClickOutside(e) {
    console.log('Clicking outside');
    console.log(e.currentTarget);
    this.setState({ activeFilter: '' });
  }

  fetchFilters() {
    console.log(`Enter fetchFilter function`);
    this.setState({ isLoading: true });
    TableAPI.all()
      .then(data => {
        const categories = data.map(person => person.rol);
        window.setTimeout(() => {
          this.setState({
            categories: categories,
            isLoading: false,
          });
        }, 250);
        console.log('Data:', data);
        console.log('Current Categories:', this.state.categories);
      })
      .catch(error => {
        this.setState({
          error: true,
          isLoading: false,
        });
      });
  }

  render() {
    console.log(`CATEGORIES`);
    console.log(this.state.categories);
    return (
      <div className={`c-modules-filter`}>
        <div className="c-modules-filter__wrapper">
          <Dropdown
            handleClick={this.handleClick.bind(this)}
            handleChange={this.props.handleChange}
            target="currentCategories"
            items={this.state.categories}
            currentElements={this.props.currentCategories}
            active={this.state.activeFilter === 'currentCategories'}
            type="categories"
            title="Categories"
            isLoading={this.props.isLoading}
          />
        </div>
        <SearchFilter
          searchText={this.props.searchText}
          // labels={this.props.labels}
          onSearch={this.props.onSearch}
          onSubmit={this.props.onSubmit}
          placeholder={this.props.placeholder}
          searchActive={this.props.searchActive}
          isLoading={this.props.isLoading}
          onClick={this.handleClickOutside.bind(this)}
        />
      </div>
    );
  }
}

export default onClickOutside(Filter);
