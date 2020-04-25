import { createContext } from 'react';

export const SegmentedContext = createContext<{
  selectedName: string | null | undefined;
  onChange: ((name: string) => void) | undefined;
} | null>(null);
