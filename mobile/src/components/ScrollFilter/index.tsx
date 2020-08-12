import React from 'react'
import { ScrollView, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation, StackActions } from '@react-navigation/native'

import styles from './styles'

interface FilterProps {
    titles: {
        title1: TitleProps,
        title2: TitleProps,
        title3: TitleProps,
    }
}

interface TitleProps {
    buttonTitle: string, 
    routeName: string
}

const ScrollFilter: React.FC<FilterProps> = ({ titles }) => {

    const navigation = useNavigation()

    function handlePageFilter(routeName: string) {
        navigation.dispatch(StackActions.replace(routeName))
    }

    return (
        <ScrollView
            style={styles.main}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <RectButton style={styles.button} onPress={() => handlePageFilter(titles.title1.routeName)}>
                <Text style={styles.text}>{titles.title1.buttonTitle}</Text>
            </RectButton>

            <RectButton style={styles.button} onPress={() => handlePageFilter(titles.title2.routeName)}>
                <Text style={styles.text}>{titles.title2.buttonTitle}</Text>
            </RectButton>

            <RectButton style={styles.button} onPress={() => handlePageFilter(titles.title3.routeName)}>
                <Text style={styles.text}>{titles.title3.buttonTitle}</Text>
            </RectButton>

        </ScrollView>
    )
}

export default ScrollFilter