import { useState } from "react";
import "./App.css";
import Button from "./Button";
import Chess from "./Chess";

const isShowButtom = false;
const list = [1, 2, 3, 5];
function App() {
  const [count, setCount] = useState(0);
  const [allCount, setAllCount] = useState(0);
  const handleClick = (item) => {
    console.log(item, "iitem");
    setCount(count + 1);
  };

  const clickBtn = () => {
    setAllCount(allCount + 1);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Chess></Chess>
        {isShowButtom ? <Button></Button> : <span>null</span>}
        <Button allCount={allCount} clickBtn={clickBtn}></Button>
        <Button allCount={allCount} clickBtn={clickBtn}></Button>
        {list.map((item) => (
          <span
            key={item}
            onClick={() => {
              handleClick(item);
            }}
          >
            {item}+'listItem'+{count + item}
          </span>
        ))}
      </header>
    </div>
  );
}

export default App;
