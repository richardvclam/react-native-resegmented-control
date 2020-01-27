import React from 'react';
import { render } from '@testing-library/react-native';
import { SegmentedControl, Segment } from '../src';

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

describe('SegmentedControl', () => {
  it('should not render without SegmentedControl', () => {
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockImplementation();

    expect(() => {
      render(<Segment name="Test" content="Test" />);
    }).toThrow('Segment must be used within a SegmentedControl.');

    errorSpy.mockRestore();
  });

  it('should render a text when content is a string', () => {
    const { getByText } = render(
      <SegmentedControl>
        <Segment name="Test" content="Test" />
      </SegmentedControl>,
    );

    expect(getByText('Test')).toBeDefined();
  });
});
