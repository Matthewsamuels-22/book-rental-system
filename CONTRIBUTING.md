# Rental Book Management System Contribution Guide

## Prerequisites

In order to develop and test the app, you'll need to have a few tools installed
on your local machine.

-   Git
-   Node.js LTS
-   Visual Studio Code

## Your Contributions

### Your First Contribution

1.  Clone this repository to your computer
    -   `git clone <repository-url>`
1.  Create a new branch using any of the commands below
    -   `git checkout -b <new-branch>`
    -   `git switch -c <new-branch>`
1.  Commit and push your changes
1.  Create a pull request (PR) from your branch to the `main` branch

### Your Other Contributions

This repository has multiple contributors who can push changes at any time,
causing your local repository to be out of sync with the remote repository.
To keep your local repository in sync, follow the steps below in order.

1.  Create a new branch
1.  Fetch all changes from the main (default) branch
    -   `git fetch origin main`
1.  Merge the code into your branch
    -   `git rebase main`
1.  Commit and push your changes
1.  Create a pull request (PR) from your branch to the `main` branch

> [!note]
> Execute the command `npm run format` in the app's root directory before each
> commit to ensure that your code style is consistent with the codebase.

## Git Guidelines

### Branches

-   Avoid long names
-   Avoid special characters
-   Use dash or underscore to separate words

### Commit Messages

-   Commit message should be sentence case
    -   Example: `Create Signup Form`
    -   Example: `Create signup form` (preferred)
    -   Exception: Proper nouns should remain capitalized.
-   Commit message should be short
    -   Exception: If not possible, make the first line a summary of the main
        change, add a blank line then the rest of the details.
-   Commit message should summarize all changes in the commit

## Code Guidelines

### JavaScript/React

-   Use **_PascalCase_** for React function component names
    -   Example: `function HomePage() {}`
    -   Example: `function SigninPage() {}`
-   Use **_camelCase_** for function names
    -   Example: `function getAllBooks() {}`
-   Use **_camelCase_** for variable names
    -   Example: `let bookCount = 0`
-   Use **_PascalCase_** for filenames that export React function components
    -   Example: `HomePage.jsx`
-   Only use arrow function if its body takes up one line or it's an argument to
    another function
-   Use `async`/`await` with `try`/`catch` instead of `.then`/`.catch`
    ```js
    // preferred
    async function fetchAllRecords() {
        try {
            const result = await functionThatCouldThrow();
            console.log(result);
        }
        catch (error) { console.error(error); }
    }

    // not recommended
    function fetchAllRecords() {
        functionThatCouldThrow()
        .then(result => console.log(result))
        .catch(error => console.error(error));
    }
    ```

### Other

-   Use **_snake_case_** or **_flatcase_** for folder names
    -   Example: `src/pages/HomePage.jsx`
-   Use **_snake_case_** or **_flatcase_** for CSS filenames
    -   Example: `homepage.css`
    -   Example: `signinpage.css`
-   Use **_kebab-case_** for CSS class names
    -   Example: `.button-primary`

## Resources

-   [Figma UI Design for Rental Book Management System](https://www.figma.com/file/AFtZDlQZT0HcC0KOR7EW8u/PRJ4020-Rental-Book-System?type=design&node-id=0-1&mode=design)
    -   The design will be finalized when all (or most) of the functional
        requirements are implemented.
