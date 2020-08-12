import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import TopMovies from '../MoviesPages/TopMovies'
import PopularMovies from '../MoviesPages/PopularMovies'
import NowPlayingMovies from '../MoviesPages/NowPlayingMovies'
import UpcomingMovies from '../MoviesPages/UpcomingMovies'

const MovieRoutes = () => {
    const Stack = createStackNavigator()

    return(
        <Stack.Navigator
            headerMode={'none'}
        >
            <Stack.Screen name='PopularMovies' component={PopularMovies} />
            <Stack.Screen name='TopMovies' component={TopMovies} />
            <Stack.Screen name='NowPlayingMovies' component={NowPlayingMovies} />
            <Stack.Screen name='UpcomingMovies' component={UpcomingMovies} />
        </Stack.Navigator>
    )
}

export default MovieRoutes;