import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import MoviesPage from '../Movies'
import Overview from '../Overview'

const Home = () => {
    
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeBackgroundColor: '#000000',
                keyboardHidesTabBar: true,
                inactiveTintColor: '#fff',
                style: {
                    borderTopWidth: 0
                }
            }}
        >
            <Tab.Screen name="MoviesPage" component={MoviesPage} />
        </Tab.Navigator>
    )
}

export default Home