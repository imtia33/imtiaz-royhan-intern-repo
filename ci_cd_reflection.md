**What is the purpose of CI/CD?**  
CI/CD stands for Continuous Integration and Continuous Deployment (or Delivery). The main purpose of CI/CD is to automate the process of integrating code changes, running tests, and deploying applications. This helps teams deliver code faster, catch issues early, and maintain high-quality software.

**How does automating style checks improve project quality?**  
Automated style checks run code against predefined formatting and best practice rules (like linting or static analysis). This ensures consistency across the codebase, reduces code review friction, and helps catch potential bugs or problematic patterns before they get merged. In the long term, it keeps code clean, readable, and easier to maintain.

**What are some challenges with enforcing checks in CI/CD?**  
Some challenges include configuring tools correctly, dealing with false positives, balancing thoroughness with speed (slow pipelines can frustrate developers), and managing exceptions or legacy code that doesn't yet conform. If checks are too strict, they can block productivity; if they're lenient, quality might slip.

**How do CI/CD pipelines differ between small projects and large teams?**  
In small projects, pipelines can be simpler—maybe just a few checks and a single deployment step. Large teams often require more sophisticated pipelines with parallel jobs, environment-specific deploys, approval gates, and complex branching strategies. Large projects need to accommodate many contributors, so automation, reporting, and reliability become even more critical.
