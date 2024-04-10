import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import EditNoteIcon from "@mui/icons-material/EditNote";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Button from "@mui/material/Button";
import { useState } from "react";
import TaskDialog from "./TaskDialog";
import { ButtonGroup } from "@mui/material";

const TaskRow = (props) => {
  const { task, index, updateTask, deleteTask } = props;
  const [open, setOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(task.isComplete);

  const handleCheckboxChange = () => {
    setIsComplete(!isComplete);
    updateTask(index, { ...task, isComplete: !isComplete });
  };

  const handleDelete = () => {
    deleteTask(index);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <TableRow>
      <TableCell align="center">{task.title}</TableCell>
      <TableCell align="center">{task.description}</TableCell>
      <TableCell align="center">{task.deadline}</TableCell>
      <TableCell align="center">{task.priority}</TableCell>
      <TableCell align="center">
        <Checkbox value={isComplete} onChange={handleCheckboxChange} />
      </TableCell>
      <TableCell align="center">
        <ButtonGroup orientation="vertical">
          {!isComplete && (
            <Button
              size="small"
              variant="contained"
              startIcon={<EditNoteIcon />}
              onClick={handleOpen}
            >
              Update
            </Button>
          )}
          <Button
            size="small"
            variant="contained"
            startIcon={<RemoveCircleIcon />}
            onClick={handleDelete}
            color="error"
          >
            Delete
          </Button>
        </ButtonGroup>
        <TaskDialog
          index={props.index}
          task={task}
          updateTask={props.updateTask}
          open={open}
          handleClose={handleClose}
          add={false}
        />
      </TableCell>
    </TableRow>
  );
};

export default TaskRow;
