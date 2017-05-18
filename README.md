## theoneIoApp

baseon <https://github.com/futurice/pepperoni-app-kit>, thanks.

### 快速安装

```
git clone https://github.com/theone1006/theoneIoApp.git
cd theoneIoApp
yarn install
react-native run-ios
```

### 调试

1. 默认情况 打开浏览器 <http://localhost:8081/debugger-ui> 即可查看
2. 安装 `react-native-debugger`
    * brew update && brew cask install react-native-debugger

### 技术栈

* Always up-to-date [React Native](https://facebook.github.io/react-native/) scaffolding
* Modular and well-documented structure for application code
* [Redux](http://redux.js.org/) and [ImmutableJS](https://facebook.github.io/immutable-js/) for safe and **Reasonaboutable**:tm: state management
* [Redux Loop](https://github.com/raisemarketplace/redux-loop) for Elm-style controlled side effects
* [React Navigation](https://reactnavigation.org/) for awesome navigation with 60fps transitions
* flow
* immutable


### Testing Setup

* [Jest](https://facebook.github.io/jest/) for unit testing application code and providing coverage information.
* [Enzyme](https://github.com/airbnb/enzyme) and fully mocked React Native for unit testing UI components
* Utilities for end-to-end integration testing Redux state, including side effects and asynchronous actions


### Test

##### Run unit tests
```
$ npm test
```

##### Run tests every time code changes
```
$ npm run test:watch
```

##### Generate code coverage report
```
$ npm run coverage
```


#### What's Next

* 搜索(等待后台开发)
* 导航界面
