# React Native Resegmented Control

React Native Resegmented Control is a declarative component that mimics the look and feel of iOS 13 `UISegmentedControl`.

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
import { SegmentedControl, Segment } from "react-native-resegmented-control";

<SegmentedControl
  activeTintColor="black"
  inactiveTintColor="white"
  initialSelectedName="two"
  onChangeValue={(name: string) => setSelectedSegment(name)}
  style={[styles.segmentedControl]}
>
  <Segment name="one" content="One" />
  <Segment name="two" content="Two" />
</SegmentedControl>;
```
