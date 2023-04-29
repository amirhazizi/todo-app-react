import { read, utils, writeFile } from "xlsx"

export const handleExport = (todos: [{}]) => {
  const heading = [["id", "content", "type"]]
  const fileName = `TodoList-${new Date().getTime()}`
  const wb = utils.book_new()
  const ws = utils.json_to_sheet([])
  utils.sheet_add_aoa(ws, heading)
  utils.sheet_add_json(ws, todos, { origin: "A4", skipHeader: true })
  utils.book_append_sheet(wb, ws, fileName)
  writeFile(wb, `${fileName}.xlsx`)
}
