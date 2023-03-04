import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UserProvicer, { UserContext } from './src/Context/UserContext';

import Routes from './src/Routes/Routes';

export default function App() {
  return (
    <NavigationContainer>
      <UserProvicer>

          <StatusBar translucent={false} style="light"/>
          <Routes/>
      </UserProvicer>
    </NavigationContainer>
  );
}

