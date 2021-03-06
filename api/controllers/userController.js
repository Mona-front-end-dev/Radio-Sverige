const sqlite3 = require("sqlite3");
const Encrypt = require("../Encrypt");
const path = require("path");
const fetch = require("node-fetch");
const { query } = require("express");

const db = new sqlite3.Database(path.join(__dirname, "../../RadioSwedenDB.db"));

//here we check which session is active and return this to the frontend

const whoami = (req, res) => {
  res.json(req.session.user || null);
};

const login = (req, res) => {
  // the person can log in here
  let query = /*sql*/ `SELECT * FROM users WHERE email = $email`;
  let params = { $email: req.body.email };

  db.get(query, params, (err, userInDB) => {
    if (!userInDB) {
      res.status(401).json({ error: "Bad credentials!!!" });
      return;
    }
    // comparing passwords
    req.body.password = Encrypt.encrypt(req.body.password);
    if (userInDB.password === req.body.password) {
      delete userInDB.password;
      req.session.user = userInDB;
      res.json({ success: "Login successfull", loggedInUser: userInDB });
      return;
    } else {
      res.status(401).json({ error: "Bad credentials" });
      return;
    }
  });
};

const addToChannelFavoriteList = async (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const channelId = req.params.channelId;
  const userId = req.session.user.id;
  let query = /*sql*/ `INSERT INTO userChannels (userId, channelId) VALUES ($userId, $channelId)`;
  params = {
    $userId: userId,
    $channelId: channelId,
  };

  db.run(query, params, function (err) {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }

    res.json({
      Success: "Channel has been added to your favorites",
      lastID: this.lastID,
    });
    return;
  });
};

const getFavoriteChannels = async (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const userId = req.session.user.id;

  let query = /*sql*/ `SELECT * FROM userChannels WHERE userId = $userId`;
  params = {
    $userId: userId,
  };

  db.all(query, params, (err, channels) => {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }

    res.json(channels);
  });
};

const deleteFromChannelFavoriteList = async (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const channelId = req.params.channelId;
  const userId = req.session.user.id;

  let query = /*sql*/ `DELETE FROM userChannels WHERE channelId = $channelId AND userId = $userId`;
  params = {
    $channelId: channelId,
    $userId: userId,
  };

  db.run(query, params, (err) => {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }

    res.json({
      Success: "Channel has been deleted successfully",
    });
  });
};

const getFavoritePrograms = async (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const userId = req.session.user.id;

  let query = /*sql*/ `SELECT * FROM userPrograms WHERE userId = $userId`;
  params = {
    $userId: userId,
  };

  db.all(query, params, (err, programs) => {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }

    res.json(programs);
  });
};

const deleteFromProgramFavoriteList = async (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const programId = req.params.programId;
  const userId = req.session.user.id;

  let query = /*sql*/ `DELETE FROM userPrograms WHERE programId = $programId AND userId = $userId`;
  params = {
    $programId: programId,
    $userId: userId,
  };

  db.run(query, params, (err) => {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }

    res.json({
      Success: "Program has been deleted successfully",
    });
  });
};

const addToProgramFavoriteList = async (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const programId = req.params.programId;
  const userId = req.session.user.id;

  let query = /*sql*/ `INSERT INTO userPrograms (userId, programId) VALUES ($userId, $programId)`;
  params = {
    $userId: userId,
    $programId: programId,
  };

  db.run(query, params, (err) => {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }

    res.json({
      Success: "Program has been added to your favorites",
      lastID: this.lastID,
    });
    return;
  });
};

const logout = (req, res) => {
  delete req.session.user;
  res.json({ success: true });
};

const register = (req, res) => {
  let userToRegister = req.body;

  // to check if the user already exists
  let query = /*sql*/ `SELECT * FROM users WHERE email = $email`;
  let params = { $email: userToRegister.email };
  db.get(query, params, (err, userExist) => {
    if (userExist) {
      res.status(400).json({ error: "User with that email already exists" });
      return;
    }

    userToRegister.password = Encrypt.encrypt(userToRegister.password);
    query = /*sql*/ `INSERT INTO users (firstName, lastName, email, password) VALUES ($firstName, $lastName, $email, $password)`;
    params = {
      $firstName: userToRegister.firstName,
      $lastName: userToRegister.lastName,
      $email: userToRegister.email,
      $password: userToRegister.password,
    };

    db.run(query, params, function (err) {
      if (err) {
        res.status(400).json({ error: err });
        return;
      }

      res.json({
        Success: "User registered successfully",
        lastID: this.lastID,
      });
      return;
    });
  });
};

module.exports = {
  whoami,
  login,
  logout,
  register,
  addToChannelFavoriteList,
  addToProgramFavoriteList,
  getFavoriteChannels,
  deleteFromChannelFavoriteList,
  getFavoritePrograms,
  deleteFromProgramFavoriteList,
};
