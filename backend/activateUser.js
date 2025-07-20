const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User'); // Correct path

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const users = await User.find(); // Show all users
    console.log("All users:", users);

    const result = await User.updateOne(
      { email: "test@example.com" },
      { $set: { isActive: true } }
    );
    console.log("✅ User updated:", result);
    mongoose.disconnect();
  })
  .catch(err => console.error("❌ DB error:", err));
