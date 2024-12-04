import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "./user_schema.js";


jest.setTimeout(10000);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});


afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany(); // Clean up the database after each test
});

describe("User Schema", () => {
  test("should fail validation if required fields are missing", async () => {
    const user = new User({}); // Missing all required fields

    try {
      await user.validate();
    } catch (error) {
      expect(error.errors.username).toBeDefined();
      expect(error.errors.email).toBeDefined();
      expect(error.errors.password).toBeDefined();
    }
  });

  test("should validate a properly defined user", async () => {
    const user = new User({
      username: "testuser",
      email: "test@example.com",
      password: "StrongP@ssw0rd1!",
    });

    const savedUser = await user.save();

    expect(savedUser.username).toBe("testuser");
    expect(savedUser.email).toBe("test@example.com");
  });

  test("should enforce unique username and email", async () => {
    await User.create({
      username: "uniqueuser",
      email: "unique@example.com",
      password: "StrongP@ssw0rd1!",
    });

    try {
      await User.create({
        username: "uniqueuser",
        email: "unique@example.com",
        password: "AnotherP@ssw0rd1!",
      });
    } catch (error) {
      expect(error.code).toBe(11000); 
    }
  });

  test("should validate email format", async () => {
    const user = new User({
      username: "invalidemailuser",
      email: "invalid-email",
      password: "StrongP@ssw0rd1!",
    });

    try {
      await user.validate();
    } catch (error) {
      expect(error.errors.email).toBeDefined();
      expect(error.errors.email.message).toBe("Invalid email");
    }
  });

  test("should validate password strength", async () => {
    const user = new User({
      username: "weakpassworduser",
      email: "weak@example.com",
      password: "weakpass",
    });

    try {
      await user.validate();
    } catch (error) {
      expect(error.errors.password).toBeDefined();
      expect(error.errors.password.message).toContain(
        "Please include at least 8 characters"
      );
    }
  });
});
