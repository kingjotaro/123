import Drawer from "../Schema";
import supertest from "supertest";
import app from "../index";

it("should return 404 if no data found in the database", async () => {
  jest.spyOn(Drawer, "find").mockResolvedValueOnce([]);

  const response = await supertest(app.callback()).get("/getall").expect(404);

  expect(response.body).toHaveProperty(
    "error",
    "No data found in the database"
  );
});

it("should return 200 with drawer documents if data found in the database", async () => {
  const response = await supertest(app.callback()).get("/getall").expect(200);

  expect(response.body);
});

it("should return 500 in case of internal server error", async () => {
  jest.spyOn(Drawer, "find").mockRejectedValueOnce(new Error("Database error"));

  const response = await supertest(app.callback()).get("/getall").expect(500);

  expect(response.body).toHaveProperty( "error", "Internal server error" );
});
