import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const Abhaform = () => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{...styles.image, width: 30}}
          source={require('../assets/images/create1.png')}
        />
        <Text style={styles.cardtitle}>
          Create your Ayushman Bharat Health Account(ABHA)
        </Text>
      </View>
      <View style={styles.cardView}>
        <Image
          style={{...styles.image, width: 50}}
          source={require('../assets/images/aadhaar.webp')}
        />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.cardtitle}>Enter myAadhaar ID</Text>
          <Text style={{color: 'gray', fontSize: 10}}>
            AAdhaar Verification allows you to start usuing your ABHA instantly
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Abhaform;

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: 'white',
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  cardtitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
    marginLeft: 12,
  },
  image: {
    height: 100,
    width: '50%',
    resizeMode: 'center',
  },
});
