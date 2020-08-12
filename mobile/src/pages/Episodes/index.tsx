import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, SafeAreaView, StyleSheet, FlatList, Dimensions, ActivityIndicator } from 'react-native'

import { api, Series, serverApi } from '../../services/api'
import { isTooWhite } from '../../utils'
import { EpisodesProps, SeasonParams, Colors } from './interfaces'

import EpisodeItem from '../../components/EpisodeItem'


const Episodes = () => {
    const [episodes, setEpisodes] = useState<EpisodesProps[]>()
    const [imagePaths, setImagePaths] = useState<string[]>()
    const [imageColors, setImageColors] = useState<Colors[]>()
    const [isBusy, setIsBusy] = useState(true)

    const route = useRoute()
    const params = route.params as SeasonParams
    
    useEffect(() => {
        if(params != undefined) {
            api.get(Series.getSeason('pt-BR', params.id, params.seasonNumber)).then(response => {
                setEpisodes(response.data.episodes)
    
                let images = new Array()
                response.data.episodes.map((episode: EpisodesProps) => {
                    images.push(episode.still_path)
                })
                setImagePaths(images)
            })
        }
    }, [])

    useEffect(() => {
        if(imagePaths != undefined && imagePaths.length != 0) {
            serverApi.post('colors', { body: imagePaths }).then(response => {
                setImageColors(response. data)
                setIsBusy(false)
                //console.log('cores: ', response.data)
            })
        }
    }, [imagePaths])

    function renderItem({ item, index } : { item: EpisodesProps, index: number}) {
        if(imageColors == undefined) return
        
        let color = '' 
        let fontColor = '#fff'
        if(imageColors != undefined) {
            let posters = imageColors[index]
            if(posters == undefined) return
            color = imageColors[index].palette[1]
            if(isTooWhite(color)) fontColor = '#000000'
        }
        
        return(
            <EpisodeItem 
                title={item.name}
                overview={item.overview}
                still_path={item.still_path}
                color={color}
                fontColor={fontColor}
                colors={imageColors[index]}
            />
        )
    }

    return (
        <SafeAreaView style={styles.main}>
            <Text style={styles.header}>Episódios</Text>

            {isBusy ? (
                <View style={{marginTop: Dimensions.get('screen').height / 2}}>
                    <ActivityIndicator size={'large'} />
                </View>
            ) : (
                <FlatList 
                    style={{ marginTop: 20, width: Dimensions.get('screen').width }}
                    data={episodes}
                    //@ts-ignore
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </SafeAreaView>
    )
}

export default Episodes

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center'
    }, 
    header: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 20,
        textAlign: 'center'
    }
})
