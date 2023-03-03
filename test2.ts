import axios from "axios";
import { expect } from "chai";
import "mochawesome/addContext";
import "mochawesome";
import "mocha";

const apiUrl = "https://www.football-data.org/v2/";

describe("Football Data API", () => {
  it("should return a list of available competitions", async () => {
    const response = await axios.get(apiUrl + "competitions", {
      headers: { "X-Auth-Token": process.env.API_TOKEN },
    });
    expect(response.status).to.equal(200);
    expect(response.data.count).to.be.greaterThan(0);
  });

  it("should return a list of teams for a given competition", async () => {
    const response = await axios.get(apiUrl + "competitions/2021/teams", {
      headers: { "X-Auth-Token": process.env.API_TOKEN },
    });
    expect(response.status).to.equal(200);
    expect(response.data.teams).to.have.lengthOf(20);
  });

  it("should return a 401 Unauthorized error when using an invalid API token", async () => {
    try {
      await axios.get(apiUrl + "competitions", {
        headers: { "X-Auth-Token": "invalid_token" },
      });
    } catch (error) {
      expect(error.response.status).to.equal(401);
      expect(error.response.data.error).to.equal("Unauthorized");
    }
  });
});