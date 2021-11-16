// import { MongoClient } from 'mongodb'
// // const { MongoClient } = require('mongodb')

// const client = new MongoClient('mongodb://localhost:27017/')

// async function connectToDatabase() {
//   try {
//     await client.connect()

//     await client.db('admin').command({ ping: 1 })
//     console.log('Connected successfully to server')
//   } finally {
//     await client.close()
//   }
// }

// export const create = async (string) => {
//   try {
//     await client.connect()

//     const db = client.db('WebAppEksamen')
//     const test = db.collection('test')

//     await test.insertOne(string)
//   } catch (err) {
//     console.log(err)
//   } finally {
//     await client.close()
//   }
// }
