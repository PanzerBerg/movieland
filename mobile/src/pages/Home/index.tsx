import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Movies from '../Movies'
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
            <Tab.Screen name="Movies" component={Movies} />
        </Tab.Navigator>
    )
}

export default Home