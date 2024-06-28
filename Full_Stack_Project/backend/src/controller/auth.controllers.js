require('dotenv').config()

const { createClient } = require('@supabase/supabase-js');
const { supabaseUrl, supabaseKey } = require('../db/books.db')
const bcrypt = require('bcrypt');
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
  res.send(data)
}



exports.getRegistered = async (req, res) => {
  try {

    const { username, email, role, password } = req.body
    const hash_password = await bcrypt.hash(password, 10)

    // const decrypt_password = await bcrypt .compare(password, hash_password)
    // console.log("Decrypted password:", decrypt_password)


    const { data, error } = await supabase.auth.signUp(req.body)
    // console.log("w => ", data);
    if (data?.user) {
      console.log("data=>", data.user)

      const userResponse = await supabase.from('register').insert({ auth_id: data.user.id, email, username, password: hash_password }).select();

      if (userResponse) {
        console.log("userResponse => ", userResponse)
        res.send(userResponse.data)

      } else {
        console.log("error")
      }

      const role_status = await supabase.
        from('user_info')
        .insert({ register_id: userResponse.data[0].id, username: username, user_role: role })
      if (role_status) {
        console.log("userResponse => ", userResponse)
        res.send(role_status)
      } else {
        console.log("error")
      }
    } else {
      console.log(error)
      res.send("User already Registered")
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.logInUser = async (req, res) => {
  const { username, email, password } = req.body;

  const decrypt_password = await supabase
    .from("register").select("password").eq("username", username)
  // console.log("verifyPassword => ", verifyPassword?.data[0].password)

  const verifyPassword = await bcrypt.compare(password, decrypt_password?.data[0].password)

  //login user using supabase
  if (!verifyPassword) {
    res.send("invalid user")
  }
  const { data, error } = await supabase.auth.signInWithPassword({ username, email, password });
  // console.log(data)
  // console.log("w => ", data);
  if (data?.user) {
    // console.log("data=>", data?.user.id)
    const userResponse = await supabase
      .from('register')
      .select("*")
      .eq('auth_id', data?.user.id)
      .select();

    if (userResponse) {
      console.log("userResponse => ", userResponse)
      res.send(userResponse)
    }
  } else {
    console.log(error)
    res.send("invalid name/email or password")
  }
}


exports.logOutUser = async (req, res) => {
  const userResponse = await supabase
    .from('register')
    .update({ active: false })
    .eq('auth_id', data.user.id)
    .select();

  console.log(userResponse)
  if (userResponse) {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log("something went wrong")
      res.send("something went wrong")
    }
    res.send("successfully logout")
  }
}


const getCurrentUser = async (req, res) => {
  try {
    console.log(".................", req.user.email)
    const getUserData = await supabase.from('user_info').select('id').eq('email', req.user.email)
    console.log("bv=============== rv", getUserData.data[0].id)
    return getUserData.data[0].id
  } catch (error) {
    console.log(error)
  }
}


