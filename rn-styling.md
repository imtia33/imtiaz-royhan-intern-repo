## Why does React Native use camelCase instead of traditional CSS properties?

React Native uses camelCase naming convention instead of traditional CSS kebab-case for several reasons:

1. **JavaScript Integration**: React Native is built with JavaScript/TypeScript, where camelCase is the standard naming convention for object properties
2. **Object Property Access**: It allows direct mapping to JavaScript objects without string parsing or conversion
3. **Consistency**: Maintains consistency with the rest of the JavaScript ecosystem

Example:

```javascript
// React Native StyleSheet
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue', // camelCase
    borderRadius: 10,
    marginTop: 20
  }
});
```

vs Traditional CSS:

```css
.container {
  background-color: blue; /* kebab-case */
  border-radius: 10px;
  margin-top: 20px;
}
```

## Benefits of using StyleSheet.create() over inline styles

1. **Performance**: Styles are created once and reused, rather than being recreated on every render
2. **Memory Efficiency**: StyleSheet.create() sends styles to native code only once
3. **Code Organization**: Keeps styling separate from component logic
4. **Debugging**: Easier to debug and maintain styles
5. **Caching**: React Native can cache and optimize stylesheet objects

```javascript
// Good - Using StyleSheet.create()
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black'
  }
});
```

```javascript
// Less optimal and messy  - Inline styles
<Text style={{ fontSize: 16, color: 'black' }}>Hello</Text>
```

## Handling Different Screen Sizes in React Native

For responsive design in React Native, we can use the Dimensions API:

```javascript
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

// Simple breakpoint approach
const isMobile = width < 740;

// Conditional styling based on screen size
const styles = StyleSheet.create({
  container: {
    padding: isMobile ? 10 : 20,
    flexDirection: isMobile ? 'column' : 'row'
  }
});
```

```javascript
// For dynamic screen size changes, use event listeners:
useEffect(() => {
  const subscription = Dimensions.addEventListener(
    "change",
    ({ window }) => {
      // Update state or re-render based on new dimensions
    }
  );
  
  return () => subscription?.remove();
}, []);
```

This approach allows the app to adapt quickly to orientation changes and different device sizes.