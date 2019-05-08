import React from "react";

const ResponseCheckResult = ({ onReset, result }) => {

  return (
    <>
      {result.length !== 0 && (
        <div>
          <div>
            평균시간: {result.reduce((a, c) => a + c) / result.length} ms
          </div>
          <button onClick={onReset}>리셋</button>
        </div>
      )}
    </>
  );
};

export default ResponseCheckResult;
