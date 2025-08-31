// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("✅ MongoDB Connected");
//   } catch (error) {
//     console.error("❌ MongoDB Connection Failed:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;
// db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,       // ensures new URL string parser
      useUnifiedTopology: true,    // new server discovery & monitoring engine
      // useCreateIndex: true,     // no longer needed in Mongoose 6+
      // useFindAndModify: false   // no longer needed in Mongoose 6+
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // stop app if DB fails
  }
};

// Optional: listen to events (useful for debugging)
mongoose.connection.on("connected", () => {
  console.log("📡 Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error(`⚠️ Mongoose connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("🔌 Mongoose disconnected");
});

export default connectDB;
