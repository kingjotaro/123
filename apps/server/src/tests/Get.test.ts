import supertest from "supertest";
import app from "../index";
import Drawer from "../Schema";

it("should return 400 if name parameter is missing", async () => {
  const response = await supertest(app.callback()).get("/get").expect(400);

  expect(response.body).toHaveProperty(
    "error",
    "Name parameter is missing in the query string"
  );
});

it("should return 404 if drawer is not found", async () => {
  const response = await supertest(app.callback())
    .get("/get")
    .query({ name: "************" })
    .expect(404);

  expect(response.body).toHaveProperty(
    "error",
    "Drawer not found for the provided name"
  );
});

it("should return 200 with drawer document if found", async () => {
  
  


  const response = await supertest(app.callback())
    .get("/get")
    .query({ name: "todos os conditions" })
    .expect(200);

  expect(response.body)
});

it("should return 500 in case of internal server error", async () => {
  jest
    .spyOn(Drawer, "findOne")
    .mockRejectedValueOnce(new Error("Database error"));

  const response = await supertest(app.callback())
    .get("/get")
    .query({ name: "testDrawer" })
    .expect(500);

  expect(response.body).toHaveProperty("error", "Internal server error");
});
