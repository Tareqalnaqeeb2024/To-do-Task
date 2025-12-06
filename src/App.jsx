
import './App.css'
import Todolist from './components/todolist.jsx';
// import todolist from './components/Todolist.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { TodoContext } from './context/todoContext.js';

const initaltodos = [
  {
    "id": uuidv4(),
    "title": "Fix Code Bug",
    "details": "Discuss the new interest rate options.",
    "isComplete": true
  },
  {
    "id": uuidv4(),
    "title": "Plan Weekend Trip",
    "details": "Check flight and hotel availability for the mountains.",
    "isComplete": false
  },
  {
    "id": uuidv4(),
    "title": "Read a Chapter",
    "details": "The final draft is due by 5 PM today.",
    "isComplete": true
  },
  {
    "id": uuidv4(),
    "title": "Call the Bank",
    "details": "Experiment with the useReducer hook.",
    "isComplete": true
  },
  {
    "id": uuidv4(),
    "title": "Schedule Dentist",
    "details": "Focus on the section about asynchronous programming.",
    "isComplete": false
  }
]


const customTheme = createTheme({
  palette: {
    primary: {
      main: '#0a75e882', // لون أساسي أخضر غامق
    },
    secondary: {
      main: '#a08b7aff', // لون ثانوي برتقالي
    },
  },
  typography: {
    fontFamily: 'Alexandria', // تغيير خط التطبيق بالكامل
  },
});

function App() {

  const [todos, setodos] = useState(initaltodos);
  return (
    <ThemeProvider theme={customTheme}>
      < div className="App"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f0f0f0",
          height: "100vh"
        }}>
        <TodoContext.Provider value={{todos,setodos}}>

          <Todolist />
        </TodoContext.Provider>


      </div>
    </ThemeProvider>
  )
}

export default App
