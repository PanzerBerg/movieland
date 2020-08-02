import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'

import MoviesPage from '../Movies'
import Overview from '../Overview'
import SeriesPage from '../Series'

import icoMoonConfig from '../../assets/Icons/selection.json'

const Home = () => {
    const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', require('../../assets/Icons/fonts/icomoon.ttf'))
    
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: {
                    marginBottom: 3
                },
                activeBackgroundColor: '#000000',
                inactiveBackgroundColor: '#000000',
                keyboardHidesTabBar: true,
                inactiveTintColor: '#fff',
                style: {
                    borderTopWidth: 0,
                    height: 53
                }
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = ''
                    size = focused ? 35 : 27

                    if(route.name === 'MoviesPage') {
                        iconName = focused
                            ? 'film' : 'film-outline'
                    } 
                    else if (route.name === 'SeriesPage') {
                        iconName = focused
                            ? 'star' : 'star-outline'
                    }

                    return <Icon name={iconName} size={size} color={color} />
                }
            })}
        >
            <Tab.Screen name="MoviesPage" component={MoviesPage} />
            <Tab.Screen name='SeriesPage' component={SeriesPage} />
        </Tab.Navigator>
    )
}

export default Home