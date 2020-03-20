import React from 'react';
import { View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import { SegmentedControl } from '../src/SegmentedControl';
import { Segment } from '../src/Segment';

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('react-native-gesture-handler', () => {
  const actual = jest.requireActual('react-native-gesture-handler');
  const { TouchableOpacity } = jest.requireActual('react-native');
  return {
    ...actual,
    TouchableOpacity,
  };
});

describe('SegmentedControl', () => {
  it('should render', () => {
    const { asJSON } = render(
      <SegmentedControl>
        <Segment name="Test" content="Test" />
      </SegmentedControl>,
    );

    expect(asJSON()).toMatchSnapshot();
  });

  it('should render initially without slider, press on a segment and slider should appear', async () => {
    const { getByTestId, getByText } = render(
      <SegmentedControl>
        <Segment name="first" content="First" />
        <Segment name="second" content="Second" />
      </SegmentedControl>,
    );

    expect(() => getByTestId('SegmentedControl_Slider')).toThrow();

    const secondSegment = getByText('Second');
    fireEvent.press(secondSegment);

    expect(getByTestId('SegmentedControl_Slider')).toBeDefined();
  });

  it('should render initially with slider on `Second`', async () => {
    const { getByTestId } = render(
      <SegmentedControl initialSelectedName="second">
        <Segment name="first" content="First" />
        <Segment name="second" content="Second" />
      </SegmentedControl>,
    );

    expect(getByTestId('SegmentedControl_Slider')).toBeDefined();
  });

  it('should call onChangeValue when pressed on `Test`', async () => {
    const changeValueSpy = jest.fn();
    const { getByTestId } = render(
      <SegmentedControl onChangeValue={changeValueSpy}>
        <Segment name="Test" content="Test" />
      </SegmentedControl>,
    );

    const button = getByTestId('Segment_Button');
    fireEvent.press(button);

    expect(changeValueSpy).toBeCalledWith('Test');
  });

  it('should throw if a child component is not a Segment', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockImplementation();

    expect(() => {
      render(
        <SegmentedControl>
          <View />
        </SegmentedControl>,
      );
    }).toThrow('SegmentedControl only accepts Segment as children.');

    errorSpy.mockRestore();
  });

  it('should throw if a Segment has no name', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockImplementation();

    expect(() => {
      render(
        <SegmentedControl>
          <Segment name="" content="No Name" />
        </SegmentedControl>,
      );
    }).toThrow('Segment requires `name` to be defined.');

    errorSpy.mockRestore();
  });
});
