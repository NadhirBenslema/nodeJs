const chat=require('../model/chat')
const express=require('express');

async function add(msge) {
    try {
      const Chat = new chat({
        msg: msge,
        date: new Date(),
      });
      console.log(new Date());
      await Chat.save();
      console.log("add success");
    } catch (err) {
      console.log({ error: error.toString() });
    }
  };

  module.exports={add};
