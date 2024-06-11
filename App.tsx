import React from 'react';
import { SafeAreaView, useColorScheme, StatusBar, View , NativeModules} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import SmsScreen from './Screens/SmsScreen';



const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, {flex:1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            flex:1
    }}>
      <SmsScreen />
    </View>
      
    </SafeAreaView>
  );
};

export default App;
