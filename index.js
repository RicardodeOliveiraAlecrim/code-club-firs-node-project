const express = require("express")

const app = express()

const uuid = require("uuid")

const port = 3001

app.use(express.json())

/* query params
app.get('/users', (request, response) => {

    const { id } = request.params

    const { name, age } = request.query

    return response.json({ name, age, })
})
*/



/* query and route params

app.get('/users/:id', (request, response) => {

    const { id } = request.params

    const { name, age } = request.query

    return response.json({ name, age, id })
})
*/

/* Request body params


app.get('/users/', (request, response) => {

    const { name, age } = request.body

    return response.json({ name, age})
})

*/

const users = []

const checkUserId = (request, response, next) => {

    const { id } = request.params
      
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ Message: "User not Found" })
    }

    request.UserIndex = index
    request.UserId = id

    next()

}

app.get('/users/', (request, response) => {

    return response.json(users)
})

app.post('/users/', (request, response) => {

    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    
    const { name, age } = request.body

    const newUser = { id:request.UserId, name, age  }

    users[request.UserIndex] = newUser
   
    return response.json(newUser)       
    
})

app.delete('/users/:id',checkUserId, (request, response) => {

   

    users.splice(request.UserIndex,1)
   

    return response.status(204).json()

})

app.listen(port, () => {
    console.log(`🚀 Server started on ${port}`)
})
