import React from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Movies = () => {
    
    const navigation = useNavigation()

    function handleOverviewPage() {
        navigation.navigate('Overview');
    }

    return (
        <SafeAreaView style={styles.main}>
            <Text style={styles.header}>Top Movies</Text>

            <View style={{marginTop: 20}}>
                <View style={styles.card}>
                    <Text style={styles.movieTitle}>Joker</Text>
                    <Text style={styles.director}>por Todd Phillips</Text>
                    <Text style={styles.theme}>Crime | Suspense | Drama</Text>
                    <View style={styles.reviewBlock}>
                        <Icon name='thumbs-up' size={24} color='#fff' />
                        <Text style={styles.review}>8/10</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.image} onPress={() => handleOverviewPage()} >
                    <Image style={styles.imagePosition} source={require('../../assets/Joker_(2019).jpg')} />
                </TouchableOpacity>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.button}>
                        <Icon name='bookmark' size={24} style={{alignSelf: 'center', marginTop: 5}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Icon name='check-circle' size={24} style={{alignSelf: 'center', marginTop: 5}} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Movies;

const styles = StyleSheet.create({
    main: {
        flex:1,
        alignItems: 'center',
        backgroundColor: '#191919'
    },
    header: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 20
    },
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
        backgroundColor: '#6B5025',
        width: 290,
        height: 150,
        marginTop: 50,
        borderRadius: 10
    },
    movieTitle: {
        color: '#fff',
        marginTop: 10,
        marginLeft: 10,
        fontSize: 24,
        fontFamily: 'Ubuntu_700Bold'
    },
    director: {
        color: '#fff',
        fontSize: 10,
        marginLeft: 20,
        fontFamily: 'Roboto_400Regular'
    },
    theme: {
        color: '#fff',
        fontSize: 13,
        marginTop: 10,
        marginLeft: 10
    },
    reviewBlock: {
        marginTop: 25,
        marginLeft: 10,
        flexDirection: "row"
    },
    review: {
        marginLeft: 5,
        marginTop: 2,
        fontSize: 20,
        color: '#fff',
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
        flexDirection:'row',
        position: 'absolute',
        left: Dimensions.get('window').width / 2.7,
        top: 150
    }
});