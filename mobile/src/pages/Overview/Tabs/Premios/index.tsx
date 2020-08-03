import React from 'react' 
import { ScrollView, Text } from 'react-native'

import { MovieData, SerieData } from '../../interfaces'

const Premios = ({ movieParams, serieParams }: { movieParams?:MovieData, serieParams?:SerieData }) => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <Text>Premios</Text>
        </ScrollView>
    )
}

export default Premios