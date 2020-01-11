import React, { createContext, useState, useEffect } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { timing } from 'react-native-redash';
import { Segment, SegmentProps } from './Segment';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { clamp } from './utils';

export interface SegmentedControlProps {
  activeTintColor?: string;
  inactiveTintColor?: string;
  onChangeValue?: (name: string) => void;
  initialSelectedName?: string;
  children:
    | React.ReactElement<SegmentProps>
    | React.ReactElement<SegmentProps>[];
  style?: StyleProp<ViewStyle>;
}

export const SegmentedContext = createContext<{
  selectedName: string | null | undefined;
  onChange: (string) => void;
}>({
  selectedName: null,
  onChange: (name: string) => {},
});

export const SegmentedControl = ({
  activeTintColor = 'black',
  children,
  inactiveTintColor = 'black',
  initialSelectedName,
  onChangeValue = () => {},
  style,
}: SegmentedControlProps) => {
  const [_width, _setWidth] = useState<number>(0);
  const [_activeName, _setActiveName] = useState<string | undefined>(
    initialSelectedName,
  );
  const [_sliderPosition, _setSliderPosition] = useState(
    new Animated.Value<number>(0),
  );
  const [_sliderWidth, _setSliderWidth] = useState(0);

  const [_map, _setMap] = useState<{ [key: string]: number } | undefined>(
    undefined,
  );

  const values = Array.isArray(children) ? children : [children];

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

  useEffect(() => {
    _setSliderWidth(_width * (1 / values.length - 0.015));
  }, [values, _width]);

  useEffect(() => {
    if (
      typeof initialSelectedName !== 'undefined' &&
      typeof _map !== 'undefined'
    ) {
      const index = _map[initialSelectedName];
      _setSliderPosition(new Animated.Value(_width * (index / values.length)));
    }
  }, [values, _width, _map, initialSelectedName]);

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

  const handleChangeValue = (name: string) => {
    if (typeof _activeName === 'undefined') {
      const index = _map![name];
      _setSliderPosition(new Animated.Value(_width * (index / values.length)));
    }
    _setActiveName(name);

    onChangeValue(name);
  };

  const handleGestureEvent = event => {
    const { x } = event.nativeEvent;

    const calculatedIndex = Math.floor((x / _width) * values.length);
    const index = clamp(calculatedIndex, 0, values.length - 1);
    const name = values[index].props.name;

    handleChangeValue(name);
  };

  return (
    <SegmentedContext.Provider
      value={{ selectedName: _activeName, onChange: handleChangeValue }}
    >
      <PanGestureHandler onGestureEvent={handleGestureEvent}>
        <View
          onLayout={event => _setWidth(event.nativeEvent.layout.width)}
          style={[styles.container, style as ViewStyle]}
        >
          {typeof _activeName !== 'undefined' && (
            <Animated.View
              // @ts-ignore
              style={[
                styles.slider,
                {
                  width: _sliderWidth,
                  transform: [
                    {
                      translateX: _sliderPosition,
                    },
                  ],
                },
              ]}
            />
          )}

          {values.map((child, index) => {
            return (
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
            );
          })}
        </View>
      </PanGestureHandler>
    </SegmentedContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeef',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    height: 28,
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '86%',
    backgroundColor: 'white',
    borderRadius: 7,
    margin: 2,
    shadowOffset: { width: 0.95, height: 0.95 },
    shadowColor: '#a2a2a2',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    zIndex: 1,
  },
  dividerContainer: {
    paddingTop: 7,
    paddingBottom: 7,
    zIndex: 0,
  },
  divider: {
    height: '100%',
    width: 1,
    borderWidth: 0,
    backgroundColor: 'rgba(120, 120, 120, 0.2)',
  },
});

export default SegmentedControl;
