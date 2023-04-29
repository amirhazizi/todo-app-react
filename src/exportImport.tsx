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
export const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log("not working....")
  if (!e.target.files) {
    return
  }
  const file = e.target.files[0]

  const reader = new FileReader()
  reader.onload = (e: any) => {
    const wb = read(e.target.result)
    const sheets = wb.SheetNames
    if (sheets.length) {
      const rows = utils.sheet_to_json(wb.Sheets[sheets[0]])

      reader.readAsArrayBuffer(file)
      console.log(rows)
      return rows
    }
  }
}
