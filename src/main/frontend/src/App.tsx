import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './component/Index';
import GlobalStyles from './styles/GlobalStyles';
import Create from './component/Create';
import Complete from './component/Complete';
import Modify from './component/Modify';
import Signup from './component/user/Signup';
import Login from './component/user/Login';

export type WrapperProps = {
  children?: React.ReactNode;
  props?: React.ReactNode;
  type?: "submit";
  onClick?: () => void;
  placeholder?: string;
  value?: string;
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GlobalStyles />
        <Routes>
          <Route path='/' element={<Index />}></Route>
          <Route path='/create' element={<Create />}></Route>
          <Route path='/complete/:DiaryId' element={<Complete />}></Route>
          <Route path='/modify/:DiaryId' element={<Modify />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
