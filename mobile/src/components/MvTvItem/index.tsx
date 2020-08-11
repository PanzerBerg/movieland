import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import { getDate } from '../../utils'

import styles from './styles'

interface Props {
    id: number,
    type: string,
    title: string,
    release_date: string,
    vote_average?: number,
    poster_path: string,
    color: string,
    fontColor: string,
    colors: Colors,
    episodes?: number,
    seasonNumber?: number
}

interface Colors {
    palette: string[],
    url: string
}

const MvTvItem: React.FC<Props> = ({ id, type, title, release_date, vote_average, poster_path, color, fontColor, colors, episodes, seasonNumber }) => {
    const navigation = useNavigation()

    function handleOverviewPage(id:number, colors:Colors) {

        if(type == 'season'){
            const itemParam = {
                id,
                seasonNumber,
                type
            }

            if(episodes == 0) return Alert.alert(
                'Esta temporada ainda não estreou.', 
                'Não há informações a serem mostradas pois essa temporada ainda não foi lançada.'
            )
            navigation.navigate('Episodes', itemParam);
        } else {
            const itemParam = {
                id,
                type
            }

            navigation.navigate('Overview', {itemParam, colors});
        }
    }

    return (
        <View style={{ marginTop: 20, alignSelf: 'center' }}>
            <View style={[styles.card, { backgroundColor: color, borderColor: colors.palette[0] }]}>
                <Text style={[styles.title, { color: fontColor }]}>{title}</Text>
                {release_date == null ? (
                    <Text style={[styles.date, { color: fontColor }]}>Sem data{'\n'}de lançamento</Text>
                ) : (
                    <Text style={[styles.date, { color: fontColor }]}>de {getDate(release_date)}</Text>
                )}
                {vote_average != undefined && (
                    <View style={styles.reviewBlock}>
                        <Icon name='thumbs-up' size={24} color={fontColor} />
                        <Text style={[styles.review, { color: fontColor }]}>{vote_average}/10</Text>
                    </View>
                )}
                {type == 'season' && (
                    <View style={styles.reviewBlock} > 
                        <Text style={[styles.episodes, { color: fontColor }]}>Episódios: {episodes}</Text>
                    </View>
                )}
            </View>
            <TouchableOpacity
                style={styles.image}
                onPress={() => handleOverviewPage(id, colors)}
                activeOpacity={0.8}
            >
                {poster_path == null ? (
                    <Image style={styles.imagePosition} source={{ uri: 'https://rufforosa.com.br/wp-content/uploads/2016/02/placeholder-9.jpg' }} />
                    ) : (    
                    <Image style={styles.imagePosition} source={{ uri: `https://image.tmdb.org/t/p/w200/${poster_path}` }} />
                )}
            </TouchableOpacity>
            <View style={styles.buttonGroup}>
                <RectButton style={styles.button}>
                    <Icon name='bookmark' size={24} style={{ alignSelf: 'center', marginTop: 5 }} />
                </RectButton>
                <RectButton style={styles.button}>
                    <Icon name='check-circle' size={24} style={{ alignSelf: 'center', marginTop: 5 }} />
                </RectButton>
            </View>
        </View>
    )
}

export default MvTvItem;