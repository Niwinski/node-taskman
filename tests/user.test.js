const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
//const { Binary } = require("mongodb");
const { fredId, fred, setupDB } = require("./fixtures/db");

beforeEach(setupDB);

test("Should sign up a new user", async () => {
    const response = await request(app)
        .post("/users")
        .send({
            name: "Test Nabo",
            email: "niwinski@yahoo.com",
            password: "fooo12345",
        })
        .expect(201);
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
    expect(response.body).toMatchObject({ user: { name: "Test Nabo" } });

    expect(user.password).not.toBe("fooo12345");
});

test("Should login existing user", async () => {
    const res = await request(app).post("/users/login").send(fred).expect(200);

    const user = await User.findById(fredId);
    expect(res.body.token).toBe(user.tokens[1].token);
});

test("Should not login user", async () => {
    await request(app)
        .post("/users/login")
        .send({ email: "niwinski@yahoo.com", password: "dd" })
        .expect(400);
});

test("Should get profile for  user", async () => {
    await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${fred.tokens[0].token}`)
        .send()
        .expect(200);
});

test("Should not  get profile for bad user", async () => {
    await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
    const res = await request(app)
        .delete("/users/me")
        .set("Authorization", `Bearer ${fred.tokens[0].token}`)
        .send();
    const user = await User.findById(fredId);
    expect(user).toBeNull();
});

test("Should delete account for user", async () => {
    await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar", async () => {
    await request(app)
        .post("/users/me/avatar")
        .set("Authorization", `Bearer ${fred.tokens[0].token}`)
        .attach("avatar.jpg", "tests/fixtures/profile-pic.jpg")
        .expect(200);

    const user = await User.findById(fredId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should change name", async () => {
    const newName = "Bing Bang";
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${fred.tokens[0].token}`)
        .send({ name: newName });

    const user = await User.findById(fredId);
    expect(user.name).toBe(newName);
});
