const passport = require("passport");
const express = require("express");
const router = express.Router();

const UserObject = require("../models/user");
const ActivityObject = require("../models/activity");
const ProjectObject = require("../models/project");

router.get("/", passport.authenticate("user", { session: false }), async (req, res) => {
  try {
    const userCount = await UserObject.find({ ...req.query, organisation: req.user.organisation }).countDocuments({});
    const activityCount = await ActivityObject.find({ ...req.query, organisation: req.user.organisation }).countDocuments({});
    const projectCount = await ProjectObject.find({ ...req.query, organisation: req.user.organisation }).countDocuments({});

    const stats = [
      { name: "Users", count: userCount },
      { name: "Activities", count: activityCount },
      { name: "Projects", count: projectCount },
    ];
    res.status(200).send({ ok: true, data: stats });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: SERVER_ERROR, error });
  }
});

module.exports = router;
