## Differences between Animated and react-native-reanimated

**Animated API:**
- Runs on JavaScript thread
- Simple animations
- Can drop frames

**react-native-reanimated:**
- Runs on UI thread
- Smooth 60fps performance
- Better for complex animations

## How react-native-gesture-handler improves performance

- Handles gestures on native thread
- No bridge communication delays
- Smooth gesture recognition
- Reduces JS thread load

## When to use gestures vs buttons

Use gestures when:
- Natural interaction (swipe, drag)
- Space saving
- Content manipulation
- Better UX than taps

## Why InteractionManager.runAfterInteractions is needed

- Lets animations finish first
- Prevents UI blocking
- Maintains smooth performance
- Defers heavy work after interactions

 ## Example Test Codes:
 1. Animated api:
```js
const MenuScreen = () => {

  const headerHeight = useRef(new Animated.Value(250)).current

  useEffect(() => {
    Animated.timing(headerHeight, {
      toValue: showFullImage ? height * 0.7 : 250,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [showFullImage])

  return(
     <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
          },
        ]}
      >
      <TouchableOpacity activeOpacity={0.9} onPress={() => setShowFullImage(!showFullImage)}>
      <ImageBackground 
            source={{ uri: restaurantData?.image }} 
            style={styles.headerImage} 
            resizeMode="cover"
          >
        
          </ImageBackground>
          </TouchableOpacity>
      </Animated.View>
  )

}
```
 This is a simple example I created for my old app to expand an image on touch.