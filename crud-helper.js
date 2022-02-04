// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const User = require('./models/user');
// const Item = require('./models/item');
// const Category = require('./models/category');
// const Order = require('./models/order');

// Local variables will come in handy for holding retrieved documents
let user, item, category, order;
let users, items, categories, orders;

// Quiz week 11

// 1. <Person props={name:"Fred"} />
// 2. Would replace with person
// 3. export default function Person({props})
// 4. It will render an article section with a few paragraphs. IF info() is info({props})
// 5. object?
// 6. setTodo is a method in useState that helps change "todo"
// 7. Jorge
// 8. onClick={()=>setName('Jorge')}
// 9. array.map()
// 10. array.filter?
