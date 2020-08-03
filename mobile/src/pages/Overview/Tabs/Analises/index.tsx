import React from 'react'
import  { ScrollView, Text } from 'react-native'

import { MovieData, SerieData } from '../../interfaces'

const Analises = ({ movieParams, serieParams }: { movieParams?:MovieData, serieParams?:SerieData }) => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <Text>Analises</Text>
        </ScrollView>
    )
}

export default Analises;