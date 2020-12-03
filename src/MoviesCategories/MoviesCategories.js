import { Container, FormControl, Grid, MenuItem, Paper, Select } from "@material-ui/core";
import { useState, useEffect } from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styled from "styled-components";
import '../style.css'

const MovieImg = styled.img`
  width:50vh;
  height: 70vh;
  @media (max-width: 768px ) {
    width: 30vh;
    height: 50vh;
  }
`

const MoviesCategories = () => {
    const [categoryMoviesData, setCategoryMoviesData] = useState();
    const [categoryValue, setCategoryValue] = useState('28');

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2faa457d85986b6886b84ecf6112667d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${categoryValue}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setCategoryMoviesData(data)
            })
        // setInProp(false)
    }, [categoryValue]);
    const handleChange = (event) => {
        setCategoryValue(event.target.value);
    };
    return (
        <div>
            <Container>
                <Grid container justify='center' style={{ marginTop: '20px' }}>
                    <FormControl>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryValue}
                            onChange={handleChange}
                            className='select'
                            style={{ fontSize: '24px', color: 'white' }}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value={28} somevalue='Action'>Action</MenuItem>
                            <MenuItem value={12}>Adventure</MenuItem>
                            <MenuItem value={16}>Animation</MenuItem>
                            <MenuItem value={35}>Comedy</MenuItem>
                            <MenuItem value={80}>Crime</MenuItem>
                            <MenuItem value={99}>Documentary</MenuItem>
                            <MenuItem value={18}>Drama</MenuItem>
                            <MenuItem value={10751}>Family</MenuItem>
                            <MenuItem value={14}>Fantasy</MenuItem>
                            <MenuItem value={36}>History</MenuItem>
                            <MenuItem value={27}>Horror</MenuItem>
                            <MenuItem value={10402}>Music</MenuItem>
                            <MenuItem value={9648}>Mystery</MenuItem>
                            <MenuItem value={10749}>Romance</MenuItem>
                            <MenuItem value={878}>Science Fiction</MenuItem>
                            <MenuItem value={10770}>TV Movie</MenuItem>
                            <MenuItem value={53}>Thriller</MenuItem>
                            <MenuItem value={10752}>War</MenuItem>
                            <MenuItem value={37}>Western</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <SwitchTransition>
                    <CSSTransition
                        key={categoryValue}
                        addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                        classNames='fade'
                    >
                        <Grid container justify='center' spacing={3} style={{ backgroundColor: 'rgb(38,38,38)', marginTop: '5px' }}>
                            {categoryMoviesData ? categoryMoviesData.results.map((a) => {
                                return (<Grid item>
                                    <Paper elevation={12}>
                                        <MovieImg src={`https://image.tmdb.org/t/p/w500${a.poster_path}`} />
                                    </Paper>
                                </Grid>
                                )
                            }) : <div />}
                        </Grid>
                    </CSSTransition>
                </SwitchTransition>
            </Container>

        </div>
    )
}

export default MoviesCategories;