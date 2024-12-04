import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Timer from "./timer-schema.js";

let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Disconnect and stop in-memory server
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clean up the Timer collection after each test
  await Timer.deleteMany();
});

describe("Timer Schema", () => {
  test("should fail validation if required fields are missing", async () => {
    const timer = new Timer({});
    try {
      await timer.validate();
    } catch (error) {
      expect(error.errors.userId).toBeDefined();
      expect(error.errors.timerId).toBeDefined();
    }
  });

  test("should apply default values for startTime and totalElapsedTime", async () => {
    const timer = new Timer({
      userId: "user123",
      timerId: "timer123",
    });
    const savedTimer = await timer.save();
    expect(savedTimer.startTime).toBeNull();
    expect(savedTimer.totalElapsedTime).toBe(0);
  });

  test("should save a valid Timer", async () => {
    const validTimer = new Timer({
      userId: "user123",
      timerId: "timer123",
      startTime: 1000,
      totalElapsedTime: 3600,
    });
    const savedTimer = await validTimer.save();
    expect(savedTimer.userId).toBe("user123");
    expect(savedTimer.timerId).toBe("timer123");
    expect(savedTimer.startTime).toBe(1000);
    expect(savedTimer.totalElapsedTime).toBe(3600);
  });

  test("should fetch a saved Timer", async () => {
    const validTimer = new Timer({
      userId: "user123",
      timerId: "timer123",
    });
    const savedTimer = await validTimer.save();
    const fetchedTimer = await Timer.findById(savedTimer._id);
    expect(fetchedTimer.userId).toBe("user123");
    expect(fetchedTimer.timerId).toBe("timer123");
  });

  test("should delete a Timer", async () => {
    const validTimer = new Timer({
      userId: "user123",
      timerId: "timer123",
    });
    const savedTimer = await validTimer.save();
    await Timer.findByIdAndDelete(savedTimer._id);
    const deletedTimer = await Timer.findById(savedTimer._id);
    expect(deletedTimer).toBeNull();
  });
});
