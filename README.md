# React Native Resegmented Control

**React Native's Segmented Control component reimplemented**

React Native Resegmented Control is a pure JS component that mimics the look and feel of iOS 13 `UISegmentedControl`.

## Installation

1\. First install the library from npm using yarn or npm

`yarn add react-native-resegmented-control`

2\. Install additional dependencies

`yarn add react-native-gesture-handler react-native-reanimated`

3a. (Pre 0.59 RN) Link the native modules

`react-native link react-native-gesture-handler react-native-reanimated`

3b. (Post 0.60 RN) Install the Pods

`pod install`

## Example

```jsx
import { SegmentedControl } from "react-native-resegmented-control";

<SegmentedControl
  defaultSelectedIndex={1}
  values={["One", "Two"]}
  inactiveTintColor="white"
  activeTintColor="black"
  onChangeValue={(value: number) => setValue(value)}
/>;
```
