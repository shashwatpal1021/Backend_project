const books = [
  {
    id: 1,
    name: "book1"
  },
  {
    id: 2,
    name: "book2"
  }
]
module.exports = books

require('dotenv').config()
const supabaseUrl = 'https://lucfvsgvqjrznyarsrdb.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

module.exports={supabaseUrl,supabaseKey}