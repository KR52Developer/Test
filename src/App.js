import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Questions from './Components/Questions';
import FinalScore from './Components/FinalScore';
import { Box, Container } from '@mui/material';
import Login from './Components/Login';
import Register from './Components/Register';
import UserProfile from './Components/UserProfile';
import { New } from './Components/New';


function App () {
  return (
    <Router>
      <Container maxWidth="sm">
        <Box textAlign='center' mt={15}>
          <Routes>
            <Route path='/' element={<Register />} />
            <Route path="/new" element={<New />} />
            {/* <Route path='/login' element={<Login />} /> */}
            <Route path='/login' element={<Login />} />
            <Route path='/home/:id' element={<Home />} />
            <Route path='/questions/:id' element={<Questions />} />
            <Route path='/score/:id' element={<FinalScore />} />
            <Route path='/user-profile/:id' element={<UserProfile />} />
          </Routes>
        </Box>
      </Container>
    </Router>

  );
}

export default App;
