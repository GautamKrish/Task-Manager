const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");
const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});

router.post("/users", async (req, res) => {
  try {
    const user = await new User(req.body).save();
    const token = await user.generateToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateToken();
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/me", auth, (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const fieldsToUpdate = Object.keys(req.body);
  const allowedToUpdate = ["name", "age", "email", "password"];
  const isUpdateAllowed = fieldsToUpdate.every((key) =>
    allowedToUpdate.includes(key)
  );

  if (fieldsToUpdate.length == 0 || !isUpdateAllowed) {
    return res.status(400).send({
      error: "Please check the fields to update",
    });
  }
  try {
    let user = req.user;
    fieldsToUpdate.forEach((update) => (user[update] = req.body[update]));
    user = await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send("Successfully logged out");
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("Successfully logged out of all sessions.");
  } catch (error) {
    res.status(500).send();
  }
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(500).send({
      error: error.message,
    });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById({
      _id: req.params.id,
    });
    if (!(user && user.avatar)) {
        throw new Error()
    }
    res.set('Content-Type', 'image/jpg')
    res.send(user.avatar)
  } catch (error) {
      res.status(500).send(error)
  }
});

module.exports = router;
