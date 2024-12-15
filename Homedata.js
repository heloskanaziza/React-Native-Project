import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Homedata = () => {
    const navigation = useNavigation();

    const handleAddDataPress = () => {
        Alert.alert(
            "Tambah Data",
            "Apakah Anda ingin menambahkan data konser?",
            [
                { text: "Batal", style: "cancel" },
                { text: "OK", onPress: () => navigation.navigate('Add') }, // Pastikan 'Add' sesuai dengan nama di CrudConcertNav.js
            ]
        );
    };

    const handleOpenMapPress = () => {
        Alert.alert(
            "Buka Peta",
            "Apakah Anda ingin membuka lokasi konser?",
            [
                { text: "Batal", style: "cancel" },
                { text: "OK", onPress: () => navigation.navigate('Map') }, // Navigasi ke MapScreen
            ]
        );
    };

    const handleReadMorePress = () => {
        Alert.alert(
            "Lihat Lebih Banyak",
            "Apakah Anda ingin melihat daftar konser?",
            [
                { text: "Batal", style: "cancel" },
                { text: "OK", onPress: () => navigation.navigate('Concerts') }, // Navigasi ke ListScreen
            ]
        );
    };

    return (
        <ImageBackground
            source={require('./assets/images/home_background.png')} // Ganti sesuai path gambar Anda
            style={styles.background}
        >
            {/* Klik Add Data */}
            <TouchableOpacity
                style={[styles.clickableText, { top: '46.7%', left: '29.5%' }]}
                onPress={handleAddDataPress}
            >
                <Text style={styles.textButton}>Add Data</Text>
            </TouchableOpacity>

            {/* Klik Open Map */}
            <TouchableOpacity
                style={[styles.clickableText, { top: '62.3%', left: '60.1%' }]}
                onPress={handleOpenMapPress}
            >
                <Text style={styles.textButton}>Open Map</Text>
            </TouchableOpacity>

            {/* Klik Read More */}
            <TouchableOpacity
                style={[styles.clickableText, { bottom: '18%', alignSelf: 'center' }]}
                onPress={handleReadMorePress}
            >
                <Text style={styles.textReadMore}>📖 Read More</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    clickableText: {
        position: 'absolute',
    },
    textButton: {
        fontSize: 11,
        color: '#f7c600',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    textReadMore: {
        fontSize: 16,
        color: '#f7c600',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
});

export default Homedata;
