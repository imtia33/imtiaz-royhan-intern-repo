# Benefits of deep linking: 
 - Helps to setup a communication between apps.
 - Allows to pass data directy from one app to another or one website to the app.
 - Reliable method for password reset system using a long security key.

# How react handles deep linklinking:
 React Navigation handles deep linking by mapping URLs (or custom app links) to specific screens in project navigation hierarchy. This allows app to open directly to a given screen — even if it wasn’t already running — when the user clicks a link like:

myapp://profile/123

here:
myapp = appscheme

profile = a screen name

123 = a value to be passed to profile screen.

# Challenges in deep linking: 


1. **Platform differences** – iOS, Android, and web handle links differently.
2. **Wrong URL schemes** – Mismatched or missing `myapp://` prefixes.
3. **Nested navigation** – Deep routes may not map correctly.
4. **State not ready** – App data (like auth) may not load before navigation.
5. **Auth screens** – Protected routes need login redirection.
6. **Multiple containers** – Only one `<NavigationContainer>` should handle links.
7. **Cold vs active app** – Must handle both launch and runtime links.
8. **Web routes** – SPAs can break with 404s if rewrite rules are missing.
9. **Expo setup** – Missing `scheme` in `app.json` stops linking.
10. **Testing issues** – Links may behave differently on devices or emulators.
10. **Universal Linking** – For universal linking (using domains to open app) require to host a assets.json type file with app details.

