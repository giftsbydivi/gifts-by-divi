// This file is intentionally formatted poorly and has lint issues
// When you commit, Husky should run lint-staged to fix these issues

import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';

const TestComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
    </div>
  );
};

export default TestComponent;
