import React, { useState } from 'react'
import { ScrollView, Text, View, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { getDate, getTitleThreshold } from '../../../../utils'

import { MovieData, SerieData, Params } from '../../interfaces'

import styles from './styles'

const Sobre = ({ movieParams, serieParams, params, isTooWhite }: { movieParams?: MovieData, serieParams?: SerieData, params: Params, isTooWhite: boolean }) => {
    const navigation = useNavigation()
    
    let txtColor
    let buttonColor
    isTooWhite ? txtColor = '#000000' : txtColor = '#fff'
    isTooWhite ? buttonColor = '#fff' : buttonColor = '#000000'

    if (movieParams == undefined && serieParams == undefined) {
        return (
            <View>
                <ActivityIndicator />
            </View>
        )
    }

    function handleNavigationToSeasons() {
        navigation.navigate('Seasons', {params, seasons: serieParams?.seasons, name: serieParams?.name})
    }

    if (params.itemParam.type == 'movie' && movieParams != undefined) {
        return (
            <SafeAreaView style={[styles.safe, {height: getTitleThreshold(movieParams.title.length)}]}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.block}>
                        <Text style={[styles.title, {color: txtColor}]}>Sinópse: </Text>
                        <Text style={[styles.text, {color: txtColor}]}>{movieParams.overview}</Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={[styles.title, {color: txtColor}]}>Título original:</Text>
                        <Text style={[styles.text, {color: txtColor}]}>{movieParams.original_title}</Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={[styles.title, {color: txtColor}]}>Lingua original:</Text>
                        <Text style={[styles.text, {color: txtColor}]}>{movieParams.original_language}</Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={[styles.title, {color: txtColor}]}>Gêneros:</Text>
                        <Text style={[styles.text, {color: txtColor}]}>{movieParams.genres.map(genre => `${genre.name} | `)}</Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={[styles.title, {color: txtColor}]}>Lançado:</Text>
                        <Text style={[styles.text, {color: txtColor}]}>{getDate(movieParams.release_date)}</Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={[styles.title, {color: txtColor}]}>Produzido por:</Text>
                        <Text style={[styles.text, {color: txtColor}]}>{movieParams.production_companies.map(company => `${company.name} ${'\n'}`)}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>

        )
    }

    if (serieParams != undefined) {
        return (
            <SafeAreaView style={[styles.safe, {height: getTitleThreshold(serieParams.name.length)}]}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.block}>
                        <Text style={[styles.title, {color: txtColor}]}>Sinópse: </Text>
                        <Text style={[styles.text, {color: txtColor}]}>{serieParams.overview}</Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={[styles.title, {color: txtColor}]}>Título original:</Text>
                        <Text style={[styles.text, {color: txtColor}]}>{serieParams.original_name}</Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={[styles.title, {color: txtColor}]}>Lingua original:</Text>
                        <Text style={[styles.text, {color: txtColor}]}>{serieParams.original_language}</Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={[styles.title, {color: txtColor}]}>Gêneros:</Text>
                        <Text style={[styles.text, {color: txtColor}]}>{serieParams.genres.map(genre => `${genre.name} | `)}</Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={[styles.title, {color: txtColor}]}>Lançado:</Text>
                        <Text style={[styles.text, {color: txtColor}]}>{getDate(serieParams.first_air_date)}</Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={[styles.title, {color: txtColor}]}>Produzido por:</Text>
                        <Text style={[styles.text, {color: txtColor}]}>{serieParams.production_companies.map(company => `${company.name} ${'\n'}`)}</Text>
                    </View>
                    
                    <View style={styles.block}>
                        <Text style={[styles.title, {color: txtColor}]}>N° de{'\n'}Episódios:</Text>
                        <Text style={[styles.text, {color: txtColor}]}>{serieParams.number_of_episodes}</Text>
                    </View>
                    
                    <View style={styles.block}>
                        <Text style={[styles.title, {color: txtColor}]}>N° de{'\n'}Temps:</Text>
                        <Text style={[styles.text, {color: txtColor}]}>{serieParams.number_of_seasons}</Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={[styles.title, {color: txtColor}]}>Temporadas:</Text>
                        <TouchableOpacity 
                            activeOpacity={0.7} 
                            style={[styles.seasons, {backgroundColor: buttonColor}]}
                            onPress={handleNavigationToSeasons}
                        > 
                            <Text style={[styles.text, {color: txtColor}]}>{'   '}Ver todas as {serieParams.seasons.length} temporadas</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

    return (
        <Text style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>An unexpected error occurred</Text>
    )
}

export default Sobre;