const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const { fredId, fred, tomId, tom, task3, setupDB } = require("./fixtures/db");

beforeEach(setupDB);

test("Should create a new task", async () => {
    const res = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${fred.tokens[0].token}`)
        .send({
            desc: "Tom 5",
        })
        .expect(201);
    const task = await Task.findById(res.body._id);
    expect(task).not.toBeNull();
});

test("Should get right tasks for users", async () => {
    const res = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${fred.tokens[0].token}`)
        .send()
        .expect(200);

    expect(res.body.length).toBe(2);
});

test("Should not be able to delete someones task", async () => {
    const res = await request(app)
        .delete("/tasks/" + task3._id.toString())
        .set("Authorization", `Bearer ${fred.tokens[0].token}`)
        .send()
        .expect(404);
});
