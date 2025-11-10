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

# Implementation: 

## Bare React Native (Android)
 adding configurations in android manifest file
```xml
// android/app/src/main/AndroidManifest.xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />

    <!-- Custom scheme so that it opens on travx:// opens -->
    <data android:scheme="travx" />

</intent-filter>
```
## Bare React Native (IOS)
 adding configurations in info plist
 ```xml
 <key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
    <!-- this part is the scheme to open this app via deep link in ios -->
      <string>travx</string>
    </array>
  </dict>
</array>
```
## Expo 
 In expo adding deep linking is much more simple 

For simple app to app linking
 ```json
 // adding in the app.json
 "scheme": [
      "travx"
    ],
```
for universal/app links
```json
"intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "https",
              "host": "trav-x.web.app",
              "pathPrefix": "/verifying"
            }
          ],
          "category": [
            "BROWSABLE",
            "DEFAULT"
          ]
        }
      ],
```
for the linking using web domain a hosted site is neeeded
then a .well-known directory needed which contains the assetLinks.json which verifies the app for the domain usage using the SHA256
```json
[
    {
      "relation": ["delegate_permission/common.handle_all_urls"],
      "target": {
        "namespace": "android_app",
        "package_name": "com.travx.axi",
        "sha256_cert_fingerprints": [
          "D6:BB:BF:E0:E2:77:95:35:B0:82:02:37:20:3B:CC:1A:4A:BD:1C:FD:72:57:F1:AE:38:F2:7F:66:BA:89:4A:9E"
        ]
      }
    }
  ]
```
example: https://trav-x.web.app/.well-known/assetlinks.json
sourceCode : https://github.com/imtia33/TravelMate/blob/main/app.json



 