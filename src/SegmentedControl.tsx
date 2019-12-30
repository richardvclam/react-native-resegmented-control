import React, { useState, useEffect } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { timing } from "react-native-redash";
import Segment from "./Segment";

export interface SegmentedControlProps {
  inactiveTintColor?: string;
  activeTintColor?: string;
  onChangeValue?: (index: number) => void;
  selectedIndex?: number;
  style?: StyleProp<ViewStyle>;
  values: string[];
}

const SegmentedControl = ({
  inactiveTintColor,
  activeTintColor,
  onChangeValue = () => {},
  selectedIndex,
  style,
  values
}: SegmentedControlProps) => {
  const [_width, _setWidth] = useState<number>(0);
  const [_activeIndex, _setActiveIndex] = useState<number | undefined>(
    selectedIndex
  );
  const [_sliderPosition, _setSliderPosition] = useState(
    new Animated.Value<number>(0)
  );
  const [_sliderWidth, _setSliderWidth] = useState(0);

  const handleChangeValue = (index: number) => {
    if (typeof _activeIndex === "undefined") {
      _setSliderPosition(new Animated.Value(_width * (index / values.length)));
    }
    _setActiveIndex(index);

    onChangeValue(index);
  };

  useEffect(() => {
    _setSliderWidth(_width * (1 / values.length - 0.015));
  }, [values, _width]);

  // This hook is used to animate the slider position
  Animated.useCode(() => {
    const index = _activeIndex || 0;
    const sliderPosition = _width * (index / values.length);

    return Animated.set(
      _sliderPosition,
      timing({
        from: _sliderPosition,
        to: sliderPosition,
        easing: Easing.linear,
        duration: 200
      })
    );
  }, [_activeIndex]);

  return (
    <View
      onLayout={event => _setWidth(event.nativeEvent.layout.width)}
      style={[styles.container, style as ViewStyle]}
    >
      {typeof _activeIndex !== "undefined" && (
        <Animated.View
          // @ts-ignore
          style={[
            styles.slider,
            {
              width: _sliderWidth,
              transform: [
                {
                  translateX: _sliderPosition
                }
              ]
            }
          ]}
        />
      )}

      {values.map((value, index) => {
        return (
          <React.Fragment key={value}>
            {index > 0 && (
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
              </View>
            )}
            <Segment
              active={_activeIndex === index}
              onChangeValue={() => handleChangeValue(index)}
              content={value}
              inactiveTintColor={inactiveTintColor}
              activeTintColor={activeTintColor}
            />
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eeeeef",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    height: 28,
    position: "relative"
  },
  slider: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "86%",
    backgroundColor: "white",
    borderRadius: 7,
    margin: 2,
    shadowOffset: { width: 0.95, height: 0.95 },
    shadowColor: "#a2a2a2",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    zIndex: 1
  },

  dividerContainer: {
    paddingTop: 7,
    paddingBottom: 7,
    zIndex: 0
  },
  divider: {
    height: "100%",
    width: 1,
    borderWidth: 0,
    backgroundColor: "rgba(120, 120, 120, 0.2)"
  }
});

export default SegmentedControl;
