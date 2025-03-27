import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-okaidia.css";
import axios from "axios";
import "./App.css";

const App = () => {
  const [code, setCode] = useState("function sum (){return a+b}");
  const [review, setReview] = useState("");

  const handleReview = async () => {
    try {
      const response = await axios.post("http://localhost:3000/ai/getReviwe", { code });
      console.log(response);
      console.log(response.data);
      // Highlight the review text before setting it
      const highlightedReview = Prism.highlight(
        response.data,
        Prism.languages.javascript,
        "javascript"
      );
      setReview(highlightedReview);
    } catch (error) {
      console.log("Axios Error:", error.message);
      setReview("Error: Could not fetch review. Check server or network.");
    }
  };

  const highlightCode = (code) => {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  };

  return (
    <main style={{ display: "flex", height: "100vh", gap: "20px", padding: "20px" }}>
      <div className="left" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
        <div className="code" style={{ flex: 1 }}>
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
              fontFamily: "monospace",
              overflow: "auto",
            }}
          />
        </div>
        <div
          className="review"
          onClick={handleReview}
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            textAlign: "center",
            borderRadius: "0.7rem",
            cursor: "pointer",
          }}
        >
          Review
        </div>
      </div>
      <div
        className="right"
        style={{
          flex: 1,
          backgroundColor: "rgb(29, 29, 29)",
          borderRadius: "0.7rem",
          padding: "16px",
          overflow: "auto",
        }}
      >
        <pre style={{ margin: 0 }}>
          <code
            className="language-javascript"
            dangerouslySetInnerHTML={{
              __html: review || "Reviewed code will appear here...",
            }}
          />
        </pre>
      </div>
    </main>
  );
};

export default App;