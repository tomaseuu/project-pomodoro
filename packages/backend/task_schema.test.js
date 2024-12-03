const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Task = require("./task_schema");
let mongoServer;

beforeAll(async () => {
  // Start an in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Disconnect and stop the in-memory server
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clean up the Tasks collection after each test
  await Task.deleteMany();
});

describe("Task Schema", () => {
  test("should fail validation if the Task field is missing", async () => {
    const task = new Task({});
    try {
      await task.validate();
    } catch (error) {
      expect(error.errors.Task).toBeDefined();
    }
  });

  test("should trim whitespace in the Task field", async () => {
    const task = new Task({ Task: "   Test Task   " });
    const savedTask = await task.save();
    expect(savedTask.Task).toBe("Test Task");
  });

  test("should save a valid Task", async () => {
    const validTask = new Task({ Task: "Complete Homework" });
    const savedTask = await validTask.save();
    expect(savedTask.Task).toBe("Complete Homework");
    expect(savedTask._id).toBeDefined(); // Ensure the task is saved with an ID
  });

  test("should fetch a saved Task", async () => {
    const validTask = new Task({ Task: "Read a book" });
    const savedTask = await validTask.save();

    const fetchedTask = await Task.findById(savedTask._id);
    expect(fetchedTask.Task).toBe("Read a book");
  });

  test("should delete a Task", async () => {
    const validTask = new Task({ Task: "Task to delete" });
    const savedTask = await validTask.save();

    await Task.findByIdAndDelete(savedTask._id);

    const deletedTask = await Task.findById(savedTask._id);
    expect(deletedTask).toBeNull();
  });
});
