import { AppBar, Button, Grid, Toolbar } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TaskDialog from "./TaskDialog";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

const Board = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <AppBar position="static" color="secondary" sx={{ height: "6vh" }}>
        <Toolbar>
          <Grid container>
            <Grid
              item
              sm={6}
              display="flex"
              flexDirection="row-reverse"
              fontSize={"1.25em"}
            >
              <div style={{display: "flex"}}>
                <div style={{paddingTop: "2%"}}>
                <MenuIcon fontSize="medium" />
                </div>
                <span>&nbsp;FRAMEWORK</span>
              </div>
            </Grid>
            <Grid item sm={6} display="flex" flexDirection="row-reverse">
              <Button
                onClick={handleOpen}
                variant="contained"
                startIcon={<AddCircleIcon />}
              >
                Add
              </Button>
              <TaskDialog
                open={open}
                tasks={props.tasks}
                addTask={props.addTask}
                handleClose={handleClose}
                add={true}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
  );
};

export default Board;
