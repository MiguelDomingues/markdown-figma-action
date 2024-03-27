# Markdown Figma GitHub Action

[![GitHub Super-Linter](https://github.com/actions/javascript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/javascript-action/actions/workflows/ci.yml/badge.svg)

## Initial Setup

After you've cloned the repository to your local machine or codespace, you'll
need to perform some initial setup steps before you can develop your action.

1. :hammer_and_wrench: Install the dependencies

   ```bash
   npm install
   ```

1. :building_construction: Package the JavaScript for distribution

   ```bash
   npm run bundle
   ```

1. :white_check_mark: Run the tests

   ```bash
   npm test
   ```

## Update the Action Code

1. Create a new branch

   ```bash
   git checkout -b releases/v1
   ```

1. Update contents of `src/`
1. Add tests to `__tests__/` for your source code
1. Format, test, and build the action

   ```bash
   npm run all
   ```

1. Commit your changes and push them to your repository
1. Create a pull request
1. Merge the pull request into the `main` branch

## Usage

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v4

  - name: Setup markdown-figma
    uses: MiguelDomingues/markdown-figma-action@v1

  - name: Run markdown-figma
    run: markdown-figma --help
```
