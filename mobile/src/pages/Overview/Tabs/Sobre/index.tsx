import React, { useState } from 'react'
import { ScrollView, Text, View, StyleSheet, Dimensions, SafeAreaView, Image, ActivityIndicator, TouchableOpacity } from 'react-native'

import { getDate, getTitleThreshold } from '../../../../utils'

import { MovieData, SerieData, Params } from '../../interfaces'

const Sobre = ({ movieParams, serieParams, params, isTooWhite }: { movieParams?: MovieData, serieParams?: SerieData, params: Params, isTooWhite: boolean }) => {
    const [isBusy, setIsBusy] = useState(false);
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
                        <Text style={[styles.text, {color: txtColor}]}>{movieParams.production_companies.map(company => `${company.name}`)}</Text>
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
                        <Text style={[styles.text, {color: txtColor}]}>{serieParams.production_companies.map(company => `${company.name} | `)}</Text>
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
                        <TouchableOpacity style={[styles.seasons, {backgroundColor: buttonColor}]}> 
                            <Text style={[styles.text, {color: txtColor}]}>Ver todas as {serieParams.seasons.length} temporadas</Text>
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

const styles = StyleSheet.create({
    safe: {
        padding: 10,
        paddingBottom: 15
    },
    scroll: {
        flex: 1
    },
    title: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 15,
        width: 75,
    },
    block: {
        flexDirection: 'row',
        marginTop: 15
    },
    text: {
        width: Dimensions.get('window').width / 1.5 - 10,
        marginLeft: 10,
        fontFamily: 'Roboto_500Medium'
    },
    seasons: {
        flex: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        marginLeft: 10
    }
})