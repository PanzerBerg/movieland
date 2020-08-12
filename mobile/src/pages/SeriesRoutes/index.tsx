import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import TopSeries from '../SeriesPages/TopSeries'
import PopularSeries from '../SeriesPages/PopularSeries'
import OnAirSeries from '../SeriesPages/OnAirSeries'
import AirTodaySeries from '../SeriesPages/AirTodaySeries'

const SeriesRoutes = () => {
    const Stack = createStackNavigator()

    return(
        <Stack.Navigator
            headerMode={'none'}
        >
            <Stack.Screen name='PopularSeries' component={PopularSeries} />
            <Stack.Screen name='TopSeries' component={TopSeries} />
            <Stack.Screen name='OnAirSeries' component={OnAirSeries} />
            <Stack.Screen name='AirTodaySeries' component={AirTodaySeries} />
        </Stack.Navigator>
    )
}

export default SeriesRoutes;