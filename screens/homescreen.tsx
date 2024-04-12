import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import YouTubeIframe from 'react-native-youtube-iframe';

const Homescreen = ({navigation}) => {
  const [userLanguage, setUserLanguage] = useState('');

  const checkLanguagePreference = async navigation => {
    try {
      const language = await AsyncStorage.getItem('preferredLanguage');
      if (language !== null) {
        setUserLanguage(language);
        console.log(language);
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

  useEffect(() => {
    checkLanguagePreference(navigation);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkLanguagePreference(navigation);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView
      style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      <View
        style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            height: 150,
          }}>
          {/* <Text style={styles.cardtitle}>Hospitals</Text> */}
          <View style={styles.cardView}>
            <View
              style={{
                flex: 2,
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                backgroundColor: 'white',
              }}>
              {userLanguage === 'English' ? (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    color: 'black',
                    fontWeight: 'bold',
                    paddingVertical: 8,
                  }}>
                  Enlisted Hospitals
                </Text>
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    color: 'black',
                    fontWeight: 'bold',
                    paddingVertical: 8,
                  }}>
                  सूचीबद्ध अस्पताल
                </Text>
              )}
              <TouchableOpacity
                style={styles.buttonStyles}
                onPress={() => navigation.navigate('hospitals')}>
                {userLanguage === 'English' ? (
                  <Text style={{color: 'white'}}>View More</Text>
                ) : (
                  <Text style={{color: 'white'}}>आगे देखें</Text>
                )}
              </TouchableOpacity>
            </View>
            <Image
              source={require('../assets/images/ayushmaanimage.png')}
              style={styles.image}
            />
          </View>
        </View>
      </View>
      <View style={styles.cardView}>
        <View
          style={{
            flex: 2,
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            backgroundColor: 'white',
          }}>
          {userLanguage === 'English' ? (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                color: 'black',
                fontWeight: 'bold',
                paddingVertical: 8,
              }}>
              Change Preferred Language
            </Text>
          ) : (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                color: 'black',
                fontWeight: 'bold',
                paddingVertical: 8,
              }}>
              पसंदीदा भाषा बदलें
            </Text>
          )}

          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={() => navigation.navigate('LanguageSelect')}>
            {userLanguage === 'English' ? (
              <Text style={{color: 'white'}}>Click Here</Text>
            ) : (
              <Text style={{color: 'white'}}>यहाँ क्लिक करें</Text>
            )}
          </TouchableOpacity>
        </View>
        <Image
          source={require('../assets/images/language.png')}
          style={styles.image}
        />
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'column',
          marginVertical: 10,
        }}>
        {userLanguage === 'English' ? (
          <Text style={styles.cardtitle}>Helpline Numbers</Text>
        ) : (
          <Text style={styles.cardtitle}>हेल्पलाइन नंबर</Text>
        )}

        <View
          style={{
            margin: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('tel:14555');
              }}
              style={styles.helplineCard}>
              <Image
                source={require('../assets/images/download.png')}
                style={styles.image}
              />
              <Text style={{color: 'black'}}>14555</Text>
              {userLanguage === 'English' ? (
                <Text style={styles.helplineText}>Central Helpline</Text>
              ) : (
                <Text style={styles.helplineText}>केंद्रीय हेल्पलाइन</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL('tel:180018004444');
              }}
              style={styles.helplineCard}>
              <Image
                source={require('../assets/images/child.png')}
                style={styles.image}
              />
              <Text style={{color: 'black'}}>180018004444</Text>
              {userLanguage === 'English' ? (
                <Text style={styles.helplineText}>State Helpline</Text>
              ) : (
                <Text style={styles.helplineText}>राज्य हेल्पलाइन</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  'https://www.instagram.com/ayushmanupofficial/',
                );
              }}
              style={styles.helplineCard}>
              <Image
                source={require('../assets/images/ig_icon.jpeg')}
                style={styles.image}
              />
              {userLanguage === 'English' ? (
                <Text style={styles.helplineText}>AyushMaan Bharat</Text>
              ) : (
                <Text style={styles.helplineText}>आयुष्मान भारत</Text>
              )}
              {userLanguage === 'English' ? (
                <Text style={styles.helplineText}>Instagram Account</Text>
              ) : (
                <Text style={styles.helplineText}>इंस्टाग्राम अकाउंट</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.facebook.com/ayushmanupofficial');
              }}
              style={styles.helplineCard}>
              <Image
                source={require('../assets/images/fb_icon.png')}
                style={styles.image}
              />
              {userLanguage === 'English' ? (
                <Text style={styles.helplineText}>AyushMaan Bharat</Text>
              ) : (
                <Text style={styles.helplineText}>आयुष्मान भारत</Text>
              )}
              {userLanguage === 'English' ? (
                <Text style={styles.helplineText}>Facebook Account</Text>
              ) : (
                <Text style={styles.helplineText}>फेसबुक अकाउंट</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.ayushmanup.in/');
              }}
              style={styles.helplineCard}>
              <Image
                source={require('../assets/images/ayushmaanimage.png')}
                style={styles.image}
              />
              {userLanguage === 'English' ? (
                <Text style={styles.helplineText}>AyushMaan Bharat</Text>
              ) : (
                <Text style={styles.helplineText}>आयुष्मान भारत</Text>
              )}
              {userLanguage === 'English' ? (
                <Text style={styles.helplineText}>Website</Text>
              ) : (
                <Text style={styles.helplineText}> वेबसाइट</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.youtube.com/@ayushmanupofficial');
              }}
              style={styles.helplineCard}>
              <Image
                source={require('../assets/images/yt_icon.png')}
                style={styles.image}
              />
              {userLanguage === 'English' ? (
                <Text style={styles.helplineText}>AyushMaan Bharat</Text>
              ) : (
                <Text style={styles.helplineText}>आयुष्मान भारत</Text>
              )}
              {userLanguage === 'English' ? (
                <Text style={styles.helplineText}>YouTube Channel</Text>
              ) : (
                <Text style={styles.helplineText}> यूट्यूब चैनल </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Homescreen;

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
  image: {
    height: 100,
    width: '50%',
    resizeMode: 'center',
  },

  cardtitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
    marginLeft: 12,
  },

  buttonStyles: {
    width: 150,
    marginHorizontal: 'auto',
    borderRadius: 20,
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helplineCard: {
    margin: 2,
    padding: 2,
    width: '45%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
  },
  helplineText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'black',
  },
});
