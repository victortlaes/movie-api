import { useState, useEffect } from 'react';

const useDebouncedValue = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Limpa o timeout quando o valor muda
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebouncedValue;
