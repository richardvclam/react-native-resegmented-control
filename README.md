[![npm](https://img.shields.io/npm/v/react-native-resegmented-control)](https://www.npmjs.com/package/react-native-resegmented-control)

# React Native Resegmented Control

React Native Resegmented Control is a fully customizable, declarative component that mimics the design of `UISegmentedControl` from iOS 13. Supported on iOS and Android.

![Image](https://giant.gfycat.com/WhichChubbyAcornweevil.gif)

## Motivation

We wanted to use the new segmented control in our app, but there are a few issues with the native component `SegmentedControlIOS`.

1. The new design is only available on iOS 13 and above - say bye to app support for older versions.
2. The component is not fully customizable.
3. There is no equivalent component for Android - boo.

**Why not use one of the other existing libaries?**
While any of the other libraries would do the job, none of them comes with the new iOS 13 design out of the box. We really wanted the fancy slider animation. 😎

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
import { SegmentedControl, Segment } from 'react-native-resegmented-control';

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

## SegmentedControl

### `activeTintColor`

Color of the active content.

| Type   | Required | Default   |
| ------ | -------- | --------- |
| string | No       | `#000000` |

### `inactiveTintColor`

Color of the inactive content.

| Type   | Required | Default   |
| ------ | -------- | --------- |
| string | No       | `#000000` |

### `initialSelectedName`

Name of the segment to initially select.

| Type   | Required |
| ------ | -------- |
| string | No       |

### `onChangeValue`

Callback that is called when the user taps a segment. Passes the `name` of the `Segment` as an argument.

| Type     | Required |
| -------- | -------- |
| function | No       |

```ts
function onChangeValue(name: string): void {}
```

### `style`

Style of the segmented control. Uses the same styles as a `View` component.

| Type      | Required |
| --------- | -------- |
| ViewStyle | No       |

## To Dos

- More customizable options
- Pixel perfect to native design
