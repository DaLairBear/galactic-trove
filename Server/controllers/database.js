require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        CREATE TABLE users(
            user_id SERIAL PRIMARY KEY,
            user_name VARCHAR(50),
            user_username VARCHAR(20),
            user_email VARCHAR(50),
            user_hash VARCHAR(200)
            );
            
            CREATE TABLE collection(
            collection_id SERIAL PRIMARY KEY,
            user_id INT NOT NULL REFERENCES users(user_id),
            collection_name VARCHAR(30),
            card_name VARCHAR(50),
            set VARCHAR(10),
            set_name VARCHAR(50),
            quantity INT,
            quality VARCHAR(3),
            bought_price NUMERIC(6, 2),
            current_value NUMERIC(6, 2)
            );`).then(() =>{
                console.log('DB seeded!')
                res.sendStatus(200)
            }).catch(err => console.log('error sedding DB', err))
        
    }
}