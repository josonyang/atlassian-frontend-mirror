import { useCallback, useEffect, useRef, useState } from 'react';

export default function useControlled<T>(
  propValue: T | undefined,
  getDefaultPropValue: () => T,
) {
  const isControlled = propValue !== undefined;
  const [valueState, setValue] = useState(getDefaultPropValue);
  const isControlledRef = useRef(isControlled);

  useEffect(() => {
    isControlledRef.current = isControlled;
  }, [isControlled]);

  const value = isControlled ? propValue : valueState;

  const setValueIfUncontrolled = useCallback((newValue: T) => {
    if (!isControlledRef.current) {
      setValue(newValue);
    }
  }, []);

  return [value as T, setValueIfUncontrolled] as const;
}
