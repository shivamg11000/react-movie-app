import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import MovieCard from './MovieCard/MovieCard';

import $ from 'jquery';

import './MovieApp.css';

class MovieApp extends Component{
  constructor(props){
    super(props)
    this.state = {
      input : "",
      suggestions: [],
      suggestionClicked : false,   //initially suggestion is not clicked
      movie_meta_data: {}          //change,rmove this if want to modify the MovieCard
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetch_data_by_search = this.fetch_data_by_search.bind(this)
    this.click_a_suggestion = this.click_a_suggestion.bind(this)
    this.fetch_data_by_id = this.fetch_data_by_id.bind(this)
  }
  handleSubmit(newInput){
    this.setState({
      input : newInput,
      suggestionClicked: false        //on submit show suggestions
    })
    if(newInput!=='')
      this.fetch_data_by_search(newInput)
  }
  click_a_suggestion(id_selected){
    this.setState({ suggestionClicked: true })   //on click a suggestion, hide the suggestions
    const suggestion = this.state.suggestions.find(suggestion => suggestion.id===id_selected)
    this.fetch_data_by_id(suggestion.id)
  }
  fetch_data_by_search(query){  //argument a string
    $.ajax({
      type: "GET",
      url : `https://api.themoviedb.org/3/search/movie?api_key=b4d02a74684c91c057e088c7781859e8&query=${query}`,
      dataType: "json"
    })
      .done((response) => {
        let results = response.results        //sort( popularity ) later and remvoe obj without dates
        results = results.filter(result => !!result.release_date)
        const suggestions = results.map(obj => {
          return {
            id: obj.id,
            title: obj.title,
            releaseDate: /(\d{4})-\d{2}-\d{2}/.exec(obj.release_date)[1]
          }
        })
        this.setState({suggestions : suggestions})
        return "lool"
      })

  }

  fetch_data_by_id(id){  //argument a object
    $.ajax({
      type: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}?api_key=b4d02a74684c91c057e088c7781859e8`,
      dataType: "json"
    })
      .done(response => {
        this.setState({
          movie_meta_data: {
            poster_src_vertical : `https://image.tmdb.org/t/p/w500${response.poster_path}`,
            poster_src_horizontal : `https://image.tmdb.org/t/p/w500${response.backdrop_path}`,
            title: response.title,
            tagline: response.tagline,
            description: response.overview,
            release_date: response.release_date,
            running_time: response.runtime,
            rating: response.vote_average,
            genres: response.genres.map(obj => obj.name)
          }
        })
      })
      .fail(() => console.log("error in ajax"))

  }

  componentDidMount(){
    this.fetch_data_by_id(155) // intially show The dark Knight (2008)
  }

  render(){
    return(
      <div>
        <SearchBar
          handleSubmit={this.handleSubmit}
          suggestions={this.state.suggestions}
          click_a_suggestion={this.click_a_suggestion}
          suggestionClicked={this.state.suggestionClicked}
          />
        <MovieCard movie_meta_data={this.state.movie_meta_data}/>
      </div>
    )
  }
}

export default MovieApp;
