
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentTable from '../../student_records/src/studentTable';
import CreateStudent from "./CreateStudent";
import EditStudent from './EditStudent';
import ViewDetails from './ViewDetail';


function App() {

  return (
 <BrowserRouter>
 <Routes>
  <Route path="/" element ={<StudentTable/>}></Route>
  <Route path="/student/create" element={<CreateStudent/>}></Route>
  <Route path="/student/edit/:studentid" element={<EditStudent/>}></Route>
 <Route path="/student/view/:studentid" element={<ViewDetails/>}></Route>
 </Routes>
 </BrowserRouter>
  
  )
}

export default App
