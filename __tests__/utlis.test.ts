import { clamp } from '../src/utils';

describe('clamp', () => {
  it('14 should clamp to 10', () => {
    expect(clamp(14, 0, 10)).toBe(10);
  });

  it('-1 should clamp to 0', () => {
    expect(clamp(-1, 0, 10)).toBe(0);
  });
});
