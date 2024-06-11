import React from 'react';
import {View, Text, Button, StyleSheet, useColorScheme} from 'react-native';
import type { PropsWithChildren } from 'react';
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';



type Props = PropsWithChildren<{
    title: string;
}>;

const ListItem = ({children, title}:Props) => {
    const isDarkMode = useColorScheme() === 'dark';
    
      const TextColor = {
        color: isDarkMode ? Colors.lighter : Colors.dark,
      };
    return (
        <View style={styles.sectionContainer}>
            <Text
            style={[
                styles.sectionTitle,
                {
                color: isDarkMode ? Colors.white : Colors.black,
                },
            ]}>
            {title}
            </Text>
            <Text
            style={[
                styles.sectionDescription,
                {
                color: isDarkMode ? Colors.light : Colors.dark,
                },
            ]}>
            {children}
            </Text>
        </View>
  );
};
const styles = StyleSheet.create({
sectionContainer: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderBottomWidth:1,
    borderBottomColor:'#eee'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 14,
    fontWeight: '400',
  },
})
export default ListItem;
