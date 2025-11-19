# Reflections on Code Smells

## What code smells did you find in your code?

Several common code smells were identified:
- Magic Numbers & Strings: Hardcoded values without clear meaning
- Long Functions: Functions doing too many things
- Duplicate Code: Copy-pasted logic in multiple places
- Large Classes: Classes with too many responsibilities
- Deeply Nested Conditionals: Complex if/else structures
- Commented-Out Code: Unused code cluttering the codebase
- Inconsistent Naming: Unclear or inconsistent variable names

## How did refactoring improve the readability and maintainability of the code?

Refactoring led to significant improvements:
- Enhanced clarity with named constants and better naming
- Improved modularity with smaller, focused functions
- Reduced redundancy by eliminating duplicate code
- Better organization with single-responsibility classes
- Simplified logic with flattened conditionals
- Cleaner codebase without commented-out code
- Consistent naming conventions throughout

## How can avoiding code smells make future debugging easier?

Avoiding code smells improves debugging:
- Faster issue location in well-structured code
- Clearer intent with descriptive naming
- Limited impact changes due to single responsibility
- Easier testing of small, focused functions
- Reduced cognitive load with simpler structures
- Prevention of regressions by eliminating duplication
- Better collaboration with maintainable code