const dotenv = require("dotenv");
const connectDB = require("./configs/database");
const app = require("./app");

// connection
dotenv.config();
connectDB();

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));
