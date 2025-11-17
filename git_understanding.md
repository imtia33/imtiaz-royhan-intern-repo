## Why are PRs important in a team workflow?

PRs allow teams to review each other's code, catch bugs early, and keep track of changes. They help maintain code quality and make collaboration easier.

## What makes a well-structured PR?

A good PR is:
- Clear title and description
- Focused on one topic or issue
- Contains meaningful commit messages
- Passes tests and follows style guides
- Includes screenshots if UI is changed
- Updates documentation when needed
- Highlights anything that needs special attention

## What did you learn from reviewing an open-source PR?

I learned the importance of clear communication, good feedback, and thorough testing. Reviewing PRs made me write better PRs myself.

---

## Why do teams use branches instead of pushing directly to main?

When working with git, teams avoid pushing directly to `main` because:
- It can introduce bugs directly into the main codebase.
- There's no opportunity for others to review changes before they affect everyone.
- Multiple people pushing at once can cause confusion or overwrite work.

## How do branches help with reviewing code?

Branches allow work to happen in isolation. This means:
- Changes can be examined and discussed in Pull Requests before merging.
- It's easier to test and review new features or fixes before they impact the main product.
- Code is kept organized and manageable.

## What happens if two people edit the same file on different branches?

If this happens:
- Git will warn about a conflict when the branches are merged.
- The conflict must be resolved manually, ensuring that changes from both people are considered.
- Using branches helps teams spot and resolve these issues early, protecting everyone's work.

---

## What makes a good commit message?

A good commit message is clear and descriptive, summarizing what was changed and why. It should be concise, specific, and easy to understand for others who might read the history later.

## How does a clear commit message help in team collaboration?

Clear commit messages help teams quickly understand the purpose of each change. This makes code reviews, debugging, and onboarding new team members much easier. It also allows team members to track project history effectively.

## How can poor commit messages cause issues later?

Poor commit messages make it harder to figure out what was changed, why, or how to fix or revert changes in the future. This can lead to confusion, wasted time during debugging or code reviews, and difficulty maintaining the codebase over time.
## merge conflict:
How to cause and resolve:
```
PS C:\Users\imtia\OneDrive\Desktop\imtiaz-royhan-intern-repo\imtiaz-royhan-intern-repo> git add .
PS C:\Users\imtia\OneDrive\Desktop\imtiaz-royhan-intern-repo\imtiaz-royhan-intern-repo> git commit -m "initial"
[main 90a5188] initial
 1 file changed, 1 insertion(+)
 create mode 100644 conflicttest.txt
PS C:\Users\imtia\OneDrive\Desktop\imtiaz-royhan-intern-repo\imtiaz-royhan-intern-repo> git checkout -b feature-axis
Switched to a new branch 'feature-axis'
PS C:\Users\imtia\OneDrive\Desktop\imtiaz-royhan-intern-repo\imtiaz-royhan-intern-repo> git commit -am "feature change"
[feature-axis 877eb4e] feature change
 1 file changed, 1 insertion(+), 1 deletion(-)
PS C:\Users\imtia\OneDrive\Desktop\imtiaz-royhan-intern-repo\imtiaz-royhan-intern-repo> git checkout main
Switched to branch 'main'
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)
PS C:\Users\imtia\OneDrive\Desktop\imtiaz-royhan-intern-repo\imtiaz-royhan-intern-repo> git commit -m "main change"
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   conflicttest.txt

no changes added to commit (use "git add" and/or "git commit -a")
PS C:\Users\imtia\OneDrive\Desktop\imtiaz-royhan-intern-repo\imtiaz-royhan-intern-repo> git commit -am "main change"
[main 2eb9781] main change
 1 file changed, 1 insertion(+), 1 deletion(-)
PS C:\Users\imtia\OneDrive\Desktop\imtiaz-royhan-intern-repo\imtiaz-royhan-intern-repo> git merge feature-axis
Auto-merging conflicttest.txt
CONFLICT (content): Merge conflict in conflicttest.txt
Automatic merge failed; fix conflicts and then commit the result.
PS C:\Users\imtia\OneDrive\Desktop\imtiaz-royhan-intern-repo\imtiaz-royhan-intern-repo> git add .
PS C:\Users\imtia\OneDrive\Desktop\imtiaz-royhan-intern-repo\imtiaz-royhan-intern-repo> git commit -m "resolved"
[main bc10534] resolved
```
What I have learned : You delete what you don’t want → keep what you want → save → commit.
