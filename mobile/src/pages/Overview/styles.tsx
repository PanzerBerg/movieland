import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 3,
    },
    container: {
        backgroundColor: '#6B5025',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'relative',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: -100
    },
    image: {
        width: 140,
        height: 200,
        borderRadius: 10,
        marginTop: -50,
        marginLeft: 25
    },
    title: {
        color: '#fff',
        marginTop: 15,
        marginLeft: 20,
        fontSize: 36,
        fontFamily: 'Ubuntu_700Bold'
    },
    director: {
        color: '#fff',
        fontSize: 13,
        marginLeft: 40,
        fontFamily: 'Roboto_400Regular'
    },
    reviewBlock: {
        marginTop: 10,
        marginLeft: 20,
        flexDirection: "row"
    },
    review: {
        marginLeft: 5,
        marginTop: 2,
        fontSize: 30,
        color: '#fff',
        fontFamily: 'Ubuntu_700Bold'
    },
    button: {
        width: 85,
        height: 35,
        backgroundColor: '#fff',
        marginLeft: 15,
        borderRadius: 10,
        flexDirection: 'row'
    },
    buttonGroup: {
        flexDirection: 'row',
        marginTop: 10
    },
    buttonText: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 10,
        marginTop: 5
    },
    tabPage: {
        flex: 1,
        backgroundColor: '#6B5025'
    }
})

export default styles