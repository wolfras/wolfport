// src/components/CodeBlock.jsx
import React from 'react';

const CodeBlock = ({ code }) => {
  return (
    <div className="code-block">
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;