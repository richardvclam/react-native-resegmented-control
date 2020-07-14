[![npm](https://img.shields.io/npm/v/react-native-resegmented-control)](https://www.npmjs.com/package/react-native-resegmented-control)

# React Native Resegmented Control

React Native Resegmented Control is a fully customizable, declarative component that mimics the design of `UISegmentedControl` from iOS 13. Supported on iOS and Android.

![SegmentedControlExampleOne](docs/images/example-one.gif?raw=true)
![SegmentedControlExampleTwo](docs/images/example-two.gif?raw=true)

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

### `disabled`

Disable the segmented control.

| Type    | Required | Default |
| ------- | -------- | ------- |
| boolean | No       | false   |

### `disabledStyle`

Style of the disabled segmented control. Uses the same styles as a `View` component.

| Type      | Required | Default            |
| --------- | -------- | ------------------ |
| ViewStyle | No       | `{ opacity: 0.5 }` |

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

### `sliderStyle`

Style of the slider. Uses the same styles as a `View` component.

| Type      | Required |
| --------- | -------- |
| ViewStyle | No       |

### `style`

Style of the segmented control. Uses the same styles as a `View` component.

| Type      | Required |
| --------- | -------- |
| ViewStyle | No       |

## Segment

### `content`

Element for the segment.

| Type    | Required |
| ------- | -------- |
| Element | Yes      |

### `disabled`

Disable the segment.

| Type    | Required | Default |
| ------- | -------- | ------- |
| boolean | No       | false   |

### `disabledStyle`

Style of the disabled segment. Uses the same styles as a `View` component.

| Type      | Required | Default            |
| --------- | -------- | ------------------ |
| ViewStyle | No       | `{ opacity: 0.5 }` |

### `name`

Unique name used to identify each segment.

| Type   | Required |
| ------ | -------- |
| string | Yes      |

### `style`

Style of the segment. Uses the same styles as a `View` component.

| Type      | Required |
| --------- | -------- |
| ViewStyle | No       |

## Unit Testing with Jest

This package relies on [`react-native-reanimated`](https://github.com/software-mansion/react-native-reanimated).

When rendering this component with renderers such as Jest you may see this error:

```
  ● Test suite failed to run

    Invariant Violation: Native module cannot be null.

      at invariant (node_modules/invariant/invariant.js:40:15)
      at new NativeEventEmitter (node_modules/react-native/Libraries/EventEmit
ter/NativeEventEmitter.js:36:27)
      at Object.<anonymous> (node_modules/react-native-reanimated/src/Reanimat
edEventEmitter.js:4:1)
      at Object.<anonymous> (node_modules/react-native-reanimated/src/core/Ani
matedCall.js:1:909)
```

To get around this you can use the react-native-reanimated mock. Here is how to in Jest:

In your test file add this:

```
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);
```

## To Dos

- More customizable options
- Pixel perfect to native design
