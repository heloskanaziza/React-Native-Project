import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './App';
import Mahasiswa from './Mahasiswa';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUserGraduate, faUser } from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';

function HomeScreen() {
  return <Profil />;
}

function DataMahasiswaScreen() {
  return <Mahasiswa />;
}

function WebScreen() {
  return (
    <WebView source={{ uri: 'https://github.com/heloskanaziza' }} />
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Profil"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUser} size={32} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Data Mahasiswa"
          component={DataMahasiswaScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUserGraduate} size={32} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="GitHub"
          component={WebScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faGithub} size={32} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
