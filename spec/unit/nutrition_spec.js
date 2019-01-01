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

    describe("#create()", () => {

        it("should create a nutrition object with an age, gender, weight, height, and activity", (done) => {

            Nutrition.create({
                age: 20,
                gender: "male",
                weight: 141,
                height: 70,
                activity: '1.375',
                userId: this.user.id
            })
            .then((nutrition) => {

                expect(nutrition.age).toBe(20);
                expect(nutrition.gender).toBe("male");
                expect(nutrition.weight).toBe(141);
                expect(nutrition.height).toBe(70);
                expect(nutrition.activity).toBe('1.375');
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should not create a nutrition object with missing age, gender, weight, height, and activity", (done) => {
            
            Nutrition.create({
                age: 20,
            })
            .then((nutrition) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Nutrition.gender cannot be null");
                expect(err.message).toContain("Nutrition.weight cannot be null");
                expect(err.message).toContain("Nutrition.height cannot be null");
                expect(err.message).toContain("Nutrition.activity cannot be null");
                done();
            });
        });
    });

    describe("#setUser()", () => {

        it("should associate a user and nutrition together", (done) => {

            User.create({
                username: "hello1",
                email: "email@example.com",
                password: "pass123"
            })
            .then((newUser) => {
                expect(this.nutrition.userId).toBe(this.user.id);

                this.nutrition.setUser(newUser)
                .then((nutrition) => {
                    expect(nutrition.userId).toBe(newUser.id);
                    done();
                });
            })
        });
    });

    describe("#getUser()", () => {

        it("should return the associated user", (done) => {

            this.nutrition.getUser()
            .then((associatedUser) => {
                expect(associatedUser.id).toBe(1);
                done();
            });
        });
    });
});