import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { api, Movies, serverApi } from '../../services/api'

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

interface Colors {
    palette: string[],
    url: string
}

const MoviesPage = () => {
    let i = 0
    const [movieList, setMovieList] = useState<Results>()
    const [postersList, setPostersList] = useState<string[]>()
    const [posterColors, setPosterColors] = useState<Colors[]>()
    const [isBusy, setIsBusy] = useState(true);
    const [page, setPage] = useState(1)
    const [appPage, setAppPage] = useState(1)
    const [moreContent, setMoreContent] = useState(false);

    const navigation = useNavigation()

    function handleOverviewPage() {
        navigation.navigate('Overview');
    }

    useEffect(() => {
        api.get(Movies.topRatedMovies('pt-br', 1)).then(response => {
            setMovieList(response.data)
        })
    }, [])

    useEffect(() => {
        if (page != 1) {
            api.get(Movies.topRatedMovies('pt-br', 1)).then(response => {
                setMovieList(response.data)
            })
        }
    }, [moreContent])

    useEffect(() => {
        if (movieList != undefined && movieList.results.length > 0) {
            let posters = new Array()
            movieList?.results.map(movie => {
                posters.push(movie.poster_path);
            })
            setPostersList(posters)
        }
    }, [movieList])

    useEffect(() => {
        if (postersList != undefined && postersList.length != 0) {
            //const postersJson = { 'poster_path': postersList }
            serverApi.post('colors', { body: postersList }).then(response => {
                setPosterColors(response.data)
                setIsBusy(false)
            })
        }
    }, [postersList])

    function getDate(date: string) {
        let formatedDate
        let splitDate = date.split('-');
        let year = splitDate[0]
        let month = splitDate[1]
        let day = splitDate[2]

        formatedDate = [day, month, year]

        return formatedDate.join('/')
    }


    return (
        <SafeAreaView style={styles.main}>
            <Text style={styles.header}>Top Movies</Text>

            <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false} >

                {isBusy ? (
                    <View>
                        <ActivityIndicator />
                    </View>
                ) : (
                        <View>
                            {movieList && posterColors && movieList?.results.map(result => {
                                let color
                                if (posterColors != undefined) {
                                    color = posterColors[i].palette[2]
                                }
                                i++
                                if (i >= 5 * appPage) {
                                    setIsBusy(false)
                                    setAppPage(appPage + 1)
                                    return
                                }

                                return (
                                    <View key={result.id} style={{ marginTop: 20 }}>
                                        <View style={[styles.card, { backgroundColor: color }]}>
                                            <Text style={styles.movieTitle}>{result.title}</Text>
                                            <Text style={styles.date}>de {getDate(result.release_date)}</Text>
                                            {/* <Text style={styles.theme}></Text> */}
                                            <View style={styles.reviewBlock}>
                                                <Icon name='thumbs-up' size={24} color='#fff' />
                                                <Text style={styles.review}>{result.vote_average}/10</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.image} onPress={() => handleOverviewPage()} >
                                            <Image style={styles.imagePosition} source={{ uri: `https://image.tmdb.org/t/p/w200/${result.poster_path}` }} />
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
                                )
                            })}
                        </View>
                    )
                }

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
    date: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 20,
        marginTop: 10,
        fontFamily: 'Roboto_400Regular'
    },
    theme: {
        color: '#fff',
        fontSize: 13,
        marginTop: 10,
        marginLeft: 10
    },
    reviewBlock: {
        marginTop: 20,
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