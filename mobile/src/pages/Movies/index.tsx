import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { api, Movies } from '../../services/api'

const colorGrabber = require('react-native').NativeModules.colorGrabber

interface Genres{
    genres:[
        GenresData
    ]
}

interface GenresData{
    id: number,
    name: string
}

interface Results {
    results: [
        Data
    ]
}

interface Data {
    popularity: number,
    vote_count: number,
    video: boolean,
    poster_path: string,
    id: number,
    adult: boolean,
    backdrop_path: string,
    original_language: string,
    original_title: string,
    genre_ids: [number],
    title: string,
    vote_average: number,
    overview: string,
    release_date: string
}

const MoviesPage = () => {
    const [movieList, setMovieList] = useState<Results>()

    const navigation = useNavigation()

    function handleOverviewPage() {
        navigation.navigate('Overview');
    }

    useEffect(() => {
        api.get(Movies.topRatedMovies('pt-br', 1)).then(response => {
            setMovieList(response.data)
        })
    }, [])

    return (
        <SafeAreaView style={styles.main}>
            <Text style={styles.header}>Top Movies</Text>

            <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
                {movieList?.results.map(result => (
                    
                    <View key={result.id} style={{ marginTop: 20 }}>
                        <View style={[styles.card]}>
                            <Text style={styles.movieTitle}>{result.title}</Text>
                            {/* <Text style={styles.director}>por Todd Phillips</Text> */}
                            <Text style={styles.theme}></Text>
                            <View style={styles.reviewBlock}>
                                <Icon name='thumbs-up' size={24} color='#fff' />
                                <Text style={styles.review}>{result.vote_average}/10</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.image} onPress={() => handleOverviewPage()} >
                            <Image style={styles.imagePosition} source={{uri: `https://image.tmdb.org/t/p/w200/${result.poster_path}`}} />
                        </TouchableOpacity>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={styles.button}>
                                <Icon name='bookmark' size={24} style={{ alignSelf: 'center', marginTop: 5 }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Icon name='check-circle' size={24} style={{ alignSelf: 'center', marginTop: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

            </ScrollView>
        </SafeAreaView>
    )
}

export default MoviesPage;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#191919'
    },
    header: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 20
    },
    image: {
        width: 100,
        height: 140,
        position: 'absolute',
        left: Dimensions.get('window').width / 2.3,
        borderRadius: 10
    },
    imagePosition: {
        width: 100,
        height: 140,
        borderRadius: 10
    },
    card: {
        width: 290,
        marginTop: 50,
        borderRadius: 10,
        minHeight: 150
    },
    movieTitle: {
        width: 150,
        color: '#fff',
        marginTop: 10,
        marginLeft: 10,
        fontSize: 18,
        fontFamily: 'Ubuntu_700Bold'
    },
    director: {
        color: '#fff',
        fontSize: 10,
        marginLeft: 20,
        fontFamily: 'Roboto_400Regular'
    },
    theme: {
        color: '#fff',
        fontSize: 13,
        marginTop: 10,
        marginLeft: 10
    },
    reviewBlock: {
        marginTop: 10,
        marginLeft: 10,
        flexDirection: "row",
        marginBottom: 10
    },
    review: {
        marginLeft: 5,
        marginTop: 2,
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Ubuntu_700Bold'
    },
    button: {
        width: 50,
        height: 35,
        backgroundColor: '#fff',
        marginLeft: 15,
        borderRadius: 10
    },
    buttonGroup: {
        flexDirection: 'row',
        position: 'absolute',
        left: Dimensions.get('window').width / 2.7,
        top: 150
    }
});