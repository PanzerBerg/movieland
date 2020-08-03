import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { MovieData, SerieData } from '../interfaces'

import Sobre from './Sobre'
import Elenco from './Elenco'
import Analises from './Analises'
import Premios from './Premios'

const Tabs = ({ movieParams, serieParams, isTooWhite }: { movieParams?:MovieData, serieParams?:SerieData, isTooWhite:boolean }) => {
    const Tab = createMaterialTopTabNavigator()
    let textColor = '#ffffff'
    if(isTooWhite) textColor = '#000000'

    console.log(isTooWhite)

    return (
        <Tab.Navigator
            initialRouteName='Sobre'
            tabBarOptions={{
                labelStyle: {
                    fontFamily: 'Ubuntu_700Bold',
                    fontSize: 12,
                    color: textColor
                },
                style: {
                    backgroundColor: 'transparent'
                },
                indicatorStyle: {
                    height: 2,
                    backgroundColor: '#000000'
                }
            }}
            backBehavior="none"
            sceneContainerStyle={{
                backgroundColor: 'transparent'
            }}
        >
            <Tab.Screen name='Sobre' children={() => <Sobre  />} />
            <Tab.Screen name='Elenco' children={() => <Elenco />} />
            <Tab.Screen name='Analises' children={() => <Analises />} />
            <Tab.Screen name='Premios' children={() => <Premios />} />
        </Tab.Navigator>
    )
}

export default Tabs