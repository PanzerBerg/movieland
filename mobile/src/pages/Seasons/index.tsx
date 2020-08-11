import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { View, StyleSheet, SafeAreaView, Text, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import MvTvItem from '../../components/MvTvItem';

import { serverApi } from '../../services/api';

import { SeasonsParams, SeasonsProps } from './interfaces';
import { Colors } from '../Movies/interfaces';
import { isTooWhite } from '../../utils';

import styles from './styles'

const Seasons = () => {
    const [posterList, setPosterList] = useState<string[]>()
    const [posterColors, setPosterColors] = useState<Colors[]>()
    const [isBusy, setIsBusy] = useState(true);

    const route = useRoute()
    const params = route.params as SeasonsParams

    useEffect(() => {
        if (params != undefined) {
            let posters = new Array()
            params.seasons.map(season => {
                posters.push(season.poster_path);
            })
            setPosterList(posters)
        }
    }, [params])

    useEffect(() => {
        if (posterList != undefined && posterList.length != 0) {
            serverApi.post('colors', { body: posterList }).then(response => {
                setPosterColors(response.data)
                setIsBusy(false)
            })
        }
    }, [posterList])

    function renderItem({ item, index }: { item: SeasonsProps, index: number }) {
        if (posterColors == undefined) return

        let color = ''
        let fontColor = '#fff'
        if (posterColors != undefined) {
            let posters = posterColors[index]
            if (posters == undefined) return
            color = posterColors[index].palette[1]
            if (isTooWhite(color)) fontColor = '#000000'
        }

        return (
            <MvTvItem
                id={params.params.itemParam.id}
                type='season'
                title={item.name}
                release_date={item.air_date}
                poster_path={item.poster_path}
                color={color}
                fontColor={fontColor}
                colors={posterColors[index]}
                episodes={item.episode_count}
                seasonNumber={item.season_number}
            />
        )
    }

    return (
        <SafeAreaView style={styles.main}>
            <Text style={styles.header}>Temporadas de: {'\n'}{params.name}</Text>

            {isBusy ? (
                <View style={{ marginTop: '90%' }}>
                    <ActivityIndicator size={'large'} />
                </View>
            ) : (
                    <FlatList
                        style={{ marginTop: 20, width: Dimensions.get('screen').width }}
                        data={params.seasons}
                        //@ts-ignore
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
        </SafeAreaView>
    )
}

export default Seasons;