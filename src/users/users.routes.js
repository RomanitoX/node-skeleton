const express = require("express"),
    router = express.Router(),
    userCtrl = require("./users.controller");

router.get("/", userCtrl.findAll);
router.post("/", userCtrl.create);
router.get("/:id", userCtrl.findOne);
router.put("/:id", userCtrl.UpdateUser);
router.delete("/:id", userCtrl.delete);

router.post("/login", userCtrl.login);
router.post("/signup", userCtrl.create);
module.exports = router;