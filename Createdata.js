import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    ScrollView,
    TextInput,
    Text,
    Button,
    StyleSheet,
    ImageBackground,
    Platform,
    TouchableOpacity,
    Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Createdata = () => {
    const jsonUrl = 'http://192.168.1.7:3000/concerts';

    const [concert_name, setConcertName] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [line_up, setLineUp] = useState('');
    const [web_link, setWebLink] = useState('');

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const submit = () => {
        Alert.alert(
            'Konfirmasi',
            'Apakah Anda yakin ingin menyimpan data ini?',
            [
                {
                    text: 'Batal',
                    onPress: () => console.log('Batal'),
                    style: 'cancel'
                },
                {
                    text: 'Simpan',
                    onPress: () => {
                        const data = {
                            concert_name,
                            date: date.toISOString().split('T')[0], // Format tanggal menjadi YYYY-MM-DD
                            location,
                            price,
                            line_up,
                            web_link,
                        };

                        fetch(jsonUrl, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        })
                            .then((response) => response.json())
                            .then((json) => {
                                console.log(json);
                                alert('Data tersimpan');
                                // Reset form setelah submit
                                setConcertName('');
                                setDate(new Date());
                                setLocation('');
                                setPrice('');
                                setLineUp('');
                                setWebLink('');
                            })
                            .catch((error) => {
                                console.error(error);
                                alert('Terjadi kesalahan saat menyimpan data.');
                            });
                    }
                }
            ],
            { cancelable: false }
        );
    };

    return (
        <ImageBackground
            source={require('./assets/images/concert_background.png')}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.title}>Add Concert Data</Text>
                    <ScrollView contentContainerStyle={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Concert Name"
                            value={concert_name}
                            onChangeText={setConcertName}
                        />
                        <View style={{ marginVertical: 8 }}>
                            <Text style={styles.label}> Date</Text>
                            <TouchableOpacity
                                style={styles.dateButton}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Text style={styles.dateButtonText}>
                                    {date.toDateString()}
                                </Text>
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={onDateChange}
                                />
                            )}
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Location"
                            value={location}
                            onChangeText={setLocation}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            value={price}
                            onChangeText={setPrice}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Line-Up"
                            value={line_up}
                            onChangeText={setLineUp}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Web Link (for more info)"
                            value={web_link}
                            onChangeText={setWebLink}
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="SUBMIT" color="#FFCC00" onPress={submit} />
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default Createdata;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    title: {
        paddingVertical: 12,
        backgroundColor: 'white',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    form: {
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        marginVertical: 8,
        color: '#000',
    },
    label: {
        fontSize: 13,
        marginBottom: 4,
        color: '#f4f4f4',
    },
    dateButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Match TextInput background
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#777',
    },
    dateButtonText: {
        color: '#000',
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 16,
        marginBottom: 32,
    },
});
