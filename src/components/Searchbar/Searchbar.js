import React, { Component } from 'react';
import searchIcon from '../search_icon.png';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="input-container">
            <button
              type="button"
              className="search-button"
              onClick={this.handleSubmit}
            >
              <img src={searchIcon} alt="Search" />
            </button>
            <input
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.query}
              onChange={this.handleChange}
            />
          </div>
        </form>
      </header>
    );
  }
}

export default Searchbar;
