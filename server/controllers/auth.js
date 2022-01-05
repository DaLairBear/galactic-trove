const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      const { username, password } = req.body
      console.log(username, password)
      for (let i = 0; i < users.length; i++) {
        console.log(users[i], username)
        if (users[i].username === username) {
          const authentication = bcrypt.compareSync(password, users[i].passwordHash)

          if(authentication){
            let userToReturn = {...users[i]}
            delete userToReturn.passwordHash
            res.status(200).send(userToReturn)
            return
          }
        }
      }
      res.status(400).send("User not found.")
    },
    
    register: (req, res) => {
        const {name, email, username, password} = req.body
      
        const salt = bcrypt.genSaltSync(5)
        const passwordHash = bcrypt.hashSync(password, salt)
        let user = {name, email, username, passwordHash}

        users.push(user)

        let userToReturn = {...user}
        delete userToReturn.passwordHash
        res.status(200).send(userToReturn)
    }
}