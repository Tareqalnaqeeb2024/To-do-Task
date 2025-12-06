import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import {  useContext,  useState } from 'react';
import { TodoContext } from '../context/todoContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


export default function Todo({ todo  }) {
  const [showOpenDeleteDialog,SetshowOpenDeleteDialog] =useState(false);
  const [showOpenUpdateDialog,SetshowOpenUpdateDialog] =useState(false);
  const [updatedTodo , setupdatetodo] = useState({title:todo.title ,details:todo.details})
const {todos, setodos} = useContext(TodoContext)
  function handleCheckValue(){
       const updatedTodo = todos.map( (t) => {
      if(t.id == todo.id)
      {
        t.isComplete =!t.isComplete
      }
      return t;
    } )
    localStorage.setItem("todos", JSON.stringify(updatedTodo)); // تحديث الـ LocalStorage
    
    setodos(updatedTodo)
  }
  function handleOpenDeleteModle()
  {
    SetshowOpenDeleteDialog(true)
  }
  function handleOpenUpdateModle()
  {
    SetshowOpenUpdateDialog(true)
  }
  function handleCloseDeleteDialog()
  {
    SetshowOpenDeleteDialog(false)
  }
  function handleCloseUpdateDialog()
  {
    SetshowOpenUpdateDialog(false)
  }
  function handleConfirmDelete()
  {
    const updatedTodo = todos.filter((t) =>{
      if(t.id == todo.id)
      {
        return false
      }
      else{
        return true;
      }
    })

    // new way return t.id != todo.id
    localStorage.setItem("todos", JSON.stringify(updatedTodo)); // تحديث الـ LocalStorage
    setodos(updatedTodo)
   
  }
function handleConfirmUpdate() {

  const newTodos = todos.map((t) => {
    if (t.id == todo.id) {
      return {
        ...t,
        title: updatedTodo.title,
        details: updatedTodo.details
      };
    }
    return t;
  });
  
  setodos(newTodos);
  SetshowOpenUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodo)); // تحديث الـ LocalStorage

  // localStorage.setItem("todos",JSON.stringify(updatedTodo))q
}
 


  return (
    <> 
    {/* delete Dialog */}
        <Dialog
        open={showOpenDeleteDialog}
         onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confrimed Canacled?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            are you sure to delete this item
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} >canacel</Button>
          <Button  autoFocus 
           onClick={handleConfirmDelete}>
            yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* UpdateDialog */}
          <Dialog
        open={showOpenUpdateDialog}
         onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Update Task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Update task with Details
          </DialogContentText>
          <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="text"
              label="task title"
              type="text"
              fullWidth
              variant="standard"
              value={updatedTodo.title}
              onChange= {(e ) => {
                setupdatetodo({...updatedTodo, title: e.target.value})
                
              } 
             }

            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="text"
              label="task Details"
              type="text"
              fullWidth
              variant="standard"
              value={updatedTodo.details}
              onChange={(e) => {
                setupdatetodo({...updatedTodo , details:e.target.value})
              }}
            />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog} >canacel</Button>
          <Button  autoFocus 
           onClick={handleConfirmUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Card
        className='todocard' sx={{ minWidth: 500, background: "#250d0dff", color: "#ffffff", marginTop: 5 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8} >
              <Typography variant='h4'sx={{ textAlign:'center', textDecoration : todo.isComplete ? "line-through":"none"}} >
                {todo.title}

              </Typography>
              <Typography variant='h6' >
                {todo.details}
              </Typography>
            </Grid>
            <Grid size={4} display="flex" justifyContent="space-around" alignItems="center" >
              <IconButton className='iconButton' aria-label="delete" style={{
                color:todo.isComplete? "white": "green" ,
                background: todo.isComplete? "green": "white",
                border: "soild #8bc34a 3px"
              }} onClick={ () => handleCheckValue()} >
                {/* <DeleteIcon /> */}
                <CheckIcon />
              </IconButton>
              <IconButton className='iconButton' aria-label="delete" style={{
                color: " #210965ff",
                background: "white",
                border: "soild #210965ff 3px"
              }} 
               onClick={() => handleOpenUpdateModle()} >
                {/* <DeleteIcon /> */}
                <ModeEditRoundedIcon />
              </IconButton>
              <IconButton className='iconButton' aria-label="delete" style={{
                color: "#be2509ff",
                background: "white",
                border: "soild #be2509ff 3px"
              }} 
              onClick={handleOpenDeleteModle} >
               
                <DeleteOutlineRoundedIcon />
              </IconButton>
            </Grid>
            <CardActions>
              {/* <Button size="small">Learn More</Button> */}
            </CardActions>
          </Grid>
        </CardContent>
      </Card>
    </>
  );

}