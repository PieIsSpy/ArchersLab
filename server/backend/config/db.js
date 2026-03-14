const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(chalk.cyan.underline(`MongoDB Connected: ${conn.connection.host}`));
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;