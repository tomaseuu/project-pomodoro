import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Task from "./task-schema.js";
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
  await Task.deleteMany();
});

describe("Task Schema", () => {
  test("should fail validation if the Task field is missing", async () => {
    const task = new Task({});
    try {
      await task.validate();
    } catch (error) {
      expect(error.errors.task).toBeDefined();
    }
  });

  test("should trim whitespace in the Task field", async () => {
    const task = new Task({ 
      userId: "validUserId",
      task: "   Trimmed Task   ", 
    });
    await task.save();
    const savedTask = await task.save();
    expect(savedTask.task).toBe("Trimmed Task");
  });

  test("should save a valid Task", async () => {
    const task = new Task({
      userId: "validUserId",
      task: "Sample Task",
      completed: false,
    });
    const savedTask = await task.save();
    expect(savedTask).toBeDefined();
    expect(savedTask.task).toBe("Sample Task");
    expect(savedTask.userId).toBe("validUserId");
  });
  

  test("should fetch a saved Task", async () => {
    const task = new Task({
      userId: "validUserId",
      task: "Fetch Me",
    });
    await task.save();
  
    const foundTask = await Task.findOne({ task: "Fetch Me" });
    expect(foundTask).toBeDefined();
    expect(foundTask.task).toBe("Fetch Me");
  });
  

  test("should delete a Task", async () => {
    const task = new Task({
      userId: "validUserId",
      task: "Delete Me",
    });
    await task.save();
  
    await Task.deleteOne({ task: "Delete Me" });
    const deletedTask = await Task.findOne({ task: "Delete Me" });
    expect(deletedTask).toBeNull();
  });
  
});
