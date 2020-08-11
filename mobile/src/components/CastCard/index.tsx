import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'

import styles from './styles'

interface CastCardProps {
    name: string,
    character?: string,
    profileImg: string,
    cardColor: string,
    textColor: string,
    isActor: boolean
}

const CastCard: React.FC<CastCardProps> = ({ name, character, profileImg, cardColor, textColor, isActor }) => {
    return (
        <TouchableOpacity style={[styles.card, { backgroundColor: cardColor }]} activeOpacity={0.7}>
            <View>
                <View style={styles.textBlock}>
                    <Text style={[styles.title, { color: textColor }]}>Nome: {' '}</Text>
                    <Text style={[styles.text, { color: textColor }]}>{name}</Text>
                </View>

                {isActor && (
                    <View style={styles.textBlock}>
                        <Text style={[styles.title, { color: textColor }]}>Personagem: {' '}</Text>
                        <Text style={[styles.text, { color: textColor }]}>{character}</Text>
                    </View>
                )}

            </View>
            <Image
                source={{ uri: profileImg }}
                style={styles.profileImg}
            />
        </TouchableOpacity>
    )
}

export default CastCard