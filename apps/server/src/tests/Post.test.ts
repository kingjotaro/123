import supertest from "supertest";
import app from "../index";
import Drawer from "../Schema";
import { PostMockData } from "./postMockData";
import { PostMockData2 } from "./postMockData2";

it("should return 400 if request body is missing", async () => {
  const response = await supertest(app.callback()).post("/post").expect(400);
  
  expect(response.body).toHaveProperty("error", "Missing request body");
});

it("should return 400 if required fields are missing in the request body", async () => {
  const response = await supertest(app.callback())
    .post("/post")
    .send({ name: "test", nodes: []})
    .expect(400);

  expect(response.body).toHaveProperty(
    "error",
    "Missing required fields in the request body"
  );
});

it("should return 200 and update existing drawer if it exists", async () => {
  const response = await supertest(app.callback())
    .post("/post")
    .send(PostMockData)
    .expect(200);

  expect(response.body).toBeDefined();
});

const { name, nodes, edges} = PostMockData2;

it("should return 201 and create a new drawer if it does not exist", async () => {
  const response = await supertest(app.callback())
    .post("/post")
    .send({name, nodes, edges})
    .expect(201);

  expect(response.body).toBeDefined();
});

it("should return 500 in case of internal server error", async () => {
  jest
    .spyOn(Drawer, "findOne")
    .mockRejectedValueOnce(new Error("Database error"));

  const response = await supertest(app.callback())
    .post("/post")
    .send({ name: "test", nodes: [], edges: [] })
    .expect(500);

  expect(response.body).toEqual({ error: "Internal server error" });
});