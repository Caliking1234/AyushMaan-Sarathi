import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const SpecCard = ({cardData, onPress, userLanguage, index}) => {
  const images = {
    image1: require('../assets/images/burnmanagmnet.jpg'),
    image2: require('../assets/images/cardiovascular.jpg'),
    image3: require('../assets/images/cardio.png'),
    image4: require('../assets/images/emergencyroompackage.webp'),
    image5: require('../assets/images/burnmanagmnet.jpg'),
    image6: require('../assets/images/generalSurgery.png'),
    image7: require('../assets/images/infectious1.png'),
    image8: require('../assets/images/scan.jpg'),
    image9: require('../assets/images/medicalOncology.png'),
    image10: require('../assets/images/mentaldisorderpackage.jpg'),
    image11: require('../assets/images/noenatal.jpg'),
    image12: require('../assets/images/neurosurgery.jpg'),
    image13: require('../assets/images/gynecology.webp'),
    image14: require('../assets/images/opthalmology.png'),
    image15: require('../assets/images/dental.png'),
    image16: require('../assets/images/tissueimplant.png'),
    image17: require('../assets/images/ortho.png'),
    image18: require('../assets/images/ent.jpg'),
    image19: require('../assets/images/kidcancer.webp'),
    image20: require('../assets/images/kidsurgery.png'),
    image21: require('../assets/images/plasticsurgery.png'),
    image22: require('../assets/images/polytrauma.jpg'),
    image23: require('../assets/images/radiation.png'),
    image24: require('../assets/images/surgical.png'),
    image25: require('../assets/images/urology.png'),
  };
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(cardData['Burns'], cardData['Burns1'])}>
      <Image source={images['image' + `${index + 1}`]} style={styles.image} />
      <View style={styles.cardName}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          {userLanguage === 'English' ? cardData['Burns'] : cardData['Burns1']}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%', // Adjust as needed
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 150, // Adjust as needed
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardName: {
    width: '100%',
    padding: 10,
    backgroundColor: 'grey',
  },
});

export default SpecCard;
