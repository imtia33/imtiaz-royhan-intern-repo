# Code Smells Examples

## Magic Numbers & Strings

```javascript
// Bad: Hardcoded values without explanation
function calculateArea(radius) {
    return 3.14159 * radius * radius;
}

function getUserRole(userId) {
    if (userId === 'admin123') {
        return 'administrator';
    }
    return 'user';
}

// Good: Using named constants
const PI = 3.14159;
const ADMIN_ID = 'admin123';

function calculateArea(radius) {
    return PI * radius * radius;
}

function getUserRole(userId) {
    if (userId === ADMIN_ID) {
        return 'administrator';
    }
    return 'user';
}
```

## Long Functions

```javascript
// Bad: Function doing too many things
function processUserData(users) {
    // Validate users
    const validUsers = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].name && users[i].email) {
            validUsers.push(users[i]);
        }
    }
    
    // Format emails
    for (let i = 0; i < validUsers.length; i++) {
        validUsers[i].email = validUsers[i].email.toLowerCase();
    }
    
    // Send notifications
    for (let i = 0; i < validUsers.length; i++) {
        console.log(`Sending welcome email to ${validUsers[i].email}`);
        sendEmail(validUsers[i].email, 'Welcome!');
    }
    
    // Save to database
    saveToDatabase(validUsers);
    
    return validUsers;
}

// Good: Breaking into smaller functions
function validateUsers(users) {
    return users.filter(user => user.name && user.email);
}

function formatEmails(users) {
    return users.map(user => ({
        ...user,
        email: user.email.toLowerCase()
    }));
}

function sendNotifications(users) {
    users.forEach(user => {
        console.log(`Sending welcome email to ${user.email}`);
        sendEmail(user.email, 'Welcome!');
    });
}

function processUserData(users) {
    const validUsers = validateUsers(users);
    const formattedUsers = formatEmails(validUsers);
    sendNotifications(formattedUsers);
    saveToDatabase(formattedUsers);
    return formattedUsers;
}
```

## Duplicate Code

```javascript
// Bad: Copy-pasted logic
function calculateCircleArea(radius) {
    if (radius <= 0) {
        console.log('Error: Radius must be positive');
        return -1;
    }
    return 3.14159 * radius * radius;
}

function calculateSphereVolume(radius) {
    if (radius <= 0) {
        console.log('Error: Radius must be positive');
        return -1;
    }
    return (4/3) * 3.14159 * radius * radius * radius;
}

// Good: Reusing validation logic
function validateRadius(radius) {
    if (radius <= 0) {
        console.log('Error: Radius must be positive');
        return false;
    }
    return true;
}

function calculateCircleArea(radius) {
    if (!validateRadius(radius)) return -1;
    return 3.14159 * radius * radius;
}

function calculateSphereVolume(radius) {
    if (!validateRadius(radius)) return -1;
    return (4/3) * 3.14159 * radius * radius * radius;
}
```

## Large Classes (God Objects)

```javascript
// Bad: Class handling too many responsibilities
class UserManager {
    constructor() {
        this.users = [];
    }
    
    // Database operations
    saveToDB() { /* ... */ }
    loadFromDB() { /* ... */ }
    deleteFromDB() { /* ... */ }
    
    // Email operations
    sendEmail(email, content) { /* ... */ }
    validateEmail(email) { /* ... */ }
    
    // File operations
    exportToFile(filename) { /* ... */ }
    importFromFile(filename) { /* ... */ }
    
    // Authentication operations
    authenticate(username, password) { /* ... */ }
    generateToken(user) { /* ... */ }
    
    // Logging operations
    logActivity(activity) { /* ... */ }
    generateReport() { /* ... */ }
}

// Good: Separating responsibilities into smaller classes
class UserRepository {
    save() { /* ... */ }
    load() { /* ... */ }
    delete() { /* ... */ }
}

class EmailService {
    send(email, content) { /* ... */ }
    validate(email) { /* ... */ }
}

class FileService {
    export(filename) { /* ... */ }
    import(filename) { /* ... */ }
}

class AuthenticationService {
    authenticate(username, password) { /* ... */ }
    generateToken(user) { /* ... */ }
}

class ActivityLogger {
    log(activity) { /* ... */ }
    generateReport() { /* ... */ }
}
```

## Deeply Nested Conditionals

```javascript
// Bad: Complex nested conditionals
function processOrder(order) {
    if (order.isValid) {
        if (order.user.isActive) {
            if (order.payment.isProcessed) {
                if (order.inventory.isAvailable) {
                    if (order.shipping.isPossible) {
                        return 'Order processed successfully';
                    } else {
                        return 'Shipping not possible';
                    }
                } else {
                    return 'Inventory not available';
                }
            } else {
                return 'Payment not processed';
            }
        } else {
            return 'User not active';
        }
    } else {
        return 'Order not valid';
    }
}

// Good: Early returns reduce nesting
function processOrder(order) {
    if (!order.isValid) return 'Order not valid';
    if (!order.user.isActive) return 'User not active';
    if (!order.payment.isProcessed) return 'Payment not processed';
    if (!order.inventory.isAvailable) return 'Inventory not available';
    if (!order.shipping.isPossible) return 'Shipping not possible';
    
    return 'Order processed successfully';
}
```

## Commented-Out Code

```javascript
// Bad: Leaving unused code in the codebase
function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    
    // Old calculation method
    // let total = 0;
    // items.forEach(item => {
    //     total += item.price * item.quantity;
    // });
    
    // Another old approach
    // const total = items.reduce((sum, item) => sum + item.price, 0);
    
    return total;
}

// Good: Removing commented-out code
function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    return total;
}
```

## Inconsistent Naming

```javascript
// Bad: Inconsistent and unclear naming
function calc(u, usrNm, pwd) {
    let usr = u.find(x => x.username == usrNm);
    if (usr) {
        if (usr.password == pwd) {
            return { success: true, data: usr };
        } else {
            return { success: false, msg: 'Wrong password' };
        }
    } else {
        return { success: false, msg: 'User not found' };
    }
}

let usrList = [];
let userName = 'john';
let PASSWORD = 'secret123';

// Good: Consistent and descriptive naming
function authenticateUser(users, username, password) {
    const user = users.find(user => user.username === username);
    
    if (!user) {
        return { success: false, message: 'User not found' };
    }
    
    if (user.password !== password) {
        return { success: false, message: 'Wrong password' };
    }
    
    return { success: true, data: user };
}

const userList = [];
const currentUser = 'john';
const userPassword = 'secret123';
```