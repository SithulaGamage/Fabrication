import React, { useRef, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { StatusBar, TouchableOpacity, Animated, Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Index() {
  const navigation = useNavigation();
  
  // ===========================================================================
  // ================================== FONTS ==================================
  // ===========================================================================
  const [fontsLoaded] = useFonts({
    'Fascinate-Regular': require('../assets/fonts/Fascinate-Regular.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-BoldItalic': require('../assets/fonts/Montserrat-BoldItalic.ttf'),
  });

  // THIS IS WHERE THE THE RENDERED MORE HOOKS THAN PREVIOUS RENDER ISSUE CAME FROM
  // if (!fontsLoaded) {
  //   // Render a fallback UI while fonts are loading
  //   return (
  //     <View style={styles.container}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  // ===========================================================================
  // ============================ IMAGE DIMENSIONS =============================
  // ===========================================================================
  const screenHeight = Dimensions.get('window').height;

  const stripedBackgroundAspectRatio = 689 / 516;
  const stripedBackgroundHeight = screenHeight * 0.65;
  const stripedBackgroundWidth = stripedBackgroundHeight * stripedBackgroundAspectRatio;

  const zebraAspectRatio = 357 / 379.21;
  const zebraHeight = screenHeight * 0.45;
  const zebraWidth = zebraHeight * zebraAspectRatio;

  // ===========================================================================
  // ============================= ANIMATION LOGIC =============================
  // ===========================================================================
  const translateX = useRef(new Animated.Value(0)).current;
  const duration = 10000;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: -(stripedBackgroundWidth - Dimensions.get('window').width),
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop(); // Cleanup on unmount
  }, [stripedBackgroundWidth, translateX]);

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />

      <View style={styles.imageContainer}>
        {/* Striped background */}
        <Animated.Image
          source={require('../assets/images/StripedBackground.png')}
          style={[
            styles.stripedBackground,
            {
              width: stripedBackgroundWidth,
              height: stripedBackgroundHeight,
              transform: [{ translateX }],
            },
          ]}
        />

        {/* Zebra image */}
        <Image
          source={require('../assets/images/Zebra.png')}
          style={[styles.zebra, { width: zebraWidth, height: zebraHeight }]}
        />
      </View>

      {/* Curved Border */}
      <View style={styles.borderContainer}>
        <View style={styles.border}></View>
        <View style={styles.curvedSection}></View>
      </View>

      {/* Text */}
      <View style={styles.informationContainer}>
        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome to Fabrication!</Text>

        {/* Button */}
        <TouchableOpacity onPress={() => navigation.navigate('category')} style={[styles.button, styles.shadowProp]}>
          <Text style={styles.buttonText}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FAFAFA',
  },

  borderContainer: {
    alignItems: 'center',
    overflowX: 'hidden'
  },

  border: {
    position: 'absolute',
    top: '65%',
    backgroundColor: '#1E1E2D',
    width: '50%',
    height: 76,
    borderRadius: '50%',
    transform: [
      { scaleX: 3 },
      { translateY: '-56%' },
    ],
  },

  curvedSection: {
    position: 'absolute',
    top: '65%',
    backgroundColor: '#FAFAFA',
    width: '50%',
    height: 76,
    borderRadius: '50%',
    transform: [
      { scaleX: 3 },
      { translateY: '-50%' },
    ],
  },
  
  imageContainer: {
    width: '100%',
    height: '65%',
    overflow: 'hidden',
  },

  stripedBackground: {
    position: 'relative',
    resizeMode: 'cover',
    left: 0,
    top: 0,
  },

  zebra: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },

  informationContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: 0,
    alignItems: 'center',
    // backgroundColor: '#eee'
  },

  welcomeText: {
    color: '#1E1E2D',
    fontFamily: 'Fascinate-Regular',
    fontSize: 45,
    textTransform: 'uppercase',
    textAlign: 'center',
    // marginTop: 34,
  },

  button: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#AD343D',
    borderRadius: 50,
    marginTop: 42,

    width: 300,
    height: 50,
  },

  shadowProp: {
    shadowColor: '#1E1E2D',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  buttonText: {
    color: '#FAFAFA',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  }
});
