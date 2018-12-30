const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const sequelize = require("../../src/db/models/index").sequelize;
const Nutrition = require("../../src/db/models").Nutrition;
const User = require("../../src/db/models").User;

describe("Nutrition", () => {

    beforeEach((done) => {
        this.nutrition;
        this.user;

        sequelize.sync({force:true}).then((res) => {

            User.create({
                username: "hello1",
                email: "email@example.com",
                password: "pass123"
            })
            .then((user) => {
                this.user = user;

                Nutrition.create({
                    age: 20,
                    gender: "male",
                    weight: 141,
                    height: 70,
                    activity: 1.375,

                    userId: this.user.id
                })
                .then((nutrition) => {
                    this.nutrition = nutrition;
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("GET /users/:id/new_nutrition", () => {

        it("should render a new nutrition form", (done) => {
          request.get(`${base}/users/:id/new_nutrition`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("DAILY CALORIE CALCULATOR");
            done();
          });
        });
    
    });
});