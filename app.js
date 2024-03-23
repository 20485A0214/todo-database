const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const databasePath = path.join(__dirname, 'todoApplication.db')

const app = express()

app.use(express.json())

let database = null

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })

    app.listen(3000, () =>
      console.log(`Server Running at http://localhost:3000/`),
    )
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}
initializeDbAndServer()

const convertStateObject = dbObject => {
  return {
    todoId: dbObject.id,
    todo: dbObject.todo,
    category: dbObject.category,
    priority: dbObject.priority,
    status: dbObject.status,
    dueDate: dbObject.due_date,
  }
}

app.get('/todos/', async (request, response) => {
  const {status} = request.params
  try {
    const getTodoQuery = `
    SELECT
      *
    FROM
      todo
    WHERE 
     status=${status};
  `
    const todos = await database.all(getTodoQuery)
    response.send(convertStateObject(todos))
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
  }
})

app.get('/todos/', async (request, response) => {
  const {priority} = request.params
  try {
    const getTodoQuery = `
    SELECT
      *
    FROM
      todo
    WHERE 
     priority=${priority};
  `
    const todo = await database.all(getTodoQuery)
    response.send(convertStateObject(todo))
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
  }
})

app.get('/todos/', async (request, response) => {
  const {priority} = request.params
  try {
    const getTodoQuery = `
    SELECT
      *
    FROM
      todo
    WHERE 
     priority=${priority};
  `
  })

module.exports = app
