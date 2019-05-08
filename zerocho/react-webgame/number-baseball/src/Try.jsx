import React, { memo, useState } from "react";

const Try = memo(({ item }) => {
  const [value, setValue] = useState(item.try);

  const onChangeInput = e => {
    setValue(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    console.log(value);
  };

  return (
    <li>
      <div>{item.try}</div>
      <div>{item.result}</div>
      <form onSubmit={onSubmit}>
        <input defaultValue={item.try} onChange={onChangeInput} />
      </form>
    </li>
  );
});

export default Try;
