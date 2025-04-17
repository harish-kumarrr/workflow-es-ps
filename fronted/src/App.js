"use strict";
import React, { memo } from "react";
const Child = memo(({ obj }) => {
  console.log("Childcomponentrendered");
  return (
    <div>
      <h1>Child Component {obj?.no}</h1>
    </div>
  );
});
function App() {
  const [count, setCount] = React.useState(0);
  return (
    <div className="App">
      <h1>Parent Component {count}</h1>
      <Child no={{ obj: { no: 12 } }} />
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        Click me
      </button>
    </div>
  );
}

export default App;
