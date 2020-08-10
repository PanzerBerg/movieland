import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { MovieData, SerieData, Params } from '../interfaces'

import Sobre from './Sobre'
import Elenco from './Elenco'
import Analises from './Analises'
import Premios from './Premios'

const Tabs = ({ movieParams, serieParams, isTooWhite, params }: { movieParams?:MovieData, serieParams?:SerieData, isTooWhite:boolean, params:Params  }) => {
    const Tab = createMaterialTopTabNavigator()
    let textColor = '#ffffff'
    if(isTooWhite) textColor = '#000000'

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
                    backgroundColor: 'transparent',
                    maxHeight: 50
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
            <Tab.Screen name='Sobre' children={() => <Sobre movieParams={movieParams} serieParams={serieParams} params={params} isTooWhite={isTooWhite} />} />
            <Tab.Screen name='Elenco' children={() => <Elenco params={params} isTooWhite={isTooWhite} />} />
            {/* <Tab.Screen name='Analises' children={() => <Analises />} />
            <Tab.Screen name='Premios' children={() => <Premios />} /> */}
        </Tab.Navigator>
    )
}

export default Tabs