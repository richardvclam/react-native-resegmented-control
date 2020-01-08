import React, { useContext } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SegmentedContext } from "./SegmentedControl";

export interface SegmentProps {
  activeTintColor?: string;
  content: string;
  inactiveTintColor?: string;
  name: string;
  style?: StyleProp<ViewStyle>;
}

export const Segment = ({
  activeTintColor,
  content,
  name,
  inactiveTintColor,
  style
}: SegmentProps) => {
  const { selectedName, onChange } = useContext(SegmentedContext);

  const active = selectedName === name;

  const handlePress = () => {
    onChange(name);
  };

  return (
    <View style={[styles.container, style as ViewStyle]}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.segment}>
          <Text
            numberOfLines={1}
            style={[
              styles.segmentText,
              active
                ? { color: activeTintColor }
                : { color: inactiveTintColor },
              active && styles.segmentActiveText
            ]}
          >
            {content}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    zIndex: 2
  },
  segment: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  segmentText: {
    fontSize: 13,
    paddingLeft: 2,
    paddingRight: 2,
    width: "100%",
    textAlign: "center"
  },
  segmentActiveText: {
    fontWeight: "bold"
  }
});
