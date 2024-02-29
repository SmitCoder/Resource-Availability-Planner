const mongoose = require("mongoose");
// const Employee = require('./models/employee');
const { MongoClient } = require("mongodb");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/LMS", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const client = new MongoClient("mongodb://localhost:27017/LMS", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Dummy data
// const dummyData = [
//   {
//     name: 'John Doe',
//     deptName: 'IT',
//     leaveFrom: new Date('2024-02-01'),
//     leaveTo: new Date('2024-02-03'),
//     leaveType: 'Vacation',
//   },
//   {
//     name: 'Jane Smith',
//     deptName: 'HR',
//     leaveFrom: new Date('2024-02-05'),
//     leaveTo: new Date('2024-02-07'),
//     leaveType: 'Sick Leave',
//   },
//   // Add more dummy data as needed
// ];

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
connectToMongoDB();

async function closeConnection() {
  await client.close();
  console.log("Disconnected from DB");
}

// Seed the database
// async function seedDatabase() {
//   try {
//     await Employee.deleteMany(); // Clear existing data
//     await Employee.insertMany(dummyData);
//     console.log('Database seeded successfully');
//   } catch (error) {
//     console.error('Error seeding database:', error);
//   } finally {
//     mongoose.disconnect();
//   }
// }

// seedDatabase();

const ExcelJS = require("exceljs");
const workbook = new ExcelJS.Workbook();

async function importExcelData() {
  await workbook.xlsx.readFile("Leaves.xlsx"); // replace with your file path

  const db = client.db("LMS"); // replace with your database name
  const tempCollection = db.collection("tempLeaves");

  const worksheet = workbook.getWorksheet("Leaves"); // replace with your sheet name

  worksheet.eachRow(async (row, rowNumber) => {
    // Assuming headers are in the first row
    if (rowNumber > 1) {
      const data = {
        name: row.getCell(1).value,
        fromDate: row.getCell(2).value,
        toDate: row.getCell(3).value,
        appliedLeaves: row.getCell(4).value,
        leaveType: row.getCell(5).value,
        modifyFromHalf: row.getCell(6).value,
        modifyToHalf: row.getCell(7).value,
      };

      await tempCollection.insertOne(data);
    }
  });

  console.log("Data imported into temporary collection");
}
importExcelData();

async function consolidateLeaves() {
  const db = client.db("LMS");
  const tempCollection = db.collection("tempLeaves");
  const finalCollection = db.collection("finalLeaves");

  const cursor = tempCollection.aggregate([
    {
      $group: {
        _id: "$name",
        leaveDates: {
          $addToSet: {
            fromDate: "$fromDate",
            toDate: "$toDate",
            leaveType: "$leaveType",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        leaveDates: 1,
      },
    },
  ]);

  const consolidatedLeaves = await cursor.toArray();

  const formattedLeaves = consolidatedLeaves.map((entry) => ({
    name: entry.name,
    leaveDates: entry.leaveDates.map((dateObj) => ({
      fromDate: new Date(dateObj.fromDate).toISOString(),
      toDate: new Date(dateObj.toDate).toISOString(),
      leaveType: dateObj.leaveType,
    })),
  }));

  // Insert consolidated data into final collection
  await finalCollection.insertMany(formattedLeaves);
  console.log("Data consolidated and inserted into final collection");
}
consolidateLeaves();
