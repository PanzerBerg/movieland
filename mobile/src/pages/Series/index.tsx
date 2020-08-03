import React, { useState, useEffect, useContext } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { api, Series, serverApi } from '../../services/api'

interface Results {
    results: [
        Data
    ]
}

interface Data {
    original_name: string,
    genre_ids: [number],
    name: string,
    popularity: number,
    origin_country: string[],
    vote_count: number,
    first_air_date: string,
    backdrop_path: string,
    original_language: string,
    id: number,
    vote_average: number,
    overview: string,
    poster_path: string
}

interface Colors {
    palette: string[],
    url: string
}

const SeriesPage = () => {
    const [seriePage, setSeriePage] = useState<Data[]>()
    const [postersList, setPostersList] = useState<string[]>()
    const [pagePosters, setPagePosters] = useState<string[]>()
    const [posterColors, setPosterColors] = useState<Colors[]>()
    const [isBusy, setIsBusy] = useState(false);
    const [toLoad, setToLoad] = useState<Data[]>();
    const [page, setPage] = useState(0);
    const [appPage, setAppPage] = useState(0)

    const navigation = useNavigation()

    useEffect(() => {
        loadItems()
    }, [])

    // useEffect(() => {
    //     api.get(Series.topRatedSeries('pt-BR', 1)).then(response => {
    //         setSeriePage(response.data.results);
    //         const pages = seriePage
    //         const list = pages?.slice(0,10)
    //         setToLoad(list)
    //         let posters = new Array()
    //         list?.map(list => {
    //             posters.push(list.poster_path)
    //         })
    //         setPostersList(posters)
    //     })
    // }, [])

    useEffect(() => {
        if(postersList != undefined && postersList.length != 0){
            serverApi.post('colors', {body: postersList}).then(response => {
                if(posterColors != undefined){
                    setPosterColors(posterColors?.concat(response.data))
                } else {
                    console.log('setting colors', response.data)
                    setPosterColors(response.data)
                }
                setIsBusy(false)
            })
        }
    }, [postersList])


    function handleOverviewPage() {
        navigation.navigate('Overview');
    }

    function getDate(date: string) {
        let formatedDate
        const splitDate = date.split('-');
        const year = splitDate[0]
        const month = splitDate[1]
        const day = splitDate[2]

        formatedDate = [day, month, year]

        return formatedDate.join('/')
    }

    function loadItems() {
        console.log('entrou')
        if (isBusy) {
            //console.log('busy')
            return
        }
        setIsBusy(true)
        console.log('colors length: ', posterColors?.length)
        if (appPage != 0 && appPage % 2 != 0) {
            console.log(appPage, 'appPage % 2: ', appPage % 2)
            if(toLoad != undefined && seriePage != undefined){
                const series = seriePage
                const slice = series?.slice(10, series.length + 1)
                const data: Data[] = toLoad.concat(slice)
                setToLoad(data)

                const posters = new Array()
                slice.map(data => {
                    posters.push(data.poster_path)
                })
                setPostersList(posters)
                console.log('posters', posters.length)
                setAppPage(appPage + 1)
            }
        } else {
            console.log(appPage, 'new page')
            api.get(Series.topRatedSeries('pt-BR', (page + 1))).then(response => {
                const result:Results = response.data
                setSeriePage(result.results);

                const pages:Data[] = result.results
                const list:Data[] = pages?.slice(0, 10)
                let data:Data[]
                if(toLoad == undefined){
                    data = [...list]
                } else {
                    data = [...toLoad, ...list]
                }
                setToLoad(data)

                let posters = new Array()
                list?.map(list => {
                    posters.push(list.poster_path)
                })
                setPostersList(posters)
                setPage(page + 1)
                setAppPage(appPage + 1)
            })
        }
    }

    function renderItem({ item, index }: { item: Data, index: number }) {
        return (
            <View style={{ flex: 1, height: 100, width: 300, backgroundColor: '#303030', marginTop: 20, alignSelf: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 20, alignSelf: 'center' }}>{item.name}</Text>
            </View>
        )
    }

    const Footer = () => {
        return (
            <View>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.main}>
            <Text style={styles.header}>Top TV Series</Text>

            <FlatList
                style={{ marginTop: 20, width: Dimensions.get('screen').width }}
                data={toLoad}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={loadItems}
                onEndReachedThreshold={0.3}
                ListFooterComponent={Footer}
            />

        </SafeAreaView>
    )
}

export default SeriesPage;

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