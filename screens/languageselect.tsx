import React, {useEffect, useState} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageSelect = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const saveLanguagePreference = async () => {
    try {
      await AsyncStorage.setItem('preferredLanguage', selectedLanguage);
      // Navigate to the main screen or wherever you want to go after language selection
      // NativeModules.DevSettings.reload();
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  const checkLanguagePreference = async () => {
    try {
      const language = await AsyncStorage.getItem('preferredLanguage');
      if (language !== null) {
        setSelectedLanguage(language);
      }
    } catch (error) {
      console.error(
        'Error retrieving language preference: on homescreen',
        error,
      );
    }
  };

  useEffect(() => {
    checkLanguagePreference();
  }, []);

  return (
    <View style={{paddingHorizontal: 10}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: 'black',
          fontWeight: 'bold',
          paddingVertical: 8,
        }}>
        Please select your preferred language:
      </Text>

      <View style={styles.radioGroup}>
        <View style={styles.radioButton}>
          <RadioButton.Android
            value="English"
            status={selectedLanguage === 'English' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedLanguage('English')}
            color="#007BFF"
          />
          <Text style={styles.radioLabel}>English</Text>
        </View>

        <View style={styles.radioButton}>
          <RadioButton.Android
            value="Hindi"
            status={selectedLanguage === 'Hindi' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedLanguage('Hindi')}
            color="#007BFF"
          />
          <Text style={styles.radioLabel}>Hindi</Text>
        </View>
      </View>

      <Button title="Save" onPress={saveLanguagePreference} />
    </View>
  );
};

export default LanguageSelect;

const styles = StyleSheet.create({
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
});
