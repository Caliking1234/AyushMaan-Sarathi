import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';
import hospitalData from '../data/data';
import ListItems from '../components/listitem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/loader';
import SpecCard from '../components/SpecCard';

const bm = require('../data/spec.json');
const hospitaldata = require('../data/finalData.json');
const DistrictList = require('../data/uniquedistricts.json');
const HindiDistrictList = require('../data/hindidistricts.json');

const HospitalScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(hospitalData);
  const [selectedType, setSelectedType] = useState('both');
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [selectedHSpeciality, setSelectedHSpeciality] = useState('');

  const [selectedCity, setSelectedCity] = useState('all');
  const [userLanguage, setUserLanguage] = useState('');
  const [load, setload] = useState(true);

  const checkLanguagePreference = async navigation => {
    try {
      const language = await AsyncStorage.getItem('preferredLanguage');
      if (language !== null) {
        setUserLanguage(language);
      } else {
        // Navigate to the language selection screen if no language preference is found
        navigation.navigate('LanguageSelect');
      }
    } catch (error) {
      console.error(
        'Error retrieving language preference: on homescreen',
        error,
      );
    }
  };

  const renderItem = ({item}) => (
    <ListItems item={item} userLanguage={userLanguage} />
  );

  useEffect(() => {
    const filteredResults = hospitaldata.filter(
      item =>
        item['Hospital Name']
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) &&
        (selectedSpeciality !== ''
          ? item['Compiled Specialities ']
              .toLowerCase()
              .includes(selectedSpeciality.toLowerCase())
          : true) &&
        (selectedType === 'both'
          ? true
          : selectedType === 'government'
          ? item['Hospital Type'] === 'GOI' ||
            item['Hospital Type'] === 'Public'
          : item['Hospital Type'] != 'GOI' &&
            item['Hospital Type'] != 'Public') &&
        (selectedCity !== 'all'
          ? item['District'].toLowerCase().includes(selectedCity.toLowerCase())
          : true),
    );
    setFilteredData(filteredResults);
  }, [selectedType, searchQuery, selectedSpeciality, selectedCity]);

  console.log(filteredData.length);

  useEffect(() => {
    setTimeout(() => [setload(false)], 2000);
    checkLanguagePreference(navigation);
  }, []);

  const handleCardPress = (spec1, spec2) => {
    setSelectedSpeciality(spec1);
    setSelectedHSpeciality(spec2);
  };

  const pressHandler = () => {
    setSelectedSpeciality('');
    setSelectedHSpeciality('');
  };
  return (
    <>
      {load === true ? (
        <Loader />
      ) : selectedSpeciality === '' ? (
        <>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              display: 'flex',
              marginVertical: 5,
              justifyContent: 'center',
            }}>
            {userLanguage === 'English' ? (
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                Select Speciality
              </Text>
            ) : (
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                विशेषता का चयन करें
              </Text>
            )}
          </View>
          <ScrollView contentContainerStyle={styles.containerAlpha}>
            <View style={styles.gridContainer}>
              {bm.map((cardData, index) => (
                <SpecCard
                  key={index}
                  cardData={cardData}
                  onPress={handleCardPress}
                  userLanguage={userLanguage}
                  index={index}
                />
              ))}
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={styles.container}>
          <View style={{width: '100%'}}>
            <TextInput
              style={{
                width: '100%',
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 10,
                paddingLeft: 8,
                color: 'black',
              }}
              placeholder=" Enter Hospital Name"
              placeholderTextColor="gray"
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
          </View>
          <View style={styles.containerr}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                display: 'flex',
                marginVertical: 5,
                justifyContent: 'center',
              }}>
              {userLanguage === 'English' ? (
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                  Selected Speciality
                </Text>
              ) : (
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                  चयनित विशेषता
                </Text>
              )}
            </View>
            <View
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                margin: 10,
                gap: 5,
              }}>
              <TextInput
                editable={false}
                selectTextOnFocus={false}
                style={{
                  width: '70%',
                  height: 40,
                  color: 'black',
                  borderColor: 'black',
                  borderWidth: 2,
                  borderRadius: 10,
                }}
                placeholderTextColor="gray"
                value={
                  userLanguage === 'English'
                    ? selectedSpeciality
                    : selectedHSpeciality
                }
              />
              <TouchableOpacity
                style={styles.buttonStyles}
                onPress={pressHandler}>
                {userLanguage === 'English' ? (
                  <Text style={{color: 'white'}}>Change</Text>
                ) : (
                  <Text style={{color: 'white'}}>विशेषता बदले</Text>
                )}
              </TouchableOpacity>
              {/* <Text style={styles.radioLabel}>Speciality:</Text> */}
              {/* <Picker
                style={{width: '100%', backgroundColor: 'white'}}
                selectedValue={selectedSpeciality}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedSpeciality(itemValue)
                }>
                {userLanguage === 'English' ? (
                  <Picker.Item
                    label="All Specialities"
                    value="all"
                    color="black"
                  />
                ) : (
                  <Picker.Item
                    label="सभी विशेषताएँ"
                    value="all"
                    color="black"
                  />
                )}
                {bm.map((BM, Idx) => (
                  <Picker.Item
                    key={Idx}
                    label={
                      userLanguage === 'English' ? BM['Burns'] : BM['Burns1']
                    }
                    value={BM['Burns']}
                    color="black"
                  />
                ))}
              </Picker> */}
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'flex-start',
                display: 'flex',
                justifyContent: 'flex-start',
              }}>
              {userLanguage === 'English' ? (
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                  Select District
                </Text>
              ) : (
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                  जिला का चयन करें
                </Text>
              )}
            </View>
            <View
              style={{
                ...styles.row,
                margin: 10,
                borderColor: 'black',
                borderWidth: 2,
                borderRadius: 10,
              }}>
              {/* <Text style={styles.radioLabel}>Speciality:</Text> */}
              <Picker
                style={{width: '100%', backgroundColor: 'white'}}
                selectedValue={selectedCity}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCity(itemValue)
                }>
                {userLanguage === 'English' ? (
                  <Picker.Item label="All Districs" value="all" color="black" />
                ) : (
                  <Picker.Item label="सभी जिले" value="all" color="black" />
                )}

                {DistrictList.map((district, Idx) => (
                  <Picker.Item
                    key={Idx}
                    label={
                      userLanguage === 'English'
                        ? district
                        : HindiDistrictList[Idx]
                    }
                    value={district}
                    color="black"
                  />
                ))}
                {/* <Picker.Item label="Ghaziabad" value="Ghaziabad" color="black" />
            <Picker.Item label="Mumbai" value="Mumbai" color="black" />
            <Picker.Item label="Kolkata" value="Kolkata" color="black" />
            <Picker.Item label="Hyderabad" value="Hyderabad" color="black" />
            <Picker.Item label="Bengaluru" value="Bengaluru" color="black" />
            <Picker.Item label="Jaipur" value="Jaipur" color="black" />
            <Picker.Item label="Lucknow" value="Lucknow" color="black" />
            <Picker.Item label="Ahmedabad" value="Ahmedabad" color="black" />
            <Picker.Item label="Delhi" value="Delhi" color="black" />
            <Picker.Item label="Chennai" value="Chennai" color="black" /> */}
              </Picker>
            </View>
          </View>
          <View style={styles.radioGroup}>
            <View style={styles.radioButton}>
              <RadioButton.Android
                value="government"
                status={selectedType === 'government' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedType('government')}
                color="#007BFF"
              />
              <Text style={styles.radioLabel}>Government</Text>
            </View>

            <View style={styles.radioButton}>
              <RadioButton.Android
                value="private"
                status={selectedType === 'private' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedType('private')}
                color="#007BFF"
              />
              <Text style={styles.radioLabel}>Private</Text>
            </View>

            <View style={styles.radioButton}>
              <RadioButton.Android
                value="both"
                status={selectedType === 'both' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedType('both')}
                color="#007BFF"
              />
              <Text style={styles.radioLabel}>Both</Text>
            </View>
          </View>
          <View style={styles.listcontainer}>
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={item => item['Sno']}
              windowSize={5} // Adjust as needed
              initialNumToRender={4} // Adjust as needed
              getItemLayout={(data, index) => ({
                length: 50, // Specify the item height
                offset: 50 * index,
                index,
              })}
              virtualized={true}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    width: '30%',
    height: 40,
    marginHorizontal: 'auto',
    marginVertical: 'autos',
    borderRadius: 20,
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
  },
  listcontainer: {
    flex: 1,
    width: '100%',
  },
  button: {
    width: 150,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerr: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioGroup: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 10,
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
    fontSize: 12,
    color: '#333',
  },
  containerAlpha: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default HospitalScreen;
