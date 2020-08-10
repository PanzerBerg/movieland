import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, View, FlatList, TouchableOpacity, Image } from 'react-native'

import { Cast, Params, Crew } from '../../interfaces'

import { api, Movies, Series } from '../../../../services/api'

import styles from './styles'

const Elenco = ({ params, isTooWhite }: { params: Params, isTooWhite: boolean }) => {
    const [cast, setCast] = useState<Cast[]>();
    const [director, setDirector] = useState<Crew>()

    let cardColor = '#fff'
    let textColor = '#000000'
    if (isTooWhite) {
        cardColor = '#191919'
        textColor = '#fff'
    }

    useEffect(() => {
        if (params.itemParam.type == 'movie') {
            api.get(Movies.getCast(params.itemParam.id)).then(response => {
                setCast(response.data.cast);
                response.data.crew.map((crew: Crew) => {
                    if (crew.job === 'Director') {
                        setDirector(crew)
                    }
                })
            })
        } else {
            api.get(Series.getCast(params.itemParam.id)).then(response => {
                setCast(response.data.cast);
            })
        }
    }, [])

    function renderItem({ item, index }: { item: Cast, index: number }) {
        if (index == 0 && params.itemParam.type == 'movie') {
            return (
                <View>
                    <Text style={[styles.rowTitle, { color: cardColor }]}>Director</Text>
                    <TouchableOpacity style={[styles.card, { backgroundColor: cardColor }]} activeOpacity={0.7}>
                        <View>
                            <View style={styles.textBlock}>
                                <Text style={[styles.title, { color: textColor }]}>Nome: {' '}</Text>
                                <Text style={[styles.text, { color: textColor }]}>{director?.name}</Text>
                            </View>

                        </View>
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w200/${director?.profile_path}` }}
                            style={styles.profileImg}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.rowTitle, { color: cardColor }]}>Atores</Text>

                    <TouchableOpacity style={[styles.card, { backgroundColor: cardColor }]} activeOpacity={0.7}>
                        <View>
                            <View style={styles.textBlock}>
                                <Text style={[styles.title, { color: textColor }]}>Nome: {' '}</Text>
                                <Text style={[styles.text, { color: textColor }]}>{item.name}</Text>
                            </View>

                            <View style={styles.textBlock}>
                                <Text style={[styles.title, { color: textColor }]}>Personagem: {' '}</Text>
                                <Text style={[styles.text, { color: textColor }]}>{item.character}</Text>
                            </View>
                        </View>
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w200/${item.profile_path}` }}
                            style={styles.profileImg}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <TouchableOpacity style={[styles.card, { backgroundColor: cardColor }]} activeOpacity={0.7}>
                <View>
                    <View style={styles.textBlock}>
                        <Text style={[styles.title, { color: textColor }]}>Nome: {' '}</Text>
                        <Text style={[styles.text, { color: textColor }]}>{item.name}</Text>
                    </View>

                    <View style={styles.textBlock}>
                        <Text style={[styles.title, { color: textColor }]}>Personagem: {' '}</Text>
                        <Text style={[styles.text, { color: textColor }]}>{item.character}</Text>
                    </View>
                </View>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w200/${item.profile_path}` }}
                    style={styles.profileImg}
                />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 0.7, padding: 10 }}>
            <FlatList
                style={{ flex: 1 }}
                data={cast}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />

        </SafeAreaView>
    )
}

export default Elenco