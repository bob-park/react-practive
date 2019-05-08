import React from "react";
import GuGuDan from "./GuGuDan";
import CheckBox from "./CheckBox";

const checkboxs = [
  {
    id: "video",
    value: "video",
    checked: true
  },
  {
    id: "audio",
    value: "audio",
    checked: true
  },
  {
    id: "image",
    value: "image",
    checked: true
  }
];

function App() {
  const mediaTypes = ["image "];

  const temp = checkboxs.slice(0);

  if (mediaTypes.length !== 0) {
    temp.forEach(type => (type.checked = mediaTypes.includes(type.id)));
  }

  console.log(temp);

  return (
    <div>
      <GuGuDan />
      <CheckBox mediaTypes={temp} />
    </div>
  );
}

export default App;
