import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { api, Movies, Series } from '../../services/api'

import { MovieData, Params, SerieData } from './interfaces'

import styles from './styles'
import Tabs from './Tabs'

const Overview = () => {
    const [movieData, setMovieData] = useState<MovieData>();
    const [serieData, setSerieData] = useState<SerieData>();

    const route = useRoute()
    const params = route.params as Params
    const textColor = isTooWhite(params.colors.palette[1]) ? '#000000' : '#ffffff'


    useEffect(() => {
        if (params.itemParam.type == 'movie') {
            api.get(Movies.getById('pt-BR', params.itemParam.id)).then(response => {
                setMovieData(response.data)
            })
        } else {
            api.get(Series.getById('pt-BR', params.itemParam.id)).then(response => {
                setSerieData(response.data)
            })
        }
    }, [params])

    return (
        <View style={{ flex: 1 }}>
            <View>
                {params.itemParam.type == 'movie' ? (
                    <View>
                        <Image style={styles.backgroundImage} source={{ uri: `https://image.tmdb.org/t/p/w400/${movieData?.backdrop_path == null ? movieData?.poster_path : movieData.backdrop_path}` }} blurRadius={1} />

                        <View style={[styles.container, { backgroundColor: params.colors.palette[1] }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/w400/${movieData?.poster_path}` }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.title, { color: textColor }]}>{movieData?.title}</Text>
                                    {/* <Text style={styles.director}>por </Text> */}
                                    <View style={styles.reviewBlock}>
                                        <Icon name='thumbs-up' size={32} color={textColor} />
                                        <Text style={[styles.review, { color: textColor }]}>{movieData?.vote_average}/10</Text>
                                    </View>
                                    <View style={styles.buttonGroup}>
                                        <TouchableOpacity style={styles.button}>
                                            <Icon name='bookmark' size={24} style={{ marginTop: 5, marginLeft: 5 }} />
                                            <Text style={styles.buttonText}>Assistir {'\n'}mais tarde</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button}>
                                            <Icon name='check-circle' size={24} style={{ marginTop: 5, marginLeft: 5 }} />
                                            <Text style={styles.buttonText}>Marcar como assistido</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, marginLeft: 20, marginRight: 20, marginTop: 5, height: 40 }}>
                                <Tabs isTooWhite={isTooWhite(params.colors.palette[1])} />
                            </View>
                        </View>
                    </View>
                ) : (
                        <View>
                            <Image style={styles.backgroundImage} source={{ uri: `https://image.tmdb.org/t/p/w400/${serieData?.backdrop_path == null ? movieData?.poster_path : serieData.backdrop_path}` }} blurRadius={1} />

                            <View style={[styles.container, { backgroundColor: params.colors.palette[1] }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/w400/${serieData?.poster_path}` }} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.title, { color: textColor }]}>{serieData?.name}</Text>
                                        {/* <Text style={styles.director}>por </Text> */}
                                        <View style={styles.reviewBlock}>
                                            <Icon name='thumbs-up' size={32} color={textColor} />
                                            <Text style={[styles.review, { color: textColor }]}>{serieData?.vote_average}/10</Text>
                                        </View>
                                        <View style={styles.buttonGroup}>
                                            <TouchableOpacity style={styles.button}>
                                                <Icon name='bookmark' size={24} style={{ marginTop: 5, marginLeft: 5 }} />
                                                <Text style={styles.buttonText}>Assistir {'\n'}mais tarde</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.button}>
                                                <Icon name='check-circle' size={24} style={{ marginTop: 5, marginLeft: 5 }} />
                                                <Text style={styles.buttonText}>Marcar como assistido</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 1, marginLeft: 20, marginRight: 20, marginTop: 5, height: 40 }}>
                                    <Tabs isTooWhite={isTooWhite(params.colors.palette[1])} />
                                </View>
                            </View>

                        </View>
                    )}
            </View>

        </View>
    )
}

function isTooWhite(hex: string) {
    const c = hex.substring(1)
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return (luma > 200)
}

export default Overview;