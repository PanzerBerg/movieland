import React from 'react'
import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity } from 'react-native'
import { Colors } from '../../pages/Episodes/interfaces'

interface EpisodeItemProps {
    title: string,
    overview: string,
    still_path: string,
    color: string,
    fontColor: string,
    colors: Colors
}

const EpisodeItem: React.FC<EpisodeItemProps> = ({ title, overview, still_path, color, fontColor, colors }) => {
    return (
        <View style={{marginTop: 20, alignSelf: 'center'}}>
            <TouchableOpacity 
                style={[styles.card, {backgroundColor: color, borderColor: colors.palette[0]}]}
                activeOpacity={0.7}
            >
                <TouchableOpacity 
                    style={styles.imagePosition}
                    activeOpacity={0.7}
                >
                    <Image 
                        source={{uri: `https://image.tmdb.org/t/p/w200${still_path}`}} 
                        style={styles.image}
                    />
                </TouchableOpacity>
                <View>
                    <Text style={[styles.title, {color: fontColor}]}>{title}</Text>
                    <Text style={[styles.overview, {color: fontColor}]}>{overview}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default EpisodeItem

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width / 1.1,
        marginVertical: 25,
        minHeight: 100,
        borderRadius: 10,
        flexDirection: 'row',
        borderWidth: 1
    },
    imagePosition: {
        position: 'absolute',
        left: Dimensions.get('window').width / 30,
        bottom: '70%'
    },
    image: {
        height: 85,
        width: 150,
        borderRadius: 10,
    },
    title: {
        maxWidth: '45%',
        marginLeft: '55%',
        marginTop: 10,
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 18
    },
    overview: {
        marginVertical: 20,
        marginHorizontal: 15,
        fontFamily: 'Roboto_400Regular',
        fontSize: 15
    }
})