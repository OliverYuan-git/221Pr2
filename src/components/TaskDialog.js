import { useState } from "react";
import dayjs from "dayjs";
// MUI date picker components
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// Material-UI components and icons
import { Box, AppBar, Toolbar, Dialog, DialogContent, Button, TextField, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

const TaskDialog = (props) => {
  const [title, setTitle] = useState(!props.add ? props.task.title : "");
  const [description, setDescription] = useState(!props.add ? props.task.description : "");
  const [deadline, setDeadline] = useState(!props.add ? dayjs(props.task.deadline, "MM/DD/YY") : dayjs());
  const [priority, setPriority] = useState(!props.add ? props.task.priority : "Low");
  const [titleError, setTitleError] = useState(0);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleCloseExtra = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setTitleError(false);
    setDescriptionError(false);
    setTitle("");
    setDescription("");
    setDeadline(dayjs());
    setPriority("Low");
    props.handleClose();
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDeadlineChange = (newValue) => {
    setDeadline(newValue);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const addSubmitHandler = () => {
    // Initialize the validation flag as true
    let isValid = true;
  
    // Check for empty title
    if (!title) {
      setTitleError(1);
      isValid = false;
    // Check for duplicate titles
    } else if (props.tasks.some((e) => e.title === title)) {
      setTitleError(2);
      isValid = false;
    }
  
    if (isValid) setTitleError(0);
  
    // Check for empty description
    if (!description) {
      setDescriptionError(true);
      isValid = false;
    }
  
    // If all validations pass
    if (isValid) {
      props.addTask({
        title,
        description,
        deadline: deadline.format("MM/DD/YY"),
        priority,
        isComplete: false,
      });
  
      props.handleClose();
      resetFormFields();
    }
  };
  
  const resetFormFields = () => {
    setTitle("");
    setDescription("");
    setDeadline(dayjs());
    setPriority("Low");
    // Reset errors
    setTitleError(0);
    setDescriptionError(false);
  };
  
  

  const updateSubmitHandler = () => {
    if (description === "") {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
      props.handleClose();
      props.updateTask(props.index, {
        title: props.task.title,
        description: description,
        deadline: deadline.format("MM/DD/YY").toString(),
        priority: priority,
        isComplete: false,
      });
      setTitle("");
      setDescription("");
      setDeadline(dayjs());
      setPriority("Low");
    }
  };

  return (
    <Dialog open={props.open} onClose={handleCloseExtra}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          {props.add ? <AddCircleIcon /> : <EditNoteIcon />}
          <span>&nbsp;{props.add ? 'Add Task' : 'Edit Task'}</span>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
          {props.add && (
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              value={title}
              onChange={handleTitleChange}
              error={titleError > 0}
              helperText={getTitleHelperText(titleError)}
            />
          )}
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
            error={descriptionError}
            helperText={descriptionError ? "Description is Required!" : ""}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Deadline"
              value={deadline}
              onChange={handleDeadlineChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
          <FormLabel>Priority</FormLabel>
          <RadioGroup
            row
            name="priority"
            value={priority}
            onChange={handlePriorityChange}
            sx={{ marginBottom: '1em' }}
          >
            <FormControlLabel value="Low" control={<Radio />} label="Low" />
            <FormControlLabel value="Med" control={<Radio />} label="Med" />
            <FormControlLabel value="High" control={<Radio />} label="High" />
          </RadioGroup>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={props.add ? addSubmitHandler : updateSubmitHandler}
              variant="contained"
              startIcon={props.add ? <AddCircleIcon /> : <EditNoteIcon />}
            >
              {props.add ? 'Add' : 'Edit'}
            </Button>
            <Button
              variant="contained"
              startIcon={<DoDisturbIcon />}
              onClick={handleCloseExtra}
              color="error"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
  
  function getTitleHelperText(errorCode) {
    switch (errorCode) {
      case 1:
        return "Title is Required!";
      case 2:
        return "Title already exists!";
      default:
        return "";
    }
  }
}  

export default TaskDialog;
