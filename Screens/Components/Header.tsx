import React from 'react';
import {View, Text, Button, StyleSheet, useColorScheme} from 'react-native';
import type { PropsWithChildren } from 'react';
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';



type Props = {
  getSms: ()=> void;
  count: number;
};

const Header = ({getSms, count}:Props) => {
    const isDarkMode = useColorScheme() === 'dark';
    
      const TextColor = {
        color: isDarkMode ? Colors.lighter : Colors.dark,
      };
    return (
        <View style={styles.header}>
        <Text style={[styles.titleText, [TextColor]]}>
           {count} SMS
        </Text>
        <Button
          title="GetSMS"
          color="#841584"
          onPress={getSms}
        />
    </View>
  );
};
const styles = StyleSheet.create({
    header: {
      paddingVertical: 10,
      paddingHorizontal: 24,
      flexDirection:'row',
      justifyContent:'space-between',
      borderBottomColor: '#444',
      borderBottomWidth: 1
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        width:200,
    },
})
export default Header;