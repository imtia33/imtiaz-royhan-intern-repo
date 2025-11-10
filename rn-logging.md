## Why is logging important in a production React Native app?

Logging helps you understand what's happening in your app when real users are using it. It catches bugs, shows user behavior, and helps you fix problems fast instead of guessing.

## How does Sentry improve debugging and issue tracking?

Sentry automatically catches and reports errors from your live app. It shows you exactly where crashes happen, what users were doing, and groups similar issues together - all in real time.

## What are best practices for handling and logging errors?

- Catch errors early with try/catch
- Log useful details (but not sensitive info)
- Use structured logging formats
- Set up alerts for critical issues
- Test your error handling works

## Implementation:
 setting up sentry was quite easy as it was easily configured by sentry provided shell command `npx @sentry/wizard@latest -i reactNative`
Code: 
```js

//app.tsx
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View, Button, Text } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';
import './i18n';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';

Sentry.init({
  dsn: 'https://09a0bcd637affbf12d0fff2de67fa546@o4510318758723585.ingest.de.sentry.io/4510318759247952',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, margin: 16 }}>{t('hello')}</Text>
      <LanguageSwitcher />
      <Button
        title={t('tryButton')}
        onPress={() => {
          Sentry.captureException(new Error('First error'));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Sentry.wrap(App);
```
## Test with sentry error image
![Image](image.png)

