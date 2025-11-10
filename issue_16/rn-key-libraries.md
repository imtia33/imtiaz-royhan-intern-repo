# Researching libraries used by focusbear 

1. `@react-navigation/native`, `@react-navigation/stack` , `@react-navigation/bottom-tabs` – Handles navigation

I am familier with these libraries as I used them in multiple projects for navigation setup.

2. `react-native-vector-icons` . Although I used this less than I used `Expo vector Icons` and `Lucide Icons` library.

3. `@rneui/themed` there was a version conflict with this library 
so I tested this on a snack. Link : https://snack.expo.dev/@arpitbhalla/react-native-elements

4. `react-native-gesture-handler` I am quite familier with this library as I used it in multiple projects for handling gestures, like swipe for bottom tabs change, bottom sheet, side bar etc.

- except for the react-native-reanimated & and async storage the rest are new. Although I wont say most of them are new , becuase I made my own diy componants like a theme changer component which is done via '@rneui/themed'. As for the auth libraries , I could not test much becuase I dont have an IOS phone.

# Reflection


### 1. What is the purpose of **Redux-Persist**, and why is it useful?

**Purpose:**
Redux-Persist automatically saves (persists) parts of your Redux store to local storage (in React Native, usually `AsyncStorage`), so data remains available **after the app restarts**.

**Why it’s useful:**
Without it, your Redux state resets to the initial values every time the app reloads or closes.

###  2. How does **react-native-background-fetch** differ from a normal timer?

**Normal timers** (`setInterval`, etc.)

* Stop working when the app goes to background or the OS suspends it.

**react-native-background-fetch**

* Uses **native OS background job APIs** (Android `JobScheduler`, iOS `BGTaskScheduler`)


### 3. Why does **Focus Bear use Auth0** instead of handling authentication manually?

Because **Auth0** provides secure authentication without reinventing the wheel.

**benefits:**

* Built-in OAuth, social logins, and enterprise login providers.
* Securely stores credentials and prevents vulnerabilities.

---

### 4. How does **PostHog** help improve the user experience in Focus Bear?

**PostHog** is a **product analytics** tool that tracks user behavior to help developers understand how people actually use the app.

**It helps Focus Bear by:**

* Tracking feature usage (e.g., “How often do users start Focus sessions?”)
* Identifying drop-off points or confusing screens.
* Running **A/B tests** to measure which features improve engagement.
* Collecting **funnel data** to guide product decisions.


---

### ⚠️ 5. What’s the difference between **Sentry** and **PostHog**, and when would you use each?

| Tool        | Primary Purpose                    | Example Use                                      |
| :---------- | :--------------------------------- | :----------------------------------------------- |
| **Sentry**  | Error and crash reporting          | Detect when a screen crashes due to an exception |
| **PostHog** | Product analytics & usage tracking | Track how users interact with a new feature      |

**When to use:**

* Use **Sentry** to fix *bugs* (stability, stack traces, crashes).
* Use **PostHog** to improve *usability* (user flow, engagement, retention).

---

### 6. How does **react-native-localize** work, and how does it interact with **i18next**?

**react-native-localize** detects:

* The user’s device language, region, and timezone.
* Whether the language is right-to-left.

**i18next** is a translation management library.

They work together like this:

1. `react-native-localize` detects language → e.g. “bn-BD” or “en-US”.
2.  pass that language code to **i18next**.
3. i18next loads the correct translation JSON file and formats messages accordingly.

---

### 7. If you had to remove one library and replace it with an alternative, which one would you choose and why?

- Although I could not find any replacement as I have not seen the architecture that Focus Bear uses. I assume its React Native without expo integration from the libraries.

- If it were to be an expo-react-native app I have some candidates. Such as react navigation/native. Expo router should be a fine replacement as it also come with tabs and stack which also removes the bottom tabs dependencies.


