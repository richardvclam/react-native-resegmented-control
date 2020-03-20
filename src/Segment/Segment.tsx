import React, { useContext, FC } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SegmentedContext } from '../SegmentedControl/SegmentedControl';
import styles from './SegmentStyles';

export interface SegmentProps {
  activeTintColor?: string;
  content: React.ReactNode;
  inactiveTintColor?: string;
  name: string;
  style?: StyleProp<ViewStyle>;
}

export const Segment: FC<SegmentProps> = ({
  activeTintColor,
  content,
  inactiveTintColor,
  name,
  style,
}: SegmentProps) => {
  const context = useContext(SegmentedContext);

  if (!context) {
    throw new Error('Segment must be used within a SegmentedControl.');
  }

  const { selectedName, onChange } = context;

  const active = selectedName === name;

  const handlePress = (): void => {
    if (typeof onChange === 'function') {
      onChange(name);
    }
  };

  const renderContent = (): React.ReactNode => {
    if (
      typeof content === 'string' ||
      typeof content === 'number' ||
      typeof content === 'boolean'
    ) {
      return (
        <Text
          numberOfLines={1}
          style={[
            styles.segmentText,
            active ? { color: activeTintColor } : { color: inactiveTintColor },
            active && styles.segmentActiveText,
          ]}
        >
          {content}
        </Text>
      );
    }

    if (typeof content === 'function') {
      return content({ activeTintColor, inactiveTintColor, active });
    }

    return content;
  };

  return (
    <View style={[styles.container, style as ViewStyle]}>
      <TouchableOpacity onPress={handlePress} testID={`Segment_Button`}>
        <View style={styles.segment}>{renderContent()}</View>
      </TouchableOpacity>
    </View>
  );
};
