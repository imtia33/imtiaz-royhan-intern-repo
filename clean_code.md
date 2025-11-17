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
```c++
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
```c++
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