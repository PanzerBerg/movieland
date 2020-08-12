import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Dimensions, ActivityIndicator, FlatList } from 'react-native'

import { api, Series, serverApi } from '../../../services/api'
import MvTvItem from '../../../components/MvTvItem'

import { Colors, Data, Results } from '../interfaces'
import { isTooWhite } from '../../../utils'
import styles from '../styles'
import ScrollFilter from '../../../components/ScrollFilter'

const PopularSeries = () => {
    const [seriePage, setSeriePage] = useState<Data[]>()
    const [postersList, setPostersList] = useState<string[]>()
    const [posterColors, setPosterColors] = useState<Colors[]>()
    const [isBusy, setIsBusy] = useState(false);
    const [toLoad, setToLoad] = useState<Data[]>();
    const [page, setPage] = useState(0);
    const [appPage, setAppPage] = useState(0)

    const titles = {
        title1: { buttonTitle: 'Top series', routeName: 'TopSeries' }, 
        title2: { buttonTitle: 'Atualmente no ar', routeName: 'OnAirSeries' }, 
        title3: { buttonTitle: 'Novos episódios', routeName: 'AirTodaySeries'}
    }

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
            api.get(Series.popularSeries('pt-BR', (page + 1))).then(response => {
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
        if(posterColors == undefined) return

        let color = ''
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
            <MvTvItem
                id={item.id}
                type={'tv'}
                title={item.name}
                release_date={item.first_air_date}
                vote_average={item.vote_average}
                poster_path={item.poster_path}
                color={color}
                fontColor={fontColor}
                colors={posterColors[index]}
            />
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
            <Text style={styles.header}>Séries populares</Text>

            <ScrollFilter titles={titles} />

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

export default PopularSeries;