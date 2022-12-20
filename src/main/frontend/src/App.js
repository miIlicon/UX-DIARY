import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './component/Index.jsx';
import GlobalStyles from './styles/GlobalStyles';
import Create from './component/Create';
import Complete from './component/Complete';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GlobalStyles />
        <Routes>
          <Route path='/' element={<Index />}></Route>
          <Route path='/create' element={<Create />}></Route>
          <Route path='/complete' element={<Complete />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
