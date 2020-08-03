import React from 'react'
import { ScrollView, Text } from 'react-native'

import { MovieData, SerieData } from '../../interfaces'

const Sobre = ({ movieParams, serieParams }: { movieParams?:MovieData, serieParams?:SerieData }) => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <Text>Sobre</Text>
        </ScrollView>
    )
}

export default Sobre;