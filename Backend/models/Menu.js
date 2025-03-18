import mongoose from 'mongoose';

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

export default Menu;
