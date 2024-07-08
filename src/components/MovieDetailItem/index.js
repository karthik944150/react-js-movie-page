import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Cast from '../Cast'
import './index.css' // Assuming you have some CSS for styling

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetailItem extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movieDetails: {},
    cast: [],
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiKey = '65673d5da22a840844f441c0be7795f9'
    try {
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
      )
      const castResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`,
      )

      if (movieResponse.ok && castResponse.ok) {
        const movieData = await movieResponse.json()
        const castData = await castResponse.json()
        console.log(movieData)
        console.log(castData)
        const updatedMovieData = {
          id: movieData.id,
          title: movieData.title,
          voteAverage: movieData.vote_average,
          runTime: movieData.runtime,
          tagLine: movieData.tagline,
          releaseDate: movieData.release_date,
          overview: movieData.overview,
          posterPath: movieData.poster_path,
          backdropPath: movieData.backdrop_path,
        }

        const updatedCastData = castData.cast.map(actor => ({
          id: actor.cast_id,
          name: actor.name,
          character: actor.character,
          profilePath: actor.profile_path,
        }))

        this.setState({
          apiStatus: apiStatusConstants.success,
          movieDetails: updatedMovieData,
          cast: updatedCastData,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    } catch (error) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="movies-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-img"
      />
      <p>Something went wrong. Please try again.</p>
    </div>
  )

  renderLoadingView = () => (
    <div className="movies-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {movieDetails, cast} = this.state
    const {
      posterPath,
      title,
      voteAverage,
      runTime,
      tagLine,
      releaseDate,
      overview,
      backdropPath,
    } = movieDetails
    return (
      <div className="movie-success-view-details-container">
        <div className="movie-details-container">
          <div className="movie-details-overview-container">
            <div className="movie-details">
              <img
                src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                alt={title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h1 className="movie-title">Venom:{title}</h1>
                <p className="movie-rating">Rating: {voteAverage}</p>
                <p className="movie-overview">
                  {runTime} min {tagLine}
                </p>
                <p className="movie-relase-date">Release Date: {releaseDate}</p>
              </div>
            </div>
            <div className="overview-container">
              <h1 className="overview-header">Overview</h1>
              <p className="movie-overview">{overview}</p>
            </div>
          </div>

          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${backdropPath}`}
              alt={title}
              className="movie-backdrop-path"
            />
          </div>
        </div>
        <h1 className="cast-title">Cast</h1>
        <ul className="cast-list">
          {cast.map(actor => (
            <Cast key={actor.id} actorDetails={actor} />
          ))}
        </ul>
      </div>
    )
  }

  renderAllMovieDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="movie-detail-container">
          <h1>Movie Details</h1>
          {this.renderAllMovieDetails()}
        </div>
      </>
    )
  }
}

export default MovieDetailItem
