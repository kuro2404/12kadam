// import { MongoClient } from "mongodb";

// export default async function handler(req, res) {
//   const uri = process.env.MONGODB_URI;
//   const client = new MongoClient(uri, { useUnifiedTopology: true });
//   const dbName = "test";

//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection("fetchResults");

//     const { drawTime } = req.query;
//     console.log(drawTime, "check draw time");

//     const result = await collection
//       .find({ drawTime: { $lt: drawTime } })
//       .limit(20)
//       .toArray();
//     console.log(result, "check result");

//     if (result.length) {
//       const winningNumberArray = result
//         .map((doc) => doc.winningNumber)
//         .filter((_, i) => i % 2 !== 0);
//         console.log(winningNumberArray, "check result");
//       res.status(200).json({ winningNumberArray });
//     } else {
//       res
//         .status(404)
//         .json({
//           message: `No winning numbers found before draw time: ${drawTime}`,
//         });
//     }
//   } catch (err) {
//     console.log("Error connecting to database:", err);
//     res.status(500).json({ message: "Error connecting to database" });
//   } finally {
//     await client.close();
//   }
// }
