import React, { useState } from 'react';

function Count() {
    let [count, setCount] = useState(1);

    return (
        <div>
            <h1>Count :{count}</h1>
            <button onClick={() => setCount(count + 1)}>Add</button>
        </div>
    );
}

export default Count;
