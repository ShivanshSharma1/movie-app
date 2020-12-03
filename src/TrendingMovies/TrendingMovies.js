import { Container, Grid, Paper } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import '../style.css'

const MovieImg = styled.img`
  width: 50vh;
  height: 70vh;
  @media (max-width: 768px ) {
    width: 30vh;
    height: 50vh;
  }
`

const TrendingMovies = () => {
    const [moviesData, setMoviesData] = useState();
    const scrollRef = useRef();

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=2faa457d85986b6886b84ecf6112667d')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setMoviesData(data)
            })
    }, []);

    return (
        <div style={{
            backgroundColor: 'rgb(38,38,38)'
        }} onScroll={() => scrollRef.current.style.visibility='visible'}>
            <Container>
                <Grid container justify='center' spacing={3} style={{ backgroundColor: 'rgb(38,38,38)', marginTop: '10px' }}>
                    {moviesData ? moviesData.results.map((a) => {
                        return (
                            <Grid item>
                                <Paper elevation={12}  >
                                    <MovieImg src={`https://image.tmdb.org/t/p/w500${a.poster_path}`} />
                                </Paper>
                            </Grid>
                        )
                    }) : <div />}
                </Grid>
            </Container>
        </div>
    )
}

export default TrendingMovies;