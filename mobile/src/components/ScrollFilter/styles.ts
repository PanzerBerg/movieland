import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    main: { 
        height: 30,
        maxHeight: 30,
        flexDirection: 'row', 
        marginTop: 15 
    },
    button: {
        backgroundColor: '#fff', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 8, 
        marginHorizontal: 8
    },
    text: { 
        paddingHorizontal: 8, 
        paddingVertical: 5, 
        fontSize: 14,
        fontFamily: 'Roboto_500Medium',
        color: '#000000'
    }
})

export default styles