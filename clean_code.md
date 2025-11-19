# Clean Code Principles

## Simplicity

Keep the code as simple as possible. Simple code is easier to understand, test, debug, and modify. Avoid unnecessary abstractions, overly complex structures, and features you don't need.

## Readability

Write code that is easy for others (and future you) to understand at a glance. Use clear naming, structured formatting, and small, focused functions to improve comprehension.

## Maintainability

Code should be easy to extend, modify, and fix over time. Break responsibilities into manageable pieces, reduce coupling, and ensure the logic is clear enough that future developers can work with confidence.

## Consistency

Follow the project's naming conventions, formatting rules, and architectural patterns. Consistent code reduces cognitive load and makes it easier for teams to collaborate and understand each other's work.

## Efficiency

Write code that performs well and uses resources wisely, but avoid optimizing too early. First make it work, then make it clean, and only then make it fast if needed.


# Messy sample code:
```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
int t;
cin>>t;
while(t--){
int N;
cin>>N;
vector<int> array1(N);
vector<int> array2(N);
for(int i=0;i<N;i++)
cin>>array1[i];
for(int i=0;i<N;i++)
cin>>array2[i];
vector<pair<int,int>> indexedArray;
for(int i=0;i<N;i++){
indexedArray.push_back({array1[i],array2[i]});
}
sort(indexedArray.begin(),indexedArray.end());
for(int i=0;i<N;i++)
cout<<indexedArray[i].first<<" ";
cout<<endl;
for(int i=0;i<N;i++)
cout<<indexedArray[i].second<<" ";
cout<<endl;
}
}

```
What makes it messy:

Inconsistent indentation (some lines inside loops not indented, some are).

No spaces after commas in pair<int,int> sometimes.

Single-line for loops without braces for some loops.

Random blank lines removed.

Variable names verbose and inconsistent.

fixed: 
```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int t;
    cin>>t;
    while(t--){
        int N;
        cin>>N;
    vector<int> array1 (N);
    vector<int> array2 (N);
    for(int i=0;i<N;i++){
        cin>>array1[i];
    }
    for(int i=0;i<N;i++){
        cin>>array2[i];
    }
    vector<pair<int, int>> indexedArray;
    for (size_t i = 0; i < array1.size(); ++i) {
        indexedArray.push_back({array1[i], array2[i]});
    }
    sort(indexedArray.begin(), indexedArray.end());
    for (const auto& pair : indexedArray) {
        cout << pair.first << " ";
    }
    cout << endl;

    for (const auto& pair : indexedArray) {
        cout << pair.second << " ";
    }
    cout << endl;
        
    }
}
```

## Lint Test:

Code formatting is important because it helps keep code readable, maintainable, and consistent for everyone on the team. Well-formatted code makes it easier to spot bugs, review changes, and onboard new contributors.

### Sample Linter Issue Detected:
One issue detected by the linter was missing spaces after commas and inconsistent indentation.

**Sample:**
```js
for(let i=0;i<arr.length;i++){
console.log(arr[i]);
}
```

### Did Formatting Help?

**Before:**
```js
function sum(a,b){
let result=a+b;
return result;}
```

**After:**
```js
function sum(a, b) {
    let result = a + b;
    return result;
}
```

After formatting, the code is much easier to read and understand, reducing the chance for mistakes and making collaboration smoother.

