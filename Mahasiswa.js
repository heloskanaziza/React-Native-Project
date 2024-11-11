import React from 'react';
import DataMahasiswa from './data/mahasiswa.json';
import { FlatList, Text, View, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserGraduate, faMars, faVenus } from '@fortawesome/free-solid-svg-icons';

const Mahasiswa = () => {
    return (
        <FlatList
            data={DataMahasiswa}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() =>
                        Linking.openURL('google.navigation:q=' + item.latitude + ',' + item.longitude)} >
                    <View style={ styles.card }>
                        <View style={ styles.avatar }>
                            <FontAwesomeIcon icon={faUserGraduate} size={35} 
                            color={ item.gender == 'male' ? '#37AFE1' : '#D76C82'} />
                        </View>
                        <View>
                            <Text style={ styles.cardtitle }>{item.first - name} {item.last - name}</Text>

                            <FontAwesomeIcon
                            icon={item.gender == 'male' ? faMars : faVenus} 
                            color={ item.gender == 'male' ? '#37AFE1' : '#D76C82'}
                            size={14}
                            />

                            <Text>Kelas {item.class}</Text>
                            <Text>{item.latitude}, {item.longitude}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default Mahasiswa

const styles = StyleSheet.create({
    title: {
        paddingVertical: 12,
        backgroundColor: '#333',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    avatar: {
        borderRadius: 100,
        width: 70,
    },
    cardtitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'lightgray',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginHorizontal: 20,
        marginVertical: 7
    },
})
