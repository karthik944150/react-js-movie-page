import {Link} from 'react-router-dom'
import './index.css'

const TopRatedCard = props => {
  const {movieDetails} = props
  const {title, id, posterPath, voteAverage} = movieDetails
  const roundedVoteAverage = voteAverage.toFixed(1)
  return (
    <li className="product-item">
      <Link to={`/movies/${id}`} className="link-item">
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className="thumbnail"
        />
        <div className="movie-details">
          <h1 className="title">{title}</h1>
          <p className="rating">Rating: {roundedVoteAverage}</p>
        </div>
      </Link>
    </li>
  )
}

export default TopRatedCard
