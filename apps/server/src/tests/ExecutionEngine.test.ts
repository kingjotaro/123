import supertest from "supertest";
import app from "../index";

const url = 'http://localhost:3000/get?name=parameter'

it("should return error if failed to fetch data", async () => {
  const response = await supertest(app.callback())
    .post("/execution/parameter")
    .send({ requestData: "data" })
    .expect(200);

  expect(response.body).toHaveProperty(
    "error",
    `Failed to fetch data from ${url}. Status: 404`
  );
});

it("should return 500 if failed to parse JSON response", async () => {
  jest.spyOn(global, "fetch").mockResolvedValueOnce({
    ok: true,
    json: jest.fn().mockRejectedValueOnce(new Error(`Failed to parse JSON response from ${url}`)),
  } as any);

  const response = await supertest(app.callback())
    .post("/execution/parameter")
    .send({ requestData: "example data" })
    .expect(500);

  expect(response.body).toHaveProperty(
    "error",
    `Failed to parse JSON response from ${url}`
  );
});

it("should return result data", async () => {
  const response = await supertest(app.callback())
    .post("/execution/teste")
    .send({"teste":"150"})
    .expect(200);

  expect(response.body).toHaveProperty( "decision",false);
});

it("should return result data", async () => {
  const response = await supertest(app.callback())
    .post("/execution/teste")
    .send({"teste":"800"})
    .expect(200);

  expect(response.body).toHaveProperty( "decision",true);
});
