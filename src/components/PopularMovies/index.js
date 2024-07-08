// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import PopularMovieCard from '../PopularMovieCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PopularMovies extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    moviesList: [],
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiKey = '65673d5da22a840844f441c0be7795f9'
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
      )
      if (response.ok) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.results.map(eachMovie => ({
          id: eachMovie.id,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
          voteAverage: eachMovie.vote_average,
        }))
        this.setState({
          apiStatus: apiStatusConstants.success,
          moviesList: updatedData,
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
    const {moviesList} = this.state
    return (
      <div>
        <ul className="movies-list">
          {moviesList.map(movie => (
            <PopularMovieCard key={movie.id} movieDetails={movie} />
          ))}
        </ul>
      </div>
    )
  }

  renderAllMovies = () => {
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
        <div className="popular-movie-container">
          <h1>Popular Movies</h1>
          {this.renderAllMovies()}
        </div>
      </>
    )
  }
}

export default PopularMovies
