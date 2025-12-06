// import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import Divider from '@mui/material/Divider';
import Todo from './todo.jsx';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { TodoContext } from '../context/todoContext.js';

import { v4 as uuidv4 } from 'uuid';




export default function Todolist() {

  const [title, setTitle] = useState("");
  const { todos, setodos } = useContext(TodoContext);

  const [todoTypes, settodoTypes] = useState("ALL");

  // 1. الحل لمشكلة الـ map
  useEffect(() => {
    const storageData = localStorage.getItem("todos");
    // إذا وجد بيانات يحللها، وإلا يعيد مصفوفة فارغة
    const parsedTodos = storageData ? JSON.parse(storageData) : [];
    setodos(parsedTodos);
  }, []); // تأكد من أن setodos لا تتسبب في loop، يفضل إبقاؤها فارغة هنا

  const ACTHVEDtodoTypes = todos.filter((t) => {
    return t.isComplete
  })

  const CANELEDDtodoTypes = todos.filter((t) => {
    return !t.isComplete
  })

  let filtertodo = todos;
  if (todoTypes == "COMPLATED") {
    filtertodo = ACTHVEDtodoTypes;
  }
  else if (todoTypes == "UNCOMPLATED") {
    filtertodo = CANELEDDtodoTypes
  }
  else {
    filtertodo = todos
  }



  const todoJsx = filtertodo.map((t) => {
    return <Todo key={t.id} todo={t} />
  });



  function chnageTodoTypes(e) {
    settodoTypes(e.target.value)


  }

  // 2. الحل لمشكلة الحفظ
  function handleAddTask() {
    const newtodo = {
      id: uuidv4(),
      title: title,
      details: "",
      isComplete: false
    };

    const updatedList = [...todos, newtodo];
    setodos(updatedList); // تحديث الـ State
    localStorage.setItem("todos", JSON.stringify(updatedList)); // تحديث الـ LocalStorage
    setTitle("");
  }

  return (
    <Container maxWidth="sm" background="#cb2121ff">
      <Card sx={{ minWidth: 275 }} style={{maxHeight:"80vh", overflow:"scroll" }}>
        <CardContent>
          <Typography variant='h2' >
            My Tasks
          </Typography>


          <Divider style={{ background: "red" }} />
          <ToggleButtonGroup style={{ marginTop: '5px' }}

            exclusive

            aria-label="text alignment"
            value={todoTypes}
            onChange={chnageTodoTypes}

          >
            <ToggleButton value="ALL" aria-label="left aligned">
              all
            </ToggleButton>
            <ToggleButton value="COMPLATED" aria-label="centered">
              Complated
            </ToggleButton>
            <ToggleButton value="UNCOMPLATED" aria-label="right aligned">
              UnComplated
            </ToggleButton>

          </ToggleButtonGroup>
          {/* <Todo/> */}
          {todoJsx}

          <Grid container spacing={2} style={{ marginTop: "20px" }} >
            <Grid size={8}
              display="flex"
              justifyContent="space-around"
              alignItems="center">
              <TextField id="outlined-basic" label="Title" variant="outlined" sx={{ width: "100%" }}
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
            </Grid>
            <Grid size={4} display="flex" justifyContent="space-around" alignItems="center">
              <Button variant="contained" sx={{ width: "100%", height: "100%" }}
                onClick={() => {
                  handleAddTask()

                }  }
                disabled ={title.length ==0} >Add </Button>
            </Grid>

          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>

    </Container>);
}