## Refactoring variables:

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int testCases;
    cin >> testCases;

    while (testCases--) {
        int n;
        cin >> n;

        vector<int> permA(n);
        vector<int> permB(n);

        for (int i = 0; i < n; i++) cin >> permA[i];
        for (int i = 0; i < n; i++) cin >> permB[i];

        vector<pair<int, int>> pairedPerms;
        for (int i = 0; i < n; i++) pairedPerms.push_back({permA[i], permB[i]});

        sort(pairedPerms.begin(), pairedPerms.end());

        for (auto &p : pairedPerms) cout << p.first << " ";
        cout << endl;
        for (auto &p : pairedPerms) cout << p.second << " ";
        cout << endl;
    }
}
```
### What makes a good variable or function name?

A good variable or function name is clear and descriptive, indicating exactly what the variable represents or what the function does. Good names are usually concise but not ambiguous, making the code easier to understand even for someone new to the project.

### What issues can arise from poorly named variables?

Poorly named variables can lead to confusion and misunderstandings about what a piece of code is supposed to do. This can cause bugs, make the code harder to debug or extend, and increase the time required for others (or even yourself) to understand the program later on.

### How did refactoring improve code readability?

Refactoring improved code readability by giving variables and functions meaningful names and by organizing the code structure. This makes the code easier to follow, reduces cognitive load, and helps others (or your future self) maintain and update the code more efficiently.

## Modular functions:
A sample complex code (from my personal project):

```js
export const findTop3DistinctRoutes = async (start, end) => {
  const db = await SQLite.openDatabaseAsync("routes.db");
  const routeCache = new Map();
  const bestRoutes = [];
  const visitedStates = new Map();
  const MAX_DISTANCE_DIFFERENCE = 2; // 2 km maximum difference allowed

  const dfs = async (currentNode, path, totalDistance, visited) => {
    const stateKey = `${currentNode}-${Array.from(visited).join(",")}`;
    if (
      visitedStates.has(stateKey) &&
      visitedStates.get(stateKey) <= totalDistance
    )
      return;
    visitedStates.set(stateKey, totalDistance);

    if (
      bestRoutes.length > 0 &&
      totalDistance > bestRoutes[0].totalDistance + MAX_DISTANCE_DIFFERENCE
    ) {
      return;
    }

    if (currentNode === end) {
      const newRoute = { path: [...path, end], totalDistance };
      updateBestRoutes(newRoute);
      return;
    }

    visited.add(currentNode);

    const connections = await getRoutesFrom(currentNode);
    const promises = connections.map(async (connection) => {
      const nextNode = connection.To;
      const distance = parseFloat(connection.distanceKm);
      if (!visited.has(nextNode)) {
        await dfs(
          nextNode,
          [...path, currentNode],
          totalDistance + distance,
          visited
        );
      }
    });
    await Promise.all(promises);

    visited.delete(currentNode); // Backtrack
  };
}
```
**Modular Version:**

```js
const createStateKey = (currentNode, visited) =>
  `${currentNode}-${Array.from(visited).join(",")}`;

const shouldSkipState = (visitedStates, stateKey, totalDistance) =>
  visitedStates.has(stateKey) && visitedStates.get(stateKey) <= totalDistance;

const exceedsDistanceLimit = (bestRoutes, totalDistance, maxDifference) =>
  bestRoutes.length > 0 &&
  totalDistance > bestRoutes[0].totalDistance + maxDifference;

const handleRouteFound = (path, end, totalDistance, updateBestRoutes) => {
  const newRoute = { path: [...path, end], totalDistance };
  updateBestRoutes(newRoute);
};

const exploreConnections = async (
  connections,
  visited,
  currentNode,
  path,
  totalDistance,
  dfs
) => {
  const promises = connections.map(async (connection) => {
    const nextNode = connection.To;
    const distance = parseFloat(connection.distanceKm);
    if (!visited.has(nextNode)) {
      await dfs(
        nextNode,
        [...path, currentNode],
        totalDistance + distance,
        visited
      );
    }
  });
  await Promise.all(promises);
};

