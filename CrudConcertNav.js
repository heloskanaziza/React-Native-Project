import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faPlus, faMusic, faUserPen, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Homedata from './Homedata';
import Createdata from './Createdata';
import DataMahasiswa from './Listdata';
import EditData from './Editdata';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

// Komponen Layar
function HomeScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Homedata />
    </SafeAreaView>
  );
}

function CreateScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Createdata />
    </SafeAreaView>
  );
}

function ListScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <DataMahasiswa />
    </SafeAreaView>
  );
}

function EditScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <EditData />
    </SafeAreaView>
  );
}

function MapScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <WebView source={{ uri: 'https://ionic-framework-with-leaflet-js.vercel.app/' }} />
    </SafeAreaView>
  );
}

// Inisialisasi Tab Navigator
const Tab = createBottomTabNavigator();

// Fungsi Utama
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#FFF',
          tabBarInactiveTintColor: '#FFF',
          tabBarIcon: ({ color, focused }) => {
            let icon, label;
            if (route.name === 'Home') icon = faHouse;
            else if (route.name === 'Add') icon = faPlus;
            else if (route.name === 'Concerts') icon = faMusic;
            else if (route.name === 'Edit') icon = faUserPen;
            else if (route.name === 'Map') icon = faLocationDot;

            // Ikon dan Lingkaran Aktif
            return (
              <View style={styles.iconContainer}>
                {focused && <View style={styles.activeCircle} />}
                <FontAwesomeIcon icon={icon} size={20} color={focused ? '#065379' : '#FFF'} />
              </View>
            );
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add" component={CreateScreen} />
        <Tab.Screen name="Concerts" component={ListScreen} />
        <Tab.Screen name="Edit" component={EditScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// StyleSheet
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 10, // Mengurangi jarak dari bawah layar
    left: 20,
    right: 20,
    height: 60, // Kurangi tinggi tab bar jika terlalu besar
    borderRadius: 15,
    backgroundColor: '#065379',
    elevation: 10,
    borderTopWidth: 1,
    borderTopColor: '#11161a',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  activeCircle: {
    backgroundColor: '#FFC300',
    position: 'absolute',
    bottom: 0, // Tetap di bawah ikon
    width: 50,
    height: 50,
    borderRadius: 25,
    zIndex: -1, // Membuat lingkaran berada di belakang ikon
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#11161a',
    paddingBottom: 80, // Memberikan ruang di bagian bawah layar untuk tab bar
  },
});
