import React, { useState } from "react";
const funkyChars = {
  " ": " ",
  "☁": "☁",
  "☂": "☂",
  "☃": "☃",
  "☄": "☄",
  "★": "★",
  "☆": "☆",
  "☇": "☇",
  "☈": "☈",
  "☉": "☉",
  "☊": "☊",
  "☋": "☋",
  "☌": "☌",
  "☍": "☍",
  "☎": "☎",
  "☏": "☏",
  "☠": "☠",
  "☡": "☡",
  "☢": "☢",
  "☣": "☣",
  "☤": "☤",
  "☥": "☥",
  "☦": "☦",
  "☧": "☧",
  "☨": "☨",
  "☩": "☩",
  "☪": "☪",
  "☫": "☫",
  "☬": "☬",
  "☭": "☭",
  "☮": "☮",
  "☯": "☯",
};

const alphabet = "abcdefghijklmnopqrstuvwxyz.!?";

export function Decode() {
  const [funky, setFunky] = useState(funkyChars);
  const [letter, setLetter] = useState("a");
  const [phrase, setPhrase] = useState("☈☉ ☌☉☦");

  return (
    <div style={{ border: "solid 2px grey", margin: "10%", padding: "20px" }}>
      <div style={{ color: "green", fontSize: "40px" }}>GUESS THE CODE</div>
      Current Letter:
      <input
        onChange={(evt) => {
          const newLetter =
            evt.currentTarget.value[evt.currentTarget.value.length - 1];
          if (newLetter) {
            setLetter(newLetter.toLowerCase());
          }
        }}
        value={letter}
      />
      <div style={{ fontSize: "42px" }}>
        {phrase.split("").map((key) => {
          return (
            <span
              style={{
                color: "rgba(0,0,0,0.6)",
                display: "inline-block",
                marginRight: "2px",
              }}
            >
              {key}
            </span>
          );
        })}
        <br />
        {phrase.split("").map((key) => {
          return (
            <span
              style={{
                color: key === funky[key] ? "black" : "gray",
                textDecoration: key === funky[key] ? "underline" : "none",
                display: "inline-block",
                marginRight: "2px",
                cursor: "pointer",
              }}
              onClick={() => {
                if (key !== " ") {
                  setFunky({ ...funky, [key]: letter });
                }
              }}
            >
              {funky[key] === " " ? <>&nbsp;</> : funky[key]}
            </span>
          );
        })}
      </div>
      <div>
        {phrase.split("").map((key) => {
          return (
            <span
              style={{
                color: "gray",
              }}
            >
              {funky[key] !== key ? (
                <div>
                  {key} is {funky[key]}
                </div>
              ) : null}
            </span>
          );
        })}
      </div>
      <div style={{ marginTop: "40px", color: "red", fontSize: "40px" }}>
        SET A NEW CODE
      </div>
      <EncodeMessage
        setPhrase={(phr) => {
          setFunky(funkyChars);
          setPhrase(phr);
        }}
      />
    </div>
  );
}

function EncodeMessage({ setPhrase }) {
  const [message, setMessage] = useState("");

  const translatedMessage = message
    .split("")
    .map((letter) => {
      const idx = alphabet.split("").indexOf(letter) + 1;

      return Object.keys(funkyChars)[idx];
    })
    .join("")
    .trim();

  return (
    <div>
      <input
        value={message}
        onChange={(evt) => {
          setMessage(evt.currentTarget.value.toLowerCase());
        }}
      />
      <div>{translatedMessage}</div>
      <button
        onClick={() => {
          if (translatedMessage !== "") {
            setPhrase(translatedMessage);
            setMessage("");
          }
        }}
      >
        Set Code Phrase
      </button>
    </div>
  );
}
