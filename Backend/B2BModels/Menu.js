const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  menu_item: {
    type: String,
    required: true,
    unique: true
  },
  menu_img: {
    type: String,
    required: true
  }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
