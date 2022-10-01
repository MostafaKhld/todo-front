import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Unstable_Grid2";
import { saveTodo, getTodo } from "../services/todoService";
import MenuItem from "@mui/material/MenuItem";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteTodo } from "./../services/todoService";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

function Todo() {
  const [state, setState] = useState({
    TODO: {
      title: "TODO",
      items: [],
    },
    INProgress: {
      title: "IN progress",
      items: [],
    },
    UnderReview: {
      title: "Under-Review",
      items: [],
    },
    Rework: {
      title: "Rework",
      items: [],
    },
    Completed: {
      title: "Completed",
      items: [],
    },
  });
  const [open, setOpen] = useState(false);
  const [_id, setId] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  async function populateTodos() {
    const { data } = await getTodo();
    let oldState = { ...state };
    oldState["TODO"] = data.TODO ? data.TODO : oldState["TODO"];
    oldState["INProgress"] = data.INProgress
      ? data.INProgress
      : oldState["INProgress"];
    oldState["UnderReview"] = data.UnderReview
      ? data.UnderReview
      : oldState["UnderReview"];
    oldState["Rework"] = data.Completed ? data.Rework : oldState["Rework"];
    oldState["Completed"] = data.Completed
      ? data.Completed
      : oldState["Completed"];

    setState(oldState);
  }

  const [Priority, setPriority] = useState("");

  const handleChange = (event) => {
    setPriority(event.target.value);
  };
  useEffect(() => {
    populateTodos();
  }, []);
  const handleDragEnd = async ({ destination, source }) => {
    console.log(destination);
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    // Creating a copy of item before removing it from state
    let itemCopy = { ...state[source.droppableId].items[source.index] };
    console.log(state[source.droppableId]);
    console.log(state[destination.droppableId]);
    setState((prev) => {
      prev = { ...prev };
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1);

      // Adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );
      itemCopy.status = destination.droppableId;

      return prev;
    });
    await saveTodo(itemCopy);
  };

  const handleDelete = async (todo) => {
    await deleteTodo(todo._id);
    await populateTodos();
  };

  const handleEdit = async (todo) => {
    setId(todo._id);
    handleOpen();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const x = new FormData(event.currentTarget);
    try {
      await saveTodo({
        _id: _id,
        title: x.get("title"),
        description: x.get("description"),
        priority: Priority,
      });

      toast.success("Added");
      handleClose();
      setId("");
      populateTodos();
    } catch (ex) {
      if (ex.response) {
        toast.error(ex.response.data.message);
      }
    }
  };

  return (
    <>
      <Box component="div" sx={{ p: 1, m: 1 }}>
        {/* <button onClick={addItem}>Add</button> */}
        <Button onClick={handleOpen} variant="contained" color="secondary">
          New Task
        </Button>
      </Box>
      <Grid container spacing={1}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <List
                key={key}
                className={"column"}
                style={{ marginRight: "5px" }}
              >
                <h3>{data.title}</h3>
                <Droppable droppableId={key} style={{ paddingBottom: "10px" }}>
                  {(provided, snapshot) => {
                    return (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={"droppable-col"}
                        disablePadding
                      >
                        {data.items.map((el, index) => {
                          return (
                            <Draggable
                              key={el._id}
                              index={index}
                              draggableId={el._id}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <Grid
                                    container
                                    spacing={1}
                                    margin={1}
                                    className={`item  ${
                                      snapshot.isDragging && "dragging"
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Grid item xs={12}>
                                      {el.title}
                                    </Grid>
                                    <Grid item xs={12}>
                                      Description: {el.description}
                                    </Grid>
                                    <Grid item xs={12}>
                                      Priority: {el.priority}
                                    </Grid>
                                    <Grid item>
                                      <Button
                                        variant="contained"
                                        color="warning"
                                        onClick={() => handleEdit(el)}
                                      >
                                        {" "}
                                        <EditIcon />
                                      </Button>
                                    </Grid>
                                    <Grid justifyContent="flex-end" item>
                                      <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(el)}
                                      >
                                        {" "}
                                        <DeleteForeverIcon />
                                      </Button>
                                    </Grid>
                                  </Grid>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </ListItem>
                    );
                  }}
                </Droppable>
              </List>
            );
          })}
        </DragDropContext>
      </Grid>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5" component="h2">
              New Todo
            </Typography>
            <hr></hr>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="title"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="description"
                    label="Description "
                    name="description"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Priority"
                    value={Priority}
                    onChange={handleChange}
                    helperText=""
                    fullWidth
                    required
                  >
                    <MenuItem key={"High"} value={"High"}>
                      {"High"}
                    </MenuItem>
                    <MenuItem key={"Medium"} value={"Medium"}>
                      {"Medium"}
                    </MenuItem>
                    <MenuItem key={"Low"} value={"Low"}>
                      {"Low"}
                    </MenuItem>
                  </TextField>
                  {/* <TextField
                    required
                    fullWidth
                    name="priority"
                    label="Priority"
                    id="priority"
                  /> */}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
              <Grid container justifyContent="flex-end"></Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default Todo;
