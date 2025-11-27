## Key Differences Between `<View>` and `<div>`

- **Platform Target**: `<View>` is a React Native component that maps to native UI elements (e.g., `UIView` on iOS, `ViewGroup` on Android), while `<div>` is an HTML element used exclusively in web development.
- **Styling System**: `<View>` uses React Native's styling system based on CSS but not identical to it, whereas `<div>` relies on standard CSS.
- **Event Handling**: `<View>` supports touch events natively (`onPress`, etc.), while `<div>` handles mouse events typical for web interfaces.

## Performance Benefits of `StyleSheet.create()`

- **Memory Efficiency**: Styles defined with `StyleSheet.create()` are stored in a separate module and referenced by ID, reducing memory usage compared to inline styles which create new objects each time.
- **Cross-Thread Communication Optimization**: On mobile platforms, this approach minimizes the overhead of passing style data across threads during rendering updates.
- **Developer Productivity**: Encourages reusable and organized styling patterns over scattered inline definitions.

## Why No `className` in React Native?

It would be wrong to say there is no className in RN, but adding className support is not straightforward due to the platform differences. We can use nativewind to achieve a className-like experience in React Native.
React Native avoids `className` because:
- It doesn't render HTML or run inside a browser environment where CSS classes apply.
- Instead, components receive a `style` prop accepting JavaScript objects or arrays of objects created via `StyleSheet.create()`.
- This design aligns better with mobile platform constraints and enables dynamic styling without requiring a DOM-based cascade model.
## A Framework Conversion (React to React Native)
React:
```js
import { Text, TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { View, type ViewProps } from 'react-native';
 
function Card({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return (
    <TextClassContext.Provider value="text-card-foreground">
      <View
        className={cn(
          'bg-card border-border flex flex-col gap-6 rounded-xl border py-6 shadow-sm shadow-black/5',
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}
 
function CardHeader({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return <View className={cn('flex flex-col gap-1.5 px-6', className)} {...props} />;
}
 
function CardTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  return (
    <Text
      role="heading"
      aria-level={3}
      className={cn('font-semibold leading-none', className)}
      {...props}
    />
  );
}
 
function CardDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  return <Text className={cn('text-muted-foreground text-sm', className)} {...props} />;
}
 
function CardContent({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return <View className={cn('px-6', className)} {...props} />;
}
 
function CardFooter({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return <View className={cn('flex flex-row items-center px-6', className)} {...props} />;
}
 
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
```
React Native:
```js
import { Text, TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { View, type ViewProps } from 'react-native';
 
function Card({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return (
    <TextClassContext.Provider value="text-card-foreground">
      <View
        className={cn(
          'bg-card border-border flex flex-col gap-6 rounded-xl border py-6 shadow-sm shadow-black/5',
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}
 
function CardHeader({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return <View className={cn('flex flex-col gap-1.5 px-6', className)} {...props} />;
}
 
function CardTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  return (
    <Text
      role="heading"
      aria-level={3}
      className={cn('font-semibold leading-none', className)}
      {...props}
    />
  );
}
 
function CardDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  return <Text className={cn('text-muted-foreground text-sm', className)} {...props} />;
}
 
function CardContent({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return <View className={cn('px-6', className)} {...props} />;
}
 
function CardFooter({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return <View className={cn('flex flex-row items-center px-6', className)} {...props} />;
}
 
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
```
This is an example of a shadcn ui card component converted and reusable for React Native.
