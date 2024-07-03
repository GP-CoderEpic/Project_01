const express = require("express");
const { handleGetAllUsers,
        handleGetUserById,
        handleUpdateUserById,
        handleDeleteUserById,
        handleCreateNewUser,
 } = require('../controllers/user');

const fs = require("fs")


const router = express.Router();

// router.get("/users", async (req, res) =>{
//     const allDbUser = await User.find({})
//     const html = `
//     <ul>
//     ${allDbUser.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
//     </ul>
//     `;
//     res.send(html);
// });

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser);

router.route("/:id")
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);


module.exports = router;