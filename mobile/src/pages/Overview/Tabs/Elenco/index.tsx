import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, View, FlatList, TouchableOpacity, Image } from 'react-native'

import { Cast, Params, Crew } from '../../interfaces'

import { api, Movies, Series } from '../../../../services/api'

import styles from './styles'
import CastCard from '../../../../components/CastCard'

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
        let profilePath = ''

        if(item.profile_path == null) {
            profilePath = 'https://m.media-amazon.com/images/G/01/IMDbPro/images/default_name._V142442227_UY289_CR46,0,196,289_.png'
        } else {
            profilePath = `https://image.tmdb.org/t/p/w200/${item.profile_path}`
        }

        if (index == 0 && params.itemParam.type == 'movie') {
            let directorProfile = ''

            if(director?.profile_path == null){
                directorProfile = 'https://m.media-amazon.com/images/G/01/IMDbPro/images/default_name._V142442227_UY289_CR46,0,196,289_.png'
            } else {
                directorProfile = `https://image.tmdb.org/t/p/w200/${director?.profile_path}`
            }
            if(director?.name != undefined){
                return (
                    <View>
                        <Text style={[styles.rowTitle, { color: cardColor }]}>Diretor</Text>
                        <CastCard name={director.name} profileImg={directorProfile} cardColor={cardColor} textColor={textColor} isActor={false} />
                        <Text style={[styles.rowTitle, { color: cardColor }]}>Atores</Text>

                        <CastCard 
                            name={item.name} 
                            character={item.character} 
                            profileImg={profilePath} 
                            cardColor={cardColor} 
                            textColor={textColor} 
                            isActor={true} 
                        />

                    </View>
                )
            }
        } else {
            return (
                <CastCard 
                    name={item.name}
                    character={item.character} 
                    profileImg={profilePath} 
                    cardColor={cardColor} 
                    textColor={textColor} 
                    isActor={true}
                />            
            )
        }
    }

    return (
        <SafeAreaView style={{ flex: 0.7, padding: 10 }}>
            <FlatList
                style={{ flex: 1 }}
                data={cast}
                //@ts-ignore
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />

        </SafeAreaView>
    )
}

export default Elenco