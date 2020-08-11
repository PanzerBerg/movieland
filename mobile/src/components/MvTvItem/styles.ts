import { StyleSheet, Dimensions } from "react-native"

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 140,
        position: 'absolute',
        left: Dimensions.get('window').width / 2.3,
        borderRadius: 10
    },
    imagePosition: {
        width: 100,
        height: 140,
        borderRadius: 10
    },
    card: {
        width: 290,
        marginTop: 50,
        borderRadius: 10,
        minHeight: 150,
        borderWidth: 1
    },
    title: {
        width: 150,
        marginTop: 10,
        marginLeft: 10,
        fontSize: 18,
        fontFamily: 'Ubuntu_700Bold'
    },
    date: {
        fontSize: 14,
        marginLeft: 20,
        marginTop: 10,
        fontFamily: 'Roboto_400Regular'
    },
    reviewBlock: {
        marginTop: 20,
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
        left: Dimensions.get('window').width / 2.7,
        top: 150
    },
    episodes: {
        width: 150,
        fontSize: 16,
        fontFamily: 'Roboto_400Regular'
    }
})

export default styles