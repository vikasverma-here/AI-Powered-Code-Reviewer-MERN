import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-okaidia.css";
import axios from "axios";
import "./App.css";

const App = () => {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");

  const handleReview = async () => {
    try {
      const response = await axios.post("http://localhost:3000/ai/getReview", { code }); // Typo fix: getReviwe -> getReview
      console.log(response.data);
      setReview(response.data); 
    } catch (error) {
      console.log("Axios Error:", error.message);
      setReview("Error: Could not fetch review. Check server or network.");
    }
  };

  const highlightCode = (code) => {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  };

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={highlightCode}
            padding={16}
            className="editor"
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "0.7rem",
              backgroundColor: "rgb(29, 29, 29)",
              color: "white",
            }}
          />
        </div>
        <div className="review" onClick={handleReview}>
          Review
        </div>
      </div>
      <div className="right">
        <pre>
          <code className="language-javascript">
            {review || "Reviewed code will appear here..."}
          </code>
        </pre>
      </div>
    </main>
  );
};

export default App;