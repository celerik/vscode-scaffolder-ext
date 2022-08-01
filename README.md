# VSCode Scaffolder Extension

The purpose of this project is to build an extension for **VSCode** that helps to automate code generation through scaffolding. The extension will be multipurpose and language agnostic.

# Getting Started

### Prerequisites

Requirements you must have to run the project

- [NodeJs](https://nodejs.org/es/)

- [Yarn](https://yarnpkg.com/)

- [VScode Extension API](https://code.visualstudio.com/api/get-started/your-first-extension)

- [Git](https://git-scm.com/)

### Installation and Running Project

Once you have the repo cloned you have to follow these steps:

1.  Install VS Code Extension Generator:

        npm install -g yo generator-code

2.  Open a terminal, go to the folder project, and type:

        yarn

3.  Once you have the dependencies installed, press `F5`, after that, another window of vscode will open up with the project running

### Project Scripts

- `npm run lint`: This command checks the code and fixes problems in your code

### Local Scripts

To avoid Git converting from LF to CRLF, run the following commands:
```shell
git config --global core.autocrlf false
git config --global core.eol lf
git rm --cached -r .
git reset --hard
```
### Publish

To publish the extension to marketplace you must have been added as a contributor in the publisher. If you have been added, then follow the next steps:

1. First, you should generate a personal access token in Azure DevOps that you can do in the next URL https://dev.azure.com/celerik/_usersSettings/tokens

2. Run the next command:

``` 
vsce login Celerik
```
After that, the console will ask you for the token, enter it and then you will be logged in

3. To end run the command to publish this command will push the extension to the marketplace

``` 
vsce publish --baseImagesUrl https://raw.githubusercontent.com/celerik/vscode-scaffolder-ext/develop/source/
```

