**Why use native modules?**
Sometimes React Native can’t access certain system features like notifications, sensors, or background tasks. Native modules let us write code in Java/Kotlin (Android) or Swift/Objective-C (iOS) and use it inside React Native.

**How does React Native talk to native code?**
React Native uses a “bridge” that connects JavaScript with native code. Data goes back and forth through this bridge. Newer versions use JSI, which is faster and doesn’t need the old bridge system.

**What are the challenges?**
It’s harder to maintain because you need to handle both Android and iOS code. Debugging is more complex, and version updates can sometimes break the bridge.

