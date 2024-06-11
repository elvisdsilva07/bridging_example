import React from 'react';
import {NativeModules, Button, PermissionsAndroid} from 'react-native';
import { readSms } from '../SmsModule';

const {SmsReaderModule} = NativeModules;

const NewModuleButton = () => {
  const onPress = async () => {
    readSms()
  };
  return (
    <Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />
  );
};

export default NewModuleButton;