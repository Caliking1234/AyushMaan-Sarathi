import React, {useRef, useEffect} from 'react';
import {
  Animated,
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';

const Loader = () => {
  const heightValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(100)).current;
  const opacityValue1 = useRef(new Animated.Value(0)).current;

  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  const startAnimation = () => {
    // Animate height
    // Animated.timing(heightValue, {
    //   toValue: windowHeight,
    //   duration: 1000,
    //   useNativeDriver: false,
    // }).start();

    // Animate opacity
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacityValue1, {
      toValue: 0.3,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Animate scale
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <Animated.View style={[styles.container, {height: windowHeight}]}>
      <Animated.Image
        source={require('../assets/images/background.jpg')}
        style={[
          styles.backgroundImage,
          {opacity: opacityValue1, height: windowHeight, width: windowWidth},
        ]}
      />
      <Animated.Image
        source={require('../assets/images/national-health-authority-removebg-preview.png')}
        style={[
          styles.image,
          {opacity: opacityValue, transform: [{scale: scaleValue}]},
        ]}
      />
      <Animated.Image
        source={require('../assets/images/ayushmaanimage.png')}
        style={[
          styles.image,
          {opacity: opacityValue, transform: [{scale: scaleValue}]},
        ]}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
        }}>
        <Animated.Image
          source={require('../assets/images/lastlogo.png')}
          style={[
            styles.image,
            {opacity: opacityValue, transform: [{scale: scaleValue}]},
          ]}
        />
        <Animated.Image
          source={require('../assets/images/sachislogo-removebg-preview.png')}
          style={[
            styles.image,
            {opacity: opacityValue, transform: [{scale: scaleValue}]},
          ]}
        />
      </View>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={{color: 'black'}}>Getting Started...</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    // resizeMode: 'cover',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginBottom: 20,
  },
});

export default Loader;
