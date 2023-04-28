import {
  ADD_TODO,
  REMOVE_TODO,
  IS_COMPLETED,
  IS_ACTIVE,
  CLEAR_COMPLETED,
  START_EDIT,
  END_EDIT,
  LOCAL_STORAGE,
} from "./action"

type InitialStatePrpos = {
  todos: []
  isEdit: boolean
  editID: number
  editContent: string
}
const initialState: InitialStatePrpos = {
  todos: [],
  isEdit: false,
  editID: 0,
  editContent: "",
}

const reducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  if (action.type === ADD_TODO) {
    const newTodos = [
      ...state.todos,
      {
        id: new Date().getTime(),
        content: action.payload,
        type: "active",
      },
    ]
    return { ...state, todos: newTodos }
  }
  if (action.type === REMOVE_TODO) {
    const newTodos = state.todos.filter(
      (item: any) => item.id !== action.payload
    )
    return { ...state, todos: newTodos }
  }
  if (action.type === IS_ACTIVE) {
    const newTodos = state.todos.map((item: any) => {
      if (item.id === action.payload) {
        return { ...item, type: "active" }
      }
      return item
    })
    return { ...state, todos: newTodos }
  }
  if (action.type === IS_COMPLETED) {
    const newTodos = state.todos.map((item: any) => {
      if (item.id === action.payload) {
        return { ...item, type: "completed" }
      }
      return item
    })
    return { ...state, todos: newTodos }
  }
  if (action.type === START_EDIT) {
    const { id, content } = action.payload
    return { ...state, isEdit: true, editID: id, editContent: content }
  }
  if (action.type === END_EDIT) {
    const newTodos = state.todos.map((item: any) => {
      if (item.id === state.editID) return { ...item, content: action.payload }
      return item
    })

    return { todos: newTodos, isEdit: false, editID: 0, editContent: "" }
  }
  if (action.type === CLEAR_COMPLETED) {
    const newTodos = state.todos.filter((item: any) => item.type === "active")
    return {
      ...state,
      todos: newTodos,
    }
  }
  if (action.type === LOCAL_STORAGE) {
    return {
      ...state,
      todos: action.payload,
    }
  }

  return state
}
export default reducer
