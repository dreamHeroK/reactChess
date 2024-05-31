import { useState } from "react";
import "./button.css";

const computedStyle = {
  width: "200px",
  paddingTop: "20px",
};
function Button({allCount,clickBtn}) {
  const [clickBtnTimes, setClickBtnTimes] = useState(0);

  return (
    <button
      className="button"
      style={computedStyle}
      onClick={() => {
        setClickBtnTimes(clickBtnTimes + 1);
        clickBtn()
      }}
    >
      clickBtnTimes{clickBtnTimes}{allCount}
    </button>
  );
}

export default Button;
