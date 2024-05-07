import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Boards from "./component/boards/Boards";
import ToggleThemeBtn from "./theme/ToggleThemeBtn";
import MyBoards from "./component/myBoards/MyBoards";



function App() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to={"/Lectureboards"}>보드</Link>
        </li>
        <li>
          <Link to={"/myBoard"}>내가만든Board</Link>
        </li>
        <li>
        </li>
      </ul>
      <Routes>
        <Route path="/Lectureboards" element={<Boards />}/>
        <Route path="/myBoard" element={<MyBoards />}/>
      </Routes>
      <ToggleThemeBtn />
    </BrowserRouter>
  );
}

export default App;