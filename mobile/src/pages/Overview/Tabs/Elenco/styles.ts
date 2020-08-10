import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 120,
        backgroundColor: '#000000',
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profileImg: {
        height: 100,
        width: 100,
        marginRight: 10,
        borderRadius: 10
    },
    textBlock: {
        maxWidth: 140,
        flexDirection: 'row',
        marginLeft: 10
    },
    title: {
        fontFamily: 'Roboto_500Medium'
    },
    text: {
        fontFamily: 'Roboto_400Regular'
    },
    rowTitle: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 16,
        marginVertical: 10
    }
})

export default styles