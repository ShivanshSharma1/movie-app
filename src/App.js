import { useEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import MoviesCategories from "./MoviesCategories/MoviesCategories";
import MoviesNavbar from './MoviesNavbar/MoviesNavbar';
import TrendingMovies from './TrendingMovies/TrendingMovies';
import './style.css'

const App = () => {
  let location = useLocation();
  const [queryValue, setQueryValue] = useState('a');
  const [movieData, setMovieData] = useState();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie/?api_key=2faa457d85986b6886b84ecf6112667d&query=${queryValue ? queryValue : 'a'}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setMovieData(data)
      })
  }, [queryValue]);


  return (
    <div style={{ backgroundColor: 'rgb(38,38,38)'}}>
      <MoviesNavbar movieData={movieData} setQueryValue={setQueryValue} />
      <SwitchTransition>
          <CSSTransition
          key={location.key}
          classNames={"fade2"}
          timeout={{ enter: 500, exit: 500 }}
          >
          <Switch location={location}>
            <Route path='/categories'>
              <MoviesCategories />
            </Route>
            <Route path="/trending">
              <TrendingMovies />
            </Route>
            <Route path="/*">
              <Redirect to="/trending" />
            </Route>
          </Switch>
          </CSSTransition>
    </SwitchTransition>
    </div>
  )
}
export default App;