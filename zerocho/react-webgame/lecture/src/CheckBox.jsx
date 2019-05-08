import React, { useState, useEffect } from "react";



const CheckBox = ({ mediaTypes }) => {
  const [all, setAll] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes);

  useEffect(() => {
    const length = mediaType.filter(type => type.checked === true).length;
    if (length === mediaType.length) {
      setAll(true);
    } else {
      setAll(false);
    }
  }, [mediaType]);

  const handleChangeAll = checked => {
    setMediaType(prevMediaType =>
      prevMediaType.map(type => ({
        ...type,
        checked
      }))
    );
    setAll(checked);
  };

  const handleChangeCheckBox = e => {
    const { id, checked } = e.target;
    const temp = mediaType.splice(0);

    temp.forEach(type => {
      if (type.id === id) {
        type.checked = checked;
      }
    });

    setMediaType(temp);
  };

  return (
    <div>
      <div>
        <input
          type="checkbox"
          id="all"
          checked={all}
          onChange={e => handleChangeAll(e.target.checked)}
        />
        <label htmlFor="all">전체</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="video"
          checked={
            mediaType[mediaType.findIndex(type => type.id === "video")].checked
          }
          onChange={handleChangeCheckBox}
        />
        <label htmlFor="video">비디오</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="audio"
          checked={
            mediaType[mediaType.findIndex(type => type.id === "audio")].checked
          }
          onChange={handleChangeCheckBox}
        />
        <label htmlFor="audio">오디오</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="image"
          checked={
            mediaType[mediaType.findIndex(type => type.id === "image")].checked
          }
          onChange={handleChangeCheckBox}
        />
        <label htmlFor="image">이미지</label>
      </div>
    </div>
  );
};

export default CheckBox;
