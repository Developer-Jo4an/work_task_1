import React from "react";
import parse from 'html-react-parser';

export function safeHTML(htmlString, key) {
  return (
    <React.Fragment key={key}>
      {parse(htmlString, {
        replace(domNode) {
          const {name} = domNode;
          if (name === "script") return (<></>);
          return domNode;
        }
      })}
    </React.Fragment>
  );
}
