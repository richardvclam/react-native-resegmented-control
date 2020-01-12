import React, { useContext } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SegmentedContext } from '../SegmentedControl/SegmentedControl';
import styles from './SegmentStyles';

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
  style,
}: SegmentProps): JSX.Element => {
  const { selectedName, onChange } = useContext(SegmentedContext);

  const active = selectedName === name;

  const handlePress = (): void => {
    if (typeof onChange === 'function') {
      onChange(name);
    }
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
              active && styles.segmentActiveText,
            ]}
          >
            {content}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
