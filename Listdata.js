import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Listdata = () => {
  const jsonUrl = 'http://192.168.1.7:3000/concerts';

  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedConcert, setSelectedConcert] = useState('');
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();

  const fetchData = () => {
    setLoading(true);
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataUser(json);
        setFilteredData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const refreshPage = () => {
    setRefresh(true);
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataUser(json);
        setFilteredData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setRefresh(false));
  };

  const handleConcertSelection = (concertName) => {
    setSelectedConcert(concertName);
    if (concertName === '') {
      setFilteredData(dataUser);
    } else {
      const filtered = dataUser.filter((item) => item.concert_name === concertName);
      setFilteredData(filtered);
    }
  };

  const deleteData = (id) => {
    fetch(`${jsonUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        Alert.alert('Sukses', 'Data telah terhapus');
        refreshPage();
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Gagal', 'Terjadi kesalahan saat menghapus data');
      });
  };

  useEffect(() => {
    fetchData();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ImageBackground
      source={require('./assets/images/concert_background.png')}
      style={styles.background}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.scrollContainer}
            data={filteredData}
            onRefresh={refreshPage}
            refreshing={refresh}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
              <>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Concert Listings</Text>
                </View>

                <View style={styles.dropdownContainer}>
                  <Text style={styles.dropdownLabel}>Select Concert</Text>
                  <Picker
                    selectedValue={selectedConcert}
                    onValueChange={(itemValue) => handleConcertSelection(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="All Concerts" value="" />
                    {dataUser.map((item) => (
                      <Picker.Item key={item.id} label={item.concert_name} value={item.concert_name} />
                    ))}
                  </Picker>
                </View>
              </>
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.title}>{item.concert_name}</Text>

                {/* Tampilkan informasi dengan jarak yang konsisten */}
                <View style={styles.infoContainer}>
                  <Text style={styles.infoLabel}>Date</Text>
                  <Text style={styles.info}>{item.date}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoLabel}>Location</Text>
                  <Text style={styles.info}>{item.location}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoLabel}>Price</Text>
                  <Text style={styles.info}>{item.price}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoLabel}>Line-Up</Text>
                  <Text style={styles.info}>{item.line_up}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoLabel}>Link</Text>
                  <Text style={styles.info}>{item.web_link}</Text>
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() =>
                    Alert.alert('Konfirmasi', 'Yakin ingin menghapus data ini?', [
                      { text: 'Tidak', style: 'cancel' },
                      { text: 'Ya', onPress: () => deleteData(item.id) },
                    ])
                  }
                >
                  <Text style={styles.deleteButtonText}>HAPUS</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Listdata;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  header: {
    paddingVertical: 12,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  headerText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dropdownContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  dropdownLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ebebeb',
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    backgroundColor: '#7cafc8',
    marginVertical: 10,
  },
  pickerItem: {
    color: '#ffffff',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 7,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  infoLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
    width: 90, // Menjaga jarak antara label dan isi
  },
  info: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#a20a0a',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
