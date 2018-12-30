const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Nutrition = require("../../src/db/models").Nutrition;

describe("User", () => {

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

    it("should create a User object with a valid email and password", (done) => {
      User.create({
        username: "hello1",
        email: "user@example.com",
        password: "1234567890"
      })
      .then((user) => {
        expect(user.username).toBe("hello1");
        expect(user.email).toBe("user@example.com");
        expect(user.id).toBe(2);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a user with invalid email or password", (done) => {
      User.create({
        email: "not a real email",
        password: "1234567890"
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error: must be a valid email");
        done();
      });
    });

    it("should not create a user with an email or username already taken", (done) => {

      User.create({
        username: "hello1",
        email: "user@example.com",
        password: "1234567890"
      })
      .then((user) => {

        User.create({
          username: "hello1",
          email: "user@example.com",
          password: "hold my tea"
        })
        .then((user) => {
          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Validation error");
          done();
        });

        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("#getNutrition()", () => {

    it("should return the associated nutrition object", (done) => {

      this.nutrition.getUser()
      .then((associatedNutrition) => {
        expect(associatedNutrition.id).toBe(1);
        done();
      });
    });
  });

});