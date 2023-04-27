import { ADD_TODO, REMOVE_TODO } from "./action"
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
  return state
}
export default reducer
