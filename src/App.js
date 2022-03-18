
import React, { useState, useCallback  } from 'react';


const suma = (a, b) => a + b;

const useCounter = () => {
  const [count, setCount] = useState(0)
  const increment = useCallback(() => setCount(suma(count, 1)), [count])
  return { count, increment }
}

const Counter = () => {
  const {count, increment} = useCounter();
  const handleClick = () => {
    increment()
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}

export {suma, Counter, useCounter};
