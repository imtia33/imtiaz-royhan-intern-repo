# React Fundamentals Reflection

## What challenges did you face during setup?

Setting up a React project with Tailwind CSS was relatively straightforward using Create React App and the Tailwind CLI. The main challenges were:
- Ensuring proper configuration of the tailwind.config.js file to include all source files
- Adding the Tailwind directives to the correct CSS file (index.css)
- Understanding the purge configuration to optimize for production

## Why are components important in React?

Components are the fundamental building blocks of React applications because they:
- Promote reusability - write once, use multiple times
- Encapsulate functionality - each component manages its own logic and state
- Improve maintainability - changes to one component don't affect others
- Enable modular development - teams can work on different components simultaneously
- Provide better testing capabilities - components can be tested in isolation

## What happens if we modify state directly instead of using setState?

Directly modifying state in React causes several issues:
- Component won't re-render to reflect the changes
- React's internal state management becomes inconsistent
- Component lifecycle methods won't be triggered properly
- The virtual DOM won't update, leading to UI inconsistencies
- It breaks React's ability to optimize rendering performance

## What are some common issues when working with lists in React?

Common issues when working with lists in React include:
- Forgetting to add unique keys to list items, causing performance problems and rendering issues
- Incorrectly updating state arrays by directly modifying them instead of creating new arrays
- Not properly handling dynamic list updates (additions, deletions, modifications)
- Performance issues with large lists without virtualization
- State management complexity when list items have their own state

## What are the advantages of client-side routing?

Advantages of client-side routing include:
- Faster navigation between pages without full page reloads
- Improved user experience with smoother transitions
- Reduced server load since routing is handled in the browser
- Ability to maintain application state during navigation
- Better performance for single-page applications (SPAs)
- Enhanced offline capabilities with service workers