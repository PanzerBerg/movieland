import { StyleSheet, Dimensions } from "react-native"

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 140,
        position: 'absolute',
        left: '60%',
        borderRadius: 10
    },
    imagePosition: {
        width: 100,
        height: 140,
        borderRadius: 10
    },
    card: {
        width: Dimensions.get('screen').width / 1.1,
        marginTop: 50,
        borderRadius: 10,
        minHeight: 150,
        borderWidth: 1
    },
    title: {
        maxWidth: '60%',
        marginTop: 10,
        marginLeft: 10,
        fontSize: 18,
        fontFamily: 'Ubuntu_700Bold'
    },
    date: {
        fontSize: 14,
        marginLeft: 20,
        marginTop: 15,
        fontFamily: 'Roboto_400Regular'
    },
    reviewBlock: {
        marginTop: 15,
        marginLeft: 10,
        flexDirection: "row",
        marginBottom: 10
    },
    review: {
        marginLeft: 5,
        marginTop: 2,
        fontSize: 20,
        fontFamily: 'Ubuntu_700Bold'
    },
    button: {
        width: 50,
        height: 35,
        backgroundColor: '#fff',
        marginLeft: 15,
        borderRadius: 10
    },
    buttonGroup: {
        flexDirection: 'row',
        position: 'absolute',
        left: '53%',
        top: 150
    },
    episodes: {
        width: 150,
        fontSize: 16,
        fontFamily: 'Roboto_400Regular'
    }
})

export default styles