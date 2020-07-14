import React, { FC, useContext } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { SegmentedContext } from '../SegmentedContext';
import styles from './SegmentStyles';

export interface SegmentContentProps {
  active: boolean;
  activeTintColor: string;
  disabled: boolean;
  inactiveTintColor: string;
}

export interface SegmentProps {
  activeTintColor?: string;
  content: React.ReactNode;
  disabled?: boolean;
  disabledStyle?: ViewStyle;
  inactiveTintColor?: string;
  name: string;
  style?: StyleProp<ViewStyle>;
}

export const Segment: FC<SegmentProps> = ({
  activeTintColor,
  content,
  disabled,
  disabledStyle,
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
      return content({ activeTintColor, inactiveTintColor, active, disabled });
    }

    return content;
  };

  return (
    <View
      style={[
        styles.container,
        style as ViewStyle,
        disabled && styles.disabled,
        disabled && disabledStyle,
      ]}
    >
      <TouchableOpacity
        disabled={disabled}
        onPress={handlePress}
        testID={`Segment_Button`}
      >
        <View style={styles.segment}>{renderContent()}</View>
      </TouchableOpacity>
    </View>
  );
};
