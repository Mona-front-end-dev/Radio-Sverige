express = require("express");
const session = require("express-session");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const userPrefix = "/api/v1/users";
const port = 3001;

const channelRoutes = require("./routes/channelRoutes.js");
const programRoutes = require("./routes/programRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const broadcastRoutes = require("./routes/broadcastRoutes");

const app = express();
app.use(express.json());

// Express-session setup
app.use(
  session({
    secret: "The face off",
    resave: false,
    saveUnitialized: true,
    cookie: { secure: "auto" },
  })
);

app.use(userPrefix, userRoutes);

app.use(express.static(path.join(__dirname, "../build")));

app.use("/api/v1/channels", channelRoutes);
app.use("/api/v1/programs", programRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/broadcasts", broadcastRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
