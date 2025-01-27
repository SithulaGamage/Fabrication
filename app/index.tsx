import React, { useEffect, useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import { Animated, StyleSheet, Text, View, Dimensions } from 'react-native';

export default function Index() {
  // ===========================================================================
  // ================================== FONTS ==================================
  // ===========================================================================
  const [fontsLoaded] = useFonts({
    'Fascinate-Regular': require('../assets/fonts/Fascinate-Regular.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-BoldItalic': require('../assets/fonts/Montserrat-BoldItalic.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // ===========================================================================
  // ====================== STRIPED BACKGROUND ANIMATION =======================
  // ===========================================================================
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);
  const screenHeight = Dimensions.get('window').height;
  const imageAspectRatio = 689 / 516;

  const stripedBackgroundHeight = screenHeight * 0.5; // 50% of screen height
  const stripedBackgroundWidth = stripedBackgroundHeight * imageAspectRatio; // Maintain aspect ratio

  useEffect(() => {
    const scrollDistance = containerWidth - stripedBackgroundWidth;
    const durationTime = 10000;

    Animated.loop(
      Animated.sequence([
        Animated.timing(scrollAnim, {
          toValue: scrollDistance,
          duration: durationTime,
          useNativeDriver: true,
        }),
        Animated.timing(scrollAnim, {
          toValue: 0,
          duration: durationTime,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scrollAnim, containerWidth, stripedBackgroundWidth]);

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
      }}
    >
      <View style={[styles.imageContainer, { height: stripedBackgroundHeight }]}>
        <Animated.View
          style={{
            flexDirection: 'row',
            transform: [{ translateX: scrollAnim }],
          }}
        >
          <Animated.Image
            source={require('../assets/images/StripedBackground.png')}
            style={[
              styles.stripedBackground,
              { width: stripedBackgroundWidth, height: stripedBackgroundHeight },
            ]}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    overflow: 'hidden',
    backgroundColor: '#fafafa',
  },

  imageContainer: {
    backgroundColor: '#000',
  },

  stripedBackground: {
    resizeMode: 'cover',
  },
});
