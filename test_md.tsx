import React from 'react';
import { renderToString } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';

const md = "Here is `inline` code.\n\n```\nblock code\n```";

const Test = () => (
  <ReactMarkdown
    components={{
      code(props) {
        const {children, className, node, ...rest} = props
        console.log("CODE PROPS:", Object.keys(props));
        console.log("NODE PARENT:", node?.parent?.tagName);
        return <code>{children}</code>;
      }
    }}
  >
    {md}
  </ReactMarkdown>
);

console.log(renderToString(<Test />));
