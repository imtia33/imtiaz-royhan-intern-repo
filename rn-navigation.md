## Key Differences Between Stack, Tab, and Drawer Navigation

**Stack Navigation:**
- Presents screens in a stack (last-in, first-out)
- New screens are pushed onto the stack
- Back button pops the current screen
- Ideal for linear workflows

**Tab Navigation:**
- Bottom or top tabs for switching between main sections
- Each tab maintains its own stack navigator
- Persistent across app usage
- Great for apps with distinct sections

**Drawer Navigation:**
- Slides in from the side (usually left)
- Contains app-wide navigation links
- Often used for primary app navigation
- Can be combined with other navigators

## React Navigation Screen Transitions

React Navigation handles transitions through:
- **Animated transitions** between screens
- **Configurable transition styles** (slide, fade, modal)
- **Custom transition animations** using `transitionSpec`
- **Platform-specific behaviors** (iOS vs Android)
- **Gesture support** for swipe-back navigation

## Deep Linking Implementation
 <!-- On bare react native app -->
1. **Configure linking config:**
   const linking = {
     prefixes: ['myapp://'],
     config: {
       screens: {
         Home: 'home',
         Profile: 'profile/:id',
       }
     }
   };

2. **Wrap app with linking config:**
```
   <NavigationContainer linking={linking}>
     {/* screens */}
   </NavigationContainer>
```

3. **Handle incoming links:**
```js
   useEffect(() => {
     const unsubscribe = linking.addEventListener('url', ({ url }) => {
       // Handle URL
     });
     return unsubscribe;
   }, []);
   ```
Example usage:
 using React-Native-Top-Tabs:
 ```js
 import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, Text, View } from 'react-native';
import { icons } from "../../constants";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Redirect } from "expo-router";

import HomeScreen from '../../app/(tabs)/home';
import RequestsScreen from '../../app/(tabs)/requests';
import CreateScreen from '../../app/(tabs)/create';
import ProfileScreen from '../../app/(tabs)/profile';

const Tab = createMaterialTopTabNavigator();

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-1 pb-3">
      <Image
        source={icon}
        resizeMode="contain"
        style={{ tintColor: color }}
        className="w-6 h-6"
      />
      <Text className={`${focused ? "" : "font-psemibold text-white"} text-xs`}>
      {focused ? "" : name}
      </Text>

    </View>
  );
};

const TabNavigator = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/sign-in" />;
  return (
    <>
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'home':
              iconName = icons.home;
              break;
            case 'requests':
              iconName = icons.hand;
              break;
            case 'create':
              iconName = icons.plus;
              break;
            case 'profile':
              iconName = icons.profile;
              break;
            default:
              iconName = icons.home;
          }

          return <TabIcon icon={iconName} color={color} name={route.name} focused={focused} />;
        },
        tabBarActiveTintColor: '#ad1c40',
        tabBarInactiveTintColor: '#FFF',
        tabBarStyle: {
          position: 'absolute',
          bottom: 5,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: '#171717',
          height: 70,
          borderRadius: 10,
          marginBottom: 3,
          paddingTop: 8
        },
        tabBarShowLabel: false,
        swipeEnabled: true,
        headerShown: false,
        tabBarAndroidRipple: {
          borderless: true,
          color: '#ad1c40'
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#ad1c40',
          height: 3,
          width: 39,
          bottom: 0,
          marginHorizontal: '7%',
          borderRadius: 10
        }
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="requests" component={RequestsScreen} />
      <Tab.Screen name="create" component={CreateScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
    <Loader isLoading={loading} />
    <StatusBar style="dark" />
    </>
  );
};

export default TabNavigator;
 ```
