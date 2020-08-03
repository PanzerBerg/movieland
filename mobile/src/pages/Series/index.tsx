import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { api, Series, serverApi } from '../../services/api'

import styles from './styles'
import { Colors, Data, Results } from './interfaces'

const SeriesPage = () => {
    const [seriePage, setSeriePage] = useState<Data[]>()
    const [postersList, setPostersList] = useState<string[]>()
    const [posterColors, setPosterColors] = useState<Colors[]>()
    const [isBusy, setIsBusy] = useState(false);
    const [toLoad, setToLoad] = useState<Data[]>();
    const [page, setPage] = useState(0);
    const [appPage, setAppPage] = useState(0)

    const navigation = useNavigation()

    useEffect(() => {
        loadItems()
    }, [])

    useEffect(() => {
        if (postersList != undefined && postersList.length != 0) {
            serverApi.post('colors', { body: postersList }).then(response => {
                if (posterColors != undefined) {
                    setPosterColors(posterColors?.concat(response.data))
                } else {
                    setPosterColors(response.data)
                }
            })
            setIsBusy(false)
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

    function isTooWhite(hex:string) {
        const c = hex.substring(1)
        const rgb = parseInt(c, 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8 ) & 0xff;
        const b = (rgb >> 0 ) & 0xff;

        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        return (luma > 210)
    }

    function loadItems() {
        //console.log('entrou')
        if (isBusy) {
            //console.log('busy')
            return
        }
        setIsBusy(true)
        //console.log('colors length: ', posterColors?.length)
        if (appPage != 0 && appPage % 2 != 0) {
            //console.log(appPage, 'appPage % 2: ', appPage % 2)
            if (toLoad != undefined && seriePage != undefined) {
                const series = seriePage
                const slice = series?.slice(10, series.length + 1)
                const data: Data[] = toLoad.concat(slice)
                setToLoad(data)

                const posters = new Array()
                slice.map(data => {
                    posters.push(data.poster_path)
                })
                setPostersList(posters)
                //console.log('posters', posters.length)
                setAppPage(appPage + 1)
            }
        } else {
            //console.log(appPage, 'new page')
            api.get(Series.topRatedSeries('pt-BR', (page + 1))).then(response => {
                const result: Results = response.data
                setSeriePage(result.results);

                const pages: Data[] = result.results
                const list: Data[] = pages?.slice(0, 10)
                let data: Data[]
                if (toLoad == undefined) {
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
        if(posterColors == undefined){
            return
        }

        let color
        let fontColor = '#fff'
        if(posterColors != undefined){
            let posters = posterColors[index]
            if(posters == undefined){
                return
            }
            color = posterColors[index].palette[1]
            if(isTooWhite(color)){
                fontColor = '#000000'
            }
        }

        return (
            <View style={{ marginTop: 20, alignSelf: 'center' }}>
                <View style={[styles.card, {backgroundColor: color}]}>
                    <Text style={[styles.movieTitle, {color: fontColor}]}>{item.name}</Text>
                    <Text style={[styles.date, {color: fontColor}]}>de {getDate(item.first_air_date)}</Text>
                    {/* <Text style={styles.theme}></Text> */}
                    <View style={styles.reviewBlock}>
                        <Icon name='thumbs-up' size={24} color={fontColor} />
                        <Text style={[styles.review, {color: fontColor}]}>{item.vote_average}/10</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.image} onPress={() => handleOverviewPage()} >
                    <Image style={styles.imagePosition} source={{ uri: `https://image.tmdb.org/t/p/w200/${item.poster_path}` }} />
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
    }

    const Footer = () => {
        return (
            <View style={{marginTop: 20, marginBottom: 20}}>
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
                // @ts-ignore
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={loadItems}
                onEndReachedThreshold={0.4}
                ListFooterComponent={Footer}
            />

        </SafeAreaView>
    )
}

export default SeriesPage;