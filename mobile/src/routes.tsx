import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Overview from './pages/Overview';
import Seasons from './pages/Seasons';
import Episodes from './pages/Episodes';

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
                <Stack.Screen name='Seasons' component={Seasons} />
                <Stack.Screen name='Episodes' component={Episodes} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;