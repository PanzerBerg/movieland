import React from 'react'
import { ScrollView, Text } from 'react-native'

import { MovieData, SerieData } from '../../interfaces'

const Elenco = ({ movieParams, serieParams }: { movieParams?:MovieData, serieParams?:SerieData }) => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <Text>Elenco</Text>
        </ScrollView>
    )
}

export default Elenco