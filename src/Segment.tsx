import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface SegmentProps {
  active?: boolean;
  activeTintColor?: string;
  content: string;
  inactiveTintColor?: string;
  onChangeValue?: () => void;
  style?: StyleProp<ViewStyle>;
}

const Segment = ({
  active = false,
  activeTintColor,
  content,
  inactiveTintColor,
  onChangeValue,
  style
}: SegmentProps) => (
  <View style={[styles.container, style as ViewStyle]}>
    <TouchableOpacity onPress={onChangeValue}>
      <View style={styles.segment}>
        <Text
          numberOfLines={1}
          style={[
            styles.segmentText,
            active ? { color: activeTintColor } : { color: inactiveTintColor },
            active && styles.segmentActiveText
          ]}
        >
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

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

export default Segment;
