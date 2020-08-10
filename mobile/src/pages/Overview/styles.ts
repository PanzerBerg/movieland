import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 3,
    },
    container: {
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
        marginTop: 15,
        marginLeft: 20,
        fontSize: 25,
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
    }
})

export default styles