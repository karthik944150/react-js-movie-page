import {Link} from 'react-router-dom'

import './index.css'

const Header = props => {
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="website-logo-section">
          <h1 className="nav-logo-header">MovieDb</h1>
        </div>
        <div className="nav-bar-large-container">
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                PopularMovies
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/toprated" className="nav-link">
                Top Rated
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/upcoming" className="nav-link">
                Upcoming
              </Link>
            </li>
          </ul>
        </div> 
        
      </div>
    </nav>
  )
}

export default Header
