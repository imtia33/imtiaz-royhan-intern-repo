**Why use native modules?**
Sometimes React Native can’t access certain system features like notifications, sensors, or background tasks. Native modules let us write code in Java/Kotlin (Android) or Swift/Objective-C (iOS) and use it inside React Native.

**How does React Native talk to native code?**
React Native uses a “bridge” that connects JavaScript with native code. Data goes back and forth through this bridge. Newer versions use JSI, which is faster and doesn’t need the old bridge system.

**What are the challenges?**
It’s harder to maintain because you need to handle both Android and iOS code. Debugging is more complex, and version updates can sometimes break the bridge.



## React Native Firebase

**What it is:**
[`@react-native-firebase`](https://rnfirebase.io/) is a collection of modules that give React Native apps access to Firebase’s native SDKs — for features like authentication, push notifications, analytics, Firestore, and cloud messaging.



I explored `@react-native-firebase`, which provides a JavaScript interface to Firebase’s native iOS and Android SDKs. I found it interesting how each feature module (like `auth`, `messaging`, and `analytics`) uses separate native bridges, allowing React Native developers to selectively integrate specific Firebase services while maintaining good performance and modularity.

---

## Challenge

While exploring Firebase’s native integration, I encountered a setup issue where the app failed to build on Android due to a version mismatch between the installed `@react-native-firebase/app` package and the native Firebase SDK defined in `android/build.gradle`. I found a GitHub discussion explaining how React Native Firebase relies on the underlying Gradle configuration to match specific versions of the Firebase SDK. Updating both dependencies resolved the issue and helped me understand how tightly native modules depend on correct version alignment.

---

##  Demo Code

```javascript
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

async function setupFirebase() {
  const app = firebase.app();
  console.log('Firebase app name:', app.name);

  const permission = await messaging().requestPermission();
  if (permission) {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
  }
}

setupFirebase();
```


