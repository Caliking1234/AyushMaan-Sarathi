import React from 'react';
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types';

interface CradProps {
  cardTitle: string;
  cardDescp: string;
  imgSrc: string;
  pageName: string;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  buttonTitle: string;
}

const Card: React.FC<CradProps> = ({
  cardTitle,
  cardDescp,
  imgSrc,
  pageName,
  navigation,
  buttonTitle,
}) => {
  return (
    <View
      style={{width: '100%', flexDirection: 'column', flex: 1, height: 'auto'}}>
      <Text style={styles.cardtitle}>{cardTitle}</Text>
      <View style={styles.cardView}>
        <View
          style={{
            flexDirection: 'column',
            width: '50%',
            flex: 1,
            height: 200,
          }}>
          <Text>{cardDescp}</Text>
          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={() => navigation.navigate('Homescreen', {pageName})}>
            <Text style={{color: 'white'}}>{buttonTitle}</Text>
          </TouchableOpacity>
        </View>
        <ImageBackground source={{uri: imgSrc}} style={styles.image} />
      </View>
    </View>
  );
};

export default Card;

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
    height: 'auto',
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    height: 150,
    resizeMode: 'contain',
  },

  cardtitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
    marginLeft: 12,
  },

  buttonStyles: {
    borderRadius: 20,
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
