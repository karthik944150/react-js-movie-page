import './index.css'

const Cast = props => {
  const {actorDetails} = props
  const {character, profilePath, name} = actorDetails
  return (
    <>
      <li className="cast-item">
        {profilePath && (
          <img
            src={`https://image.tmdb.org/t/p/w200${profilePath}`}
            alt={name}
            className="cast-profile"
          />
        )}
        <div className="cast-info">
          <p className="actor-name">{name}</p>
          <p className="actor-character">Character: {character}</p>
        </div>
      </li>
    </>
  )
}

export default Cast
