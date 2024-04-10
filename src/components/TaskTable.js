import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TaskRow from "./TaskRow";

const TaskTable = (props) => {
  const tasks = props.tasks;
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: "90vh" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Desciprtion</TableCell>
            <TableCell align="center">Deadline</TableCell>
            <TableCell align="center">Priority</TableCell>
            <TableCell align="center">Is Complete</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <TaskRow
              key={index}
              deleteTask={props.deleteTask}
              updateTask={props.updateTask}
              task={task}
              index={index}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
};

export default TaskTable;
