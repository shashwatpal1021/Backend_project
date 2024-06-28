require('dotenv').config()
const books = require("../db/books.db")
const { createClient } = require('@supabase/supabase-js');
const { supabaseUrl, supabaseKey } = require('../db/books.db')
const logger = require('../index');
const supabase = createClient(supabaseUrl, supabaseKey)

exports.getData = async (req, res) => {
  const { data, error } = await supabase
    .from('todo')
    .select('*');

  if (error) {
    console.error(error);
    return;
  }
  // console.log(data);
  res.json(data)
  
}

exports.createBook = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('todo')
      .insert(
        req.body,
      )
      .select()
    if (error) {
      console.error(error);
      return;
    }
    // console.log(data);
    res.json(data)
  } catch (error) {
    console.error(error);
    res.status(500).json('Error posting data to Supabase');
  }
}

exports.getBookById = async (req, res, next) => {
  // find a book by id
  let { data, error } = await supabase.from('todo').select("*")
    .eq('id', req.params.id)
  // console.log("show", data)
  if (!data) {
    return res.status(404).json("Book not found")
  }
  if (error) {
    console.log(error)
  } else {
    res.send(data)
  }
}

exports.updateBook = async (req, res, next) => {
  // update a book
  try {
    let { data, error } = await supabase.from('todo').select("*")
      .eq('id', req.params.id)
    // console.log("show", data)
    if (!data) {
      return res.status(404).send("Book not found")
    }
    if (error) {
      console.log(error)
    } else {
      data = await supabase
        .from('todo')
        .update(req.body)
        .eq('id', req.params.id)
        .select()
      res.json(data.data)
    }
  } catch (error) {
    console.error(error);
  }
}

exports.deleteBook = async (req, res, next) => {
  // delete a book
  try {
    let { data, error } = await supabase.from('todo').select("*")
      .eq('id', req.params.id)
    // console.log("show", data)
    if (!data) {
      return res.status(404).send("Book not found")
    }
    if (error) {
      console.log(error)
    } else {
      await supabase
        .from('todo')
        .delete()
        .eq('id', req.params.id)
      res.json("delete successfully")
    }

  } catch (error) {
    console.error(error);
  }
}
exports.addToCart = async (req, res, next) => {
  try {
    let { data, error } = await supabase.from('todo').select("*")
      .eq('id', req.params.id)
    console.log("show", data)
    if (!data) {
      return res.status(404).send("Book not found")
    }
    if (error) {
      console.log(error)
    }
    data = await supabase
      .from('cart')
      .insert(
        req.body,
      )
      .eq('id', req.params.id)
      .select()
    console.log(data.data);
    res.json(data)
  } catch (error) {
    console.error(error);
  }
}

exports.getCartData = async (req, res) => {
  const { data, error } = await supabase
    .from('cart')
    .select('*');

  if (error) {
    console.error(error);
    return;
  }
  // console.log(data);
  res.json(data)
}