export const findTop3DistinctRoutes = async (start, end) => {
  const db = await SQLite.openDatabaseAsync("routes.db");
  const routeCache = new Map();
  const bestRoutes = [];
  const visitedStates = new Map();
  const MAX_DISTANCE_DIFFERENCE = 2;

  const updateBestRoutes = (newRoute) => {
    if (
      bestRoutes.some(
        (route) =>
          route.path.length === newRoute.path.length &&
          route.path.every((n, i) => n === newRoute.path[i])
      )
    ) {
      return;
    }
    bestRoutes.push(newRoute);
    bestRoutes.sort((a, b) => a.totalDistance - b.totalDistance);
    if (bestRoutes.length > 3) {
      bestRoutes.length = 3;
    }
  };

  const getRoutesFrom = async (node) => {
    if (routeCache.has(node)) {
      return routeCache.get(node);
    }
    const [results] = await db.execAsync(
      "SELECT * FROM routes WHERE From = ?",
      [node]
    );
    routeCache.set(node, results || []);
    return results || [];
  };

  const dfs = async (currentNode, path, totalDistance, visited) => {
    const stateKey = createStateKey(currentNode, visited);

    if (shouldSkipState(visitedStates, stateKey, totalDistance)) return;
    visitedStates.set(stateKey, totalDistance);

    if (exceedsDistanceLimit(bestRoutes, totalDistance, MAX_DISTANCE_DIFFERENCE)) return;

    if (currentNode === end) {
      handleRouteFound(path, end, totalDistance, updateBestRoutes);
      return;
    }

    visited.add(currentNode);

    const connections = await getRoutesFrom(currentNode);
    await exploreConnections(
      connections,
      visited,
      currentNode,
      path,
      totalDistance,
      dfs
    );

    visited.delete(currentNode);
  };

  await dfs(start, [], 0, new Set());
  return bestRoutes;
};
```

---

### Modular Functions

**Why break down functions?**
- Increases reusability
- Eases testing
- Improves maintenance
- Easier to debug and read

**How did refactoring help?**
- Clear separation of tasks
- Each function does one job
- Logic is easier to update or extend
- Reduces bugs and repetition

## commenting and documentation:
**When should you add comments?**
- When the intent of the code isn’t obvious, even after careful naming and structure.
- When working with complex algorithms or non-trivial logic, explain the "why" behind decisions.
- To clarify workarounds, hacks, or code that addresses specific limitations or bugs.
- For documenting expected side-effects or usage (especially public APIs).
- To warn future maintainers about potential pitfalls or invisible dependencies.

**When should you avoid comments and instead improve the code?**
- When a comment only explains *what* the code does—improve variable/function names and refactor for clarity.
- If the logic can be broken down into smaller, well-named functions rather than commented code blocks.
- When comments become outdated or duplicate what the code already says; this can cause confusion.
- If code can be simplified, do so rather than writing a comment to "make up" for complexity.

## Error Handling:
 Before :
 ```js
   export async function getCurrentUser() {
      const currentAccount = await getAccount();
      console.log(currentAccount)
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
  }
  ```
  What problem it caused: In a recent cloudflare outage appwrite's databases were a bit effected, so one of the user could create account but their related data in a table was not added. which caused the login redirection issue as this function was supposed to return some user data and the redirect function could not redirect properly for the missing document. This took an hour to figure out as this happens very rarely.

  After:
  ```js
    export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      console.log(currentAccount)
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
      console.log(currentUser)
  
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error) //this part caught that there was no row present by that query.
    }
  }
  ```

## Unit Testing Reflection

### How do unit tests help keep code clean?

Unit tests help keep code clean in several ways:

1. **Encouraging modular design**: Writing tests forces you to think about how functions can be tested in isolation, leading to smaller, more focused functions with single responsibilities.

2. **Acting as documentation**: Well-written tests serve as living documentation, showing how functions are intended to be used and what results they should produce.

3. **Enabling safe refactoring**: With a good test suite, you can confidently refactor code knowing that if you break something, the tests will catch it.

4. **Improving code quality**: The process of writing tests often reveals design flaws or edge cases that weren't initially considered.

### What issues did you find while testing?

While writing unit tests for the utility functions, several insights emerged:

1. **Edge case consideration**: Initially, I didn't consider edge cases like empty arrays, null values, or zero values. Writing tests forced me to think about these scenarios.

2. **Function purity**: Some functions needed to be refactored to ensure they had predictable outputs for given inputs, making them easier to test.

3. **Input validation**: Tests revealed the need for better input validation to handle unexpected inputs gracefully.

4. **Code coverage awareness**: Writing tests helped identify areas that weren't initially covered, leading to more robust code.

Overall, the process of writing unit tests significantly improved the quality and reliability of the code, demonstrating why testing is an essential part of clean code development.
