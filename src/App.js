import {Switch, Route} from 'react-router-dom'

import PopularMovies from './components/PopularMovies'
import About from './components/About'
import TopRated from './components/TopRated'
import UpComingMovies from './components/UpComingMovies'
import MovieDetailItem from './components/MovieDetailItem'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={PopularMovies} />
    <Route exact path="/about" component={About} />
    <Route exact path="/toprated" component={TopRated} />
    <Route exact path="/upcoming" component={UpComingMovies} />
    <Route exact path="/movies/:id" component={MovieDetailItem} />
    <Route component={NotFound} />
  </Switch>
)

export default App
