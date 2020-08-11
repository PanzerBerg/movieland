import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    safe: {
        flex: 0.7,
        padding: 10,
        paddingBottom: 15
    },
    scroll: {
        flex: 1
    },
    title: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 15,
        width: 75,
    },
    block: {
        flexDirection: 'row',
        marginTop: 15
    },
    text: {
        width: Dimensions.get('window').width / 1.5 - 10,
        marginLeft: 10,
        fontFamily: 'Roboto_500Medium',
        lineHeight: 19
    },
    seasons: {
        flex: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        marginLeft: 10
    }
})

export default styles