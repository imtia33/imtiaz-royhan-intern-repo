## How does react-i18next handle translations?

React-i18next helps manage translations in React apps:

1. **Translation Files**: Uses JSON files (like `en.json`) with key-value pairs for each language.
2. **Provider Component**: `I18nextProvider` makes translations available throughout the app.
3. **Hook Integration**: The `useTranslation` hook lets components access translated strings.
4. **Language Detection**: Automatically detects user language from browser or settings.
5. **Dynamic Switching**: Allows switching languages without reloading the page.
6. **Advanced Features**: Supports inserting values and handling plurals in translations.

## What challenges arise when localising a React Native app?

Localizing React Native apps can be tricky due to:

1. **Platform Differences**: iOS and Android may need different localization methods.
2. **RTL Support**: Right-to-left languages need special layout handling.
3. **Fonts and Text**: Some languages need specific fonts or have complex scripts.
4. **Formatting**: Dates, numbers, and currencies vary by region.
5. **Cultural Fit**: Images and colors may mean different things in other cultures.
6. **Performance**: Many languages can increase app size and load times.
7. **Testing**: More languages mean more testing across devices and layouts.
8. **Library Limits**: Not all third-party tools support localization well.

## How would you test localisation support in an app?

To test localization:

1. **Functional Checks**: Ensure all text displays correctly and switching works.
2. **UI Layouts**: Check layouts adapt to different text lengths and directions.
3. **Automated Tests**: Use tools like Jest for translation and formatting tests.
4. **Device Tests**: Test on various devices with different system languages.
5. **Cultural Review**: Have native speakers review content and formatting.
6. **Edge Cases**: Test very long/short text, special characters, and mixed languages.
7. **Regression Tests**: Make sure new updates don't break localization.
