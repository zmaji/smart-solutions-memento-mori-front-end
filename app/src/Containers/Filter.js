import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import TableAPI from '../api/TableAPI';
import Dropdown from './Dropdown';
import SearchFilter from '../Components/SearchFilter';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      branches: [],
      error: false,
      isLoading: false,
      activeFilter: '',
    };
  }

  componentDidMount() {
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
    this.setState({ isLoading: true });
    TableAPI.all(this.props.tableId, this.props.portalId)
      .then(response => response.json())
      .then(data => {
        this.setState({
          branches: [...this.state.branches, ...data.columns.find(x => x.name === 'category').options],
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: true,
          isLoading: false,
        });
      });
  }

  render() {
    return (
      <div className={`c-modules-filter`}>
        <div className="c-modules-filter__wrapper">
          <Dropdown
            handleClick={this.handleClick.bind(this)}
            handleChange={this.props.handleChange}
            target="currentCategories"
            items={this.state.branches}
            currentElements={this.props.currentCategories}
            active={this.state.activeFilter === 'currentCategories'}
            type="categories"
            title="Categorieën"
            isLoading={this.props.isLoading}
          />
        </div>
        <SearchFilter
          searchText={this.props.searchText}
          labels={this.props.labels}
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
