import React, { Component } from 'react';

import LoaderHOC from '../HOCs/LoaderHOC';
import './MovieCard.css';

const Stars = (n, max = 5) => {
	return "\u2605".repeat(n) + "\u2606".repeat(max - n);
}

class MovieCard extends Component {
  render() {
    const {
      poster_src_vertical="",
			poster_src_horizontal="",
      title="",
      description="",
      release_date="",
      running_time="",
      rating="",
    } = this.props.movie_meta_data


		const img_src = window.innerWidth>725?poster_src_vertical:poster_src_horizontal

    const style = {
      backgroundImage: `url(${img_src})`,
    }

    return (
      <div className="movie-card">
        <div className='poster' style={style}></div>
        <div className="content">
          <h1 className='title'>{title}</h1>
          <h3 className='desc'>{description}</h3>
          <div className='date-length'>
            <div className="date-released">
              <h3>Original Release</h3>
              <span>{release_date}</span>
            </div>
            <div className="length">
              <h3>Running Time</h3>
              <span>{running_time} min</span>
            </div>
          </div>
          <div className="rating">
            <h3>Rating</h3>
            <span>{Stars(parseInt(rating),10)}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default LoaderHOC(MovieCard);
