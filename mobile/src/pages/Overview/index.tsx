import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import styles from './styles'

const Overview = () => {
    const Tab = createMaterialTopTabNavigator()

    const Sinopse = () => {
        return (
            <ScrollView style={styles.tabPage}>
                <Text>Sinopse</Text>
            </ScrollView>
        )
    }
    
    const Elenco = () => {
        return (
            <ScrollView style={styles.tabPage}>
                <Text>Elenco</Text>
            </ScrollView>
        )
    }
    
    const Analises = () => {
        return (
            <ScrollView style={styles.tabPage}>
                <Text>Analises</Text>
            </ScrollView>
        )
    }
    
    const Premios = () => {
        return (
            <ScrollView style={styles.tabPage}>
                <Text>Premios</Text>
            </ScrollView>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Image style={styles.backgroundImage} source={require('../../assets/Joker_(2019).jpg')} blurRadius={2} />
            {}
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.image} source={require('../../assets/Joker_(2019).jpg')} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>Joker</Text>
                        <Text style={styles.director}>por Todd Phillips</Text>
                        <View style={styles.reviewBlock}>
                            <Icon name='thumbs-up' size={32} color='#fff' />
                            <Text style={styles.review}>8/10</Text>
                        </View>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={styles.button}>
                                <Icon name='bookmark' size={24} style={{ marginTop: 5, marginLeft: 5 }} />
                                <Text style={styles.buttonText}>Assistir {'\n'}mais tarde</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Icon name='check-circle' size={24} style={{ marginTop: 5, marginLeft: 5 }} />
                                <Text style={styles.buttonText}>Marcar como assistido</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flex:1, marginLeft: 20, marginRight: 20, marginTop: 5}}>
                    <Tab.Navigator initialRouteName='Sinopse' tabBarOptions={{
                        labelStyle: {
                            fontFamily: 'Ubuntu_700Bold',
                            color: '#fff'
                        },
                        style: {
                            backgroundColor: 'transparent',
                            height: 40
                        },
                        indicatorStyle: {
                            height: 2,
                            backgroundColor: '#000000'
                        }
                    }} >
                        <Tab.Screen name='Sinopse' component={Sinopse} />
                        <Tab.Screen name='Elenco' component={Elenco} />
                        <Tab.Screen name='Analises' component={Analises} />
                        <Tab.Screen name='Premios' component={Premios} />
                    </Tab.Navigator>
                </View>
            </View>
        </View>
    )
}


export default Overview;