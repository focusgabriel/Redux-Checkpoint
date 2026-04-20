/** @format */

import {
  ADD_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  DELETE_TODO,
  SET_FILTER,
} from "../Constants/action-type";

export const addTodo = (description) => ({
  type: ADD_TODO,
  payload: { id: Date.now(), description, isDone: false },
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const editTodo = (id, description) => ({
  type: EDIT_TODO,
  payload: { id, description },
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});
