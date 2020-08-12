import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'

import MovieRoutes from '../MovieRoutes'
import SeriesRoutes from '../SeriesRoutes'

import icoMoonConfig from '../../assets/Icons/selection.json'

const Home = () => {
    const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', require('../../assets/Icons/fonts/icomoon.ttf'))
    
    const Tab = createBottomTabNavigator()
    const Stack = createStackNavigator()

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

                    if(route.name === 'MovieRoutes') {
                        iconName = focused
                            ? 'film' : 'film-outline'
                    } 
                    else if (route.name === 'SeriesRoutes') {
                        iconName = focused
                            ? 'star' : 'star-outline'
                    }

                    return <Icon name={iconName} size={size} color={color} />
                }
            })}
        >
            
            <Tab.Screen name="MovieRoutes" component={MovieRoutes} />
            <Tab.Screen name='SeriesRoutes' component={SeriesRoutes} />
        </Tab.Navigator>
    )
}

export default Home