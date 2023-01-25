import Home from "./component/Home/Home"
import Card from "./component/Card/Card";
import Details from "./component/Details/Details";
import {Routes, Route, BrowserRouter} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />   
        <Route path='/country/:type' element={<Card/>}/>
        <Route path='/details/:name' element={<Details/>} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
