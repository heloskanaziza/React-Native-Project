import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Editdata = () => {
  const jsonUrl = 'http://192.168.1.7:3000/concerts';

  // State untuk form dan data
  const [concert_name, setConcertName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [line_up, setLineUp] = useState('');
  const [web_link, setWebLink] = useState('');
  const [selectedUser, setSelectedUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Fetch data dari server
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true); // Tampilkan indikator loading
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setDataUser(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false)); // Hapus indikator loading
  };

  const refreshPage = () => {
    setRefresh(true); // Tampilkan indikator refresh
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setDataUser(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setRefresh(false)); // Hapus indikator refresh
  };

  const selectItem = (item) => {
    setSelectedUser(item); // Simpan data item yang dipilih
    setConcertName(item.concert_name);
    setDate(item.date);
    setLocation(item.location);
    setPrice(item.price);
    setLineUp(item.line_up);
    setWebLink(item.web_link);
  };

  const submit = () => {
    const data = {
      concert_name,
      date,
      location,
      price,
      line_up,
      web_link,
    };

    fetch(`${jsonUrl}/${selectedUser.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        alert('Data berhasil diperbarui');
        // Reset form
        setConcertName('');
        setDate('');
        setLocation('');
        setPrice('');
        setLineUp('');
        setWebLink('');
        // Refresh data
        refreshPage();
      })
      .catch((error) => {
        console.error(error);
        alert('Gagal memperbarui data.');
      });
  };

  return (
    <ImageBackground
      source={require('./assets/images/concert_background.png')}
      style={styles.background}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={require('./assets/images/concert_background.png')}
          style={styles.background}
        >
          <View style={{ flex: 1 }}>
            {isLoading ? (
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Text style={styles.cardtitle}>Loading...</Text>
              </View>
            ) : (
              <>
                {/* Form Edit */}
                <View style={{ paddingBottom: 16 }}>
                  <Text style={styles.title}>Edit Concert Data</Text>
                  <View style={styles.form}>
                    <TextInput
                      style={styles.input}
                      placeholder="Concert Name"
                      value={concert_name}
                      onChangeText={setConcertName}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Date"
                      value={date}
                      onChangeText={setDate}
                    />
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
                      <Button title="SAVE CHANGES" color="#FFCC00" onPress={submit} />
                    </View>
                  </View>
                </View>

                {/* List Data */}
                <FlatList
                  data={dataUser}
                  keyExtractor={(item) => String(item.id)}
                  refreshing={refresh}
                  onRefresh={refreshPage}
                  style={{ flex: 1 }}
                  contentContainerStyle={{ paddingBottom: 16 }}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => selectItem(item)}>
                      <View style={styles.card}>
                        <View>
                          <Text style={[styles.cardtitle, { color: '#6b6969' }]}>
                            {item.concert_name}
                          </Text>
                          <Text style={{ color: '#6b6969' }}>Date: {item.date}</Text>
                          <Text style={{ color: '#6b6969' }}>Location: {item.location}</Text>
                          <Text style={{ color: '#6b6969' }}>Price: {item.price}</Text>
                          <Text style={{ color: '#6b6969' }}>Line-up: {item.line_up}</Text>
                          <Text style={{ color: '#6b6969' }}>Web Link: {item.web_link}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                          <FontAwesomeIcon icon={faPenToSquare} size={20} />
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </>
            )}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Editdata;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
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
  buttonContainer: {
    marginTop: 16,
  },
  cardtitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 7,
    elevation: 3,
  },
});
