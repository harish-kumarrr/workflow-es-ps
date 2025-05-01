import React, { useEffect, useState } from "react";

function App() {
  const [arr] = useState([2, 4, 5, 1, 3, 7]);
  const [prefix, setPrefix] = useState([]);

  useEffect(() => {
    const ps = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
      ps[i] = ps[i - 1] + arr[i];
    }
    console.log("psps",ps)
    setPrefix(ps);
  }, [arr]);

  const getRangeSum = (i, j) => (i === 0 ? prefix[j] : prefix[j] - prefix[i - 1]);

  return (
    <div>
      <h2>Array: {arr.join(", ")}</h2>
      <p>Sum(1, 3): {getRangeSum(1, 3)}</p>
      <p>Sum(0, 5): {getRangeSum(0, 5)}</p>
    </div>
  );
}

export default App;
