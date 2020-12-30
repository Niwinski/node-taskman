"use strict";
const { MongoServerSelectionError } = require("mongodb");
const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

const vAge = (v) => {
    if (v < 0) {
        throw new Error(" no minors");
    }
};
const mySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        age: {
            type: Number,
            default: 1,
            validate: vAge,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            validate(v) {
                if (!validator.isEmail(v)) {
                    throw new Error("bad email");
                }
            },
        },
        password: {
            type: String,
            trim: true,
            required: true,
            validate(v) {
                if (v.length < 7 && v.toLowerCase().indexOf("password")) {
                    throw new Error("bad password or too short");
                }
            },
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
        avatar: {
            type: Buffer,
        },
    },
    {
        timestamps: true,
    }
);

mySchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner",
});

mySchema.set("toObject", { virtuals: true });
mySchema.set("toJSON", { virtuals: true });

mySchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.tokens;
    delete user.avatar;
    return user;
};

mySchema.statics.findByCreds = async (email, passwd) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("no user " + email);
    }
    const isMatch = await bcryptjs.compare(passwd, user.password);
    console.log(passwd);
    if (!isMatch) {
        throw new Error("unable to login");
    }
    return user;
};

mySchema.methods.generateAuthToken = async function () {
    const token = jwt.sign(
        { _id: this._id.toString() },
        process.env.JWT_SECRET,
        {
            expiresIn: "7 days",
        }
    );

    this.tokens.push({ token });
    await this.save();

    return token;
};

mySchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcryptjs.hash(user.password, 8);
    }

    next();
});

mySchema.pre("remove", async function (next) {
    const user = this;

    await Task.deleteMany({ owner: user._id });
    next();
});

const User = mongoose.model("User", mySchema);

// const me = new User({
//     name: "Tom   ",
//     email: " TOM@ea.com",
//     minlength: 7,
//     password: "1234aaaa",
// });

module.exports = User;
