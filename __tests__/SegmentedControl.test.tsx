import * as React from 'react';
import { fireEvent, render, wait } from '@testing-library/react-native';
import { SegmentedControl } from '../src/SegmentedControl';
import { Segment } from '../src/Segment';

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

describe('SegmentedControl', () => {
  it('should render', () => {
    const { asJSON } = render(
      <SegmentedControl>
        <Segment name="Test" content="Test" />
      </SegmentedControl>,
    );

    expect(asJSON()).toMatchSnapshot();
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

    await wait();

    // TODO: Test not working.. button isnt being pressed from RNGH
    expect(changeValueSpy).toBeCalledWith('Test');
  });
});
