import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Overview from './pages/Overview';

const Stack = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                headerMode='none'
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#191919'
                    }
                }}
            >
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name="Overview" component={Overview} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;