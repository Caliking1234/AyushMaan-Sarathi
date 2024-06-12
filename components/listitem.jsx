import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// interface ListItem {
//   id: string;
//   name: string;
//   address: string;
//   speciality: string;
//   phone: string;
//   type: string;
//   longitude: number;
//   latitude: number;
// }

// interface ListItemProps {
//   item: ListItem;
// }

const ListItems = ({item, userLanguage}) => {
  // const [userLanguage, setUserLanguage] = useState('');

  const openGoogleMaps = (latitude, longitude) => {
    const label = 'Target Location'; // Replace with a label for the location

    const url = `https://www.google.com/maps?q=${latitude},${longitude}&label=${label}`;

    Linking.openURL(url);
  };

  // const checkLanguagePreference = async s => {
  //   try {
  //     const language = await AsyncStorage.getItem('preferredLanguage');
  //     setUserLanguage(language);

  //   } catch (error) {
  //     console.error(
  //       'Error retrieving language preference: on homescreen',
  //       error,
  //     );
  //   }
  // };

  // useEffect(() => {
  //   checkLanguagePreference();
  // }, []);
  // console.log(userLanguage);
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        openGoogleMaps(item['Latitude'], item['Longitude']);
      }}>
      <Text style={styles.itemname}>
        {userLanguage === 'English'
          ? item['Hospital Name']
          : item['Hospital HName']}
      </Text>
      <Text style={styles.itemaddress}>
        {userLanguage === 'English' ? item['District'] : item['HDistrict']}
      </Text>
      {/* <Text style={styles.itemspecs}>
        {userLanguage === 'English'
          ? item['Compiled Specialities ']
          : item['Hspeciality']}
      </Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemname: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'uppercase',
  },
  itemspecs: {
    color: 'gray',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  itemaddress: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default ListItems;
