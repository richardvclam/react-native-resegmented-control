import React, { createContext, useEffect, useState } from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';
import { timing } from 'react-native-redash';

import { Segment, SegmentProps } from '../Segment';
import { clamp } from '../utils';
import styles from './SegmentedControlStyles';

export interface SegmentedControlProps {
  activeTintColor?: string;
  inactiveTintColor?: string;
  initialSelectedName?: string;
  children:
    | React.ReactElement<SegmentProps>
    | React.ReactElement<SegmentProps>[];
  onChangeValue?: (name: string) => void;
  sliderStyle?: ViewStyle;
  style?: ViewStyle;
}

export const SegmentedContext = createContext<{
  selectedName: string | null | undefined;
  onChange: ((name: string) => void) | undefined;
} | null>(null);

export const SegmentedControl = ({
  activeTintColor = '#000000',
  children,
  inactiveTintColor = '#000000',
  initialSelectedName,
  onChangeValue,
  sliderStyle,
  style,
}: SegmentedControlProps): JSX.Element => {
  const [_initialized, _setInitialized] = useState(false);
  const [_width, _setWidth] = useState(0);
  const [_initialSelectedName] = useState(initialSelectedName);
  const [_activeName, _setActiveName] = useState(_initialSelectedName);
  const [_sliderPosition, _setSliderPosition] = useState(
    new Animated.Value<number>(0),
  );
  const [_sliderWidth, _setSliderWidth] = useState(0);
  const [_map, _setMap] = useState<{ [key: string]: number } | undefined>(
    undefined,
  );

  const values = Array.isArray(children) ? children : [children];

  // Map segment names to index
  useEffect(() => {
    const tempMap = {};

    values.forEach((child, index) => {
      if (child.type !== Segment) {
        throw new Error('SegmentedControl only accepts Segment as children.');
      }

      if (!child.props.name) {
        throw new Error('Segment requires `name` to be defined.');
      }

      tempMap[child.props.name] = index;
    });

    _setMap(tempMap);
  }, []);

  // Set slider width
  useEffect(() => {
    _setSliderWidth(_width * (1 / values.length - 0.015));
  }, [values, _width]);

  // Set initial slider position
  useEffect(() => {
    if (
      typeof _initialSelectedName !== 'undefined' &&
      typeof _map !== 'undefined' &&
      _width > 0 &&
      !_initialized
    ) {
      const index = _map[_initialSelectedName];
      const position = _width * (index / values.length);
      _setSliderPosition(new Animated.Value(position));
      _setInitialized(true);
    }
  }, [values, _width, _map, _initialSelectedName]);

  // This hook is used to animate the slider position
  Animated.useCode(() => {
    const index = _activeName && _map ? _map[_activeName] : 0;
    const sliderPosition = _width * (index / values.length);

    return Animated.set(
      _sliderPosition,
      timing({
        from: _sliderPosition,
        to: sliderPosition,
        easing: Easing.linear,
        duration: 200,
      }),
    );
  }, [_activeName]);

  const handleLayout = (event: LayoutChangeEvent): void =>
    _setWidth(event.nativeEvent.layout.width);

  const handleChangeValue = (name: string): void => {
    if (typeof _activeName === 'undefined' && typeof _map !== 'undefined') {
      const index = _map[name];
      _setSliderPosition(new Animated.Value(_width * (index / values.length)));
    }
    _setActiveName(name);

    if (typeof onChangeValue === 'function') {
      onChangeValue(name);
    }
  };

  const handleGestureEvent = (event: PanGestureHandlerGestureEvent): void => {
    const { x } = event.nativeEvent;

    const calculatedIndex = Math.floor((x / _width) * values.length);
    const index = clamp(calculatedIndex, 0, values.length - 1);
    const { name } = values[index].props;

    handleChangeValue(name);
  };

  return (
    <SegmentedContext.Provider
      value={{ selectedName: _activeName, onChange: handleChangeValue }}
    >
      <PanGestureHandler onGestureEvent={handleGestureEvent}>
        <View onLayout={handleLayout} style={[styles.container, style]}>
          {typeof _activeName !== 'undefined' && (
            <Animated.View
              testID="SegmentedControl_Slider"
              style={[
                styles.sliderDefault,
                {
                  width: _sliderWidth,
                  transform: [
                    {
                      translateX: _sliderPosition,
                    },
                  ],
                },
                sliderStyle,
                styles.slider,
              ]}
            />
          )}

          {values.map((child, index) => (
            <React.Fragment key={child.props.name}>
              {index > 0 && (
                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                </View>
              )}
              {{
                ...child,
                props: {
                  ...child.props,
                  inactiveTintColor,
                  activeTintColor,
                },
              }}
            </React.Fragment>
          ))}
        </View>
      </PanGestureHandler>
    </SegmentedContext.Provider>
  );
};

export default SegmentedControl;
