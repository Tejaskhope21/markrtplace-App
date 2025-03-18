// // controllers/menuController.js
// const { menu_list } = require('../../Frontend/src/assets/data'); // Import data

// // Get all menus
// const getMenus = (req, res) => {
//   res.json(menu_list);
// };

// // Get single menu by name
// const getMenuByName = (req, res) => {
//   const { name } = req.params;
//   const menu = menu_list.find(m => m.menu_item === name);
//   if (!menu) {
//     return res.status(404).json({ message: "Menu not found" });
//   }
//   res.json(menu);
// };

// // Create a new menu
// const createMenu = (req, res) => {
//   const { menu_item, menu_img } = req.body;
//   if (!menu_item || !menu_img) {
//     return res.status(400).json({ message: "All fields are required" });
//   }
//   const newMenu = { menu_item, menu_img };
//   menu_list.push(newMenu);
//   res.status(201).json(newMenu);
// };

// // Update an existing menu
// const updateMenu = (req, res) => {
//   const { name } = req.params;
//   const { menu_item, menu_img } = req.body;
//   const menu = menu_list.find(m => m.menu_item === name);

//   if (!menu) {
//     return res.status(404).json({ message: "Menu not found" });
//   }

//   if (menu_item) menu.menu_item = menu_item;
//   if (menu_img) menu.menu_img = menu_img;

//   res.json(menu);
// };

// // Delete a menu
// const deleteMenu = (req, res) => {
//   const { name } = req.params;
//   const index = menu_list.findIndex(m => m.menu_item === name);

//   if (index === -1) {
//     return res.status(404).json({ message: "Menu not found" });
//   }

//   menu_list.splice(index, 1);
//   res.json({ message: "Menu deleted successfully" });
// };

// module.exports = {
//   getMenus,
//   getMenuByName,
//   createMenu,
//   updateMenu,
//   deleteMenu,
// };


const getMenus = (req, res) => {
    res.json({ message: 'Get all menus' });
  };
  
  module.exports = {
    getMenus, // ✅ Make sure it's correctly exported
  };
  
