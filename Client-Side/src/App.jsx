import { useState } from "react";
import "./App.css";
import { Counter } from "./components/Counter";

function App() {
  const [count, setCount] = useState(0);

  const onIncrement = () => {
    setCount((prev) => {
      if (prev >= 10) return prev;
      return prev + 1;
    });
  };

  const onDecrement = () => {
    setCount((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  };

  return (
    <>
      <Counter
        count={count}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </>
  );
}

export default App;
