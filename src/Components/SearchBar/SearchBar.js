import React, { Component } from 'react';

import './SearchBar.css';


class SearchBar extends Component{
  render(){

    const suggestionList = this.props.suggestions.map(suggestion =>
      { const key = suggestion.id
        const title = suggestion.title
        const Date = suggestion.releaseDate
        return(
          <li
          key={key}
          onClick={() =>
            {
              this.props.click_a_suggestion(key)
            }
          }
          >
            {title}  ({Date})
          </li>
        )
      })

    return (
      <form onSubmit={
        e => {
        e.preventDefault()
        this.props.handleSubmit(this.input.value)
        this.input.value = ""
      }}
      >
        <div className='logo'>
         <img src="https://image.flaticon.com/icons/svg/230/230399.svg" alt=""/>
        </div>
        <div className="search-bar">
          <input
            type='text' placeholder='name of the movie...'
            ref={node => this.input=node}
          />
          <ul>
            { !this.props.suggestionClicked && suggestionList}
          </ul>
        </div>
      </form>
    )
  }
}

export default SearchBar;
