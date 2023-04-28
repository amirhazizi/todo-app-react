import {
  ADD_TODO,
  REMOVE_TODO,
  IS_COMPLETED,
  IS_ACTIVE,
  CLEAR_COMPLETED,
} from "./action"
const initialState: {}[] = [
  {
    id: 1682622006924,
    content: "todo 1",
    type: "active",
  },
]

const reducer = (
  state = initialState,
  action: { type: string; payload: number }
) => {
  if (action.type === ADD_TODO) {
    console.log("ok")

    return [
      ...state,
      {
        id: new Date().getTime(),
        content: action.payload,
        type: "active",
      },
    ]
  }
  if (action.type === REMOVE_TODO) {
    const newState = state.filter((item: any) => item.id !== action.payload)
    return [...newState]
  }
  if (action.type === IS_ACTIVE) {
    const newState = state.map((item: any) => {
      if (item.id === action.payload) return { ...item, type: "active" }
      return item
    })
    return newState
  }
  if (action.type === IS_COMPLETED) {
    const newState = state.map((item: any) => {
      if (item.id === action.payload) return { ...item, type: "completed" }
      return item
    })
    return newState
  }
  if (action.type === CLEAR_COMPLETED) {
    return [...state.filter((item: any) => item.type === "active")]
  }
  return state
}
export default reducer
