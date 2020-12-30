const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middleware/auth");
const sharp = require("sharp");
const { sendWelcomeMail, sendGoodbyeEmail } = require("../emails/account");

const multer = require("multer");

router.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        sendWelcomeMail(user.email, user.name);
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post("/users/login", async (req, res) => {
    const user = new User(req.body);
    try {
        const user = await User.findByCreds(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        //        res.send({ user: user, token });
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post("/users/logout", auth, async (req, res) => {
    //const user = new User(req.body);
    try {
        req.user.tokens = req.user.tokens.filter((t) => t.token !== req.token);
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post("/users/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

const upload = multer({
    //dest: "avatars",
    limits: { fileSize: 1000000 },
    fileFilter(req, file, cb) {
        if (file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(undefined, true);
        }
        return cb(new Error("must be a png. jpg or jpeg file!"));
    },
});

router.post(
    "/users/me/avatar",
    auth,
    upload.single("avatar.jpg"),
    async (req, res) => {
        try {
            //            console.log(req.user._id);

            const roundedCorners = Buffer.from(
                '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
            );

            const modBuffer = await sharp(req.file.buffer)
                .resize({ width: 200, height: 200 })
                .composite([
                    {
                        input: roundedCorners,
                        blend: "dest-in",
                    },
                ])
                .png()
                .toBuffer();
            req.user.avatar = modBuffer;
            await req.user.save();
            res.send();
        } catch (e) {
            res.status(500).send();
        }
    },
    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
    try {
        req.user.avatar = undefined;
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.get("/users/:id/avatar", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error("can't find it");
        }
        res.set("Content-Type", "image/png");
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send();
    }
});

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
});

// router.get("/users/:id", async (req, res) => {
//     try {
//         const _id = req.params.id;

//         const user = await User.findById(_id);
//         if (!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch (error) {
//         res.status(500).send();
//     }
// });

router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedList = ["name", "email", "password", "age"];
    const isValid = updates.every((i) => allowedList.includes(i));

    if (!isValid) {
        return res.status(400).send("invalid updates");
    }

    try {
        const _id = req.user.id;
        // const user = await User.findById(_id);
        // if (!user) {
        //     return res.status(404).send();
        // }
        updates.forEach((e) => (req.user[e] = req.body[e]));

        await req.user.save();

        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/users/me", auth, async (req, res) => {
    try {
        // const _id = req.user._id;
        // const user = await User.findByIdAndDelete(_id);
        // if (!user) {
        //     return res.status(404).send();
        // }
        await req.user.remove();
        sendGoodbyeEmail(req.user.email, req.user.name);
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
