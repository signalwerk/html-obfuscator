import React, { useState } from "react";

import InnerHTML from "./DangerouslySetHtmlContent";

import "./App.css";

// https://stackoverflow.com/questions/21647928/javascript-unicode-string-to-hex
const utf8ToHex = str => {
  return Array.from(str)
    .map(c =>
      c.charCodeAt(0) < 128
        ? c.charCodeAt(0).toString(16)
        : encodeURIComponent(c)
            .replace(/%/g, "")
            .toLowerCase()
    )
    .join("");
};
// function hexToUtf8: function(hex) {
//   return decodeURIComponent('%' + hex.match(/.{1,2}/g).join('%'));
// }

const obfuscator = (address, content) => {
  const tag = `<a href="mailto:${address}">${content}</a>`;
  const hex = utf8ToHex(tag);

  const script = `
<script>document.write(decodeURIComponent('%' + '${hex}'.match(/.{1,2}/g).join('%')));</script>
<noscript>Turn on JavaScript to see the email address</noscript>`;

  return { tag, script };
};

function App() {
  const [content, setContent] = useState("demo@example.com");
  const [address, setAddress] = useState("Mail me");
  const { tag, script } = obfuscator(address, content);
  return (
    <div className="App">
      <header className="App-header">
        <h1>mail obfuscator</h1>
      </header>
      <div className="App-content">
        <label>
          <div className="label-text">Address</div>
          <input
            name="use frontmatter"
            type="text"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </label>
        <br />
        <label>
          <div className="label-text">Text</div>
          <input
            name="use frontmatter"
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </label>
        <br />
        <br />
        <h3>HTML-Code</h3>
        <textarea className="App-input" value={script} />
        <br />
        <br />
        <h3>Decoded</h3>
        <code>{tag}</code>
        <br />
        <br />
        <h3>Preview</h3>
        <p dangerouslySetInnerHTML={{ __html: tag }} />
        <br />
        <br />
      </div>
    </div>
  );
}

export default App;
