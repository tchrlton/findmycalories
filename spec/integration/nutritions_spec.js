const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const sequelize = require("../../src/db/models/index").sequelize;
const Nutrition = require("../../src/db/models").Nutrition;
const User = require("../../src/db/models").User;

describe("Nutrition", () => {

    beforeEach((done) => {
        this.user;
        this.nutrition;

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

    describe("GET /users/:id", () => {

        it("should render a nutrition form", (done) => {
          request.get(`${base}users/${this.user.id}`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("DAILY CALORIE CALCULATOR");
            done();
          });
        });
    
    });

    describe("POST /users/:id/nutrition/create", () => {

        it("should create a new nutrition object and redirect", (done) => {

            const options = {
                url: `${base}users/${this.user.id}/nutrition/create`,
                form: {
                    age: 20,
                    gender: "male",
                    weight: 141,
                    height: 70,
                    activity: '1.375',
                    userId: this.user.id
                }
            };

            request.post(options, (err, res, body) => {
                Nutrition.findOne({where: {userId: `${this.user.id}`}})
                .then((nutrition) => {
                    expect(res.statusCode).toBe(303);
                    expect(nutrition.age).toBe(20);
                    expect(nutrition.gender).toBe("male");
                    expect(nutrition.weight).toBe(141);
                    expect(nutrition.height).toBe(70);
                    expect(nutrition.activity).toBe('1.375');
                    expect(nutrition.userId).not.toBeNull();
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });
});