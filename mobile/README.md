# Hackathon Project Information
## Name:
- Busmap
## Team Members
- Hoang Phi Long
- Le Hung Son
- Nguyen Duy
- Do Trung Hieu

## Summary
Busmap GUI prebuild for KMS Hackathon

## Technologies
### Android Application
- [React Native](RN_README.md) - Framework for building native apps
- Redux and Redux Thunk - State management with asynchonous support
- NodeJS

## Installation
### Requirement
- NodeJS 10.0.3
- Yarn Package Manager 1.7.0
- Android SDK & AVD
- Git-scm

### Setup React Native
```
yarn global add create-react-native-app react-native-cli
```

### Build App
1. Cloning repository
```sh
git clone https://github.com/longhoang0304/BusMap.git
```
2. Change directory to BusMap folder
```sh
cd BusMap
```
3. Install packages and dependencies
```sh
yarn install
```
4. Start AVD from command line
```sh
emulator -avd [your avd name]
```
5. Start React Native app
```sh
yarn run android
```