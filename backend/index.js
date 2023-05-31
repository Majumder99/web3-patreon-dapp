const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(cors());
app.use(express.json());

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket("gs://patreon-226b8.appspot.com");

const uploadFile = (tokenId, startDate) => {
  const fileRef = storageRef.file(`metadata/${tokenId}.json`);
  const data = {
    attributes: [
      {
        trait_type: "expiry",
        value: Number(startDate) + 259200000,
      },
    ],
    description: "blah blah",
    image:
      "https://firebasestorage.googleapis.com/v0/b/patreon-226b8.appspot.com/o/image%2FPatron.png?alt=media&token=a020eb63-41fb-4a05-a975-d92e0b43d04e",
  };

  const dataString = JSON.stringify(data);
  const stream = fileRef.createWriteStream();
  stream.write(dataString);
  stream.end();

  stream.on("error", (error) => {
    console.log("Uploading error", error);
  });

  stream.on("finish", () => {
    console.log("Successfully uploading the file");
  });
};

app.get("/extraMonth", async (req, res) => {
  const { query } = req;
  let startDate = Date.now();
  if (query.expiry) {
    startDate = query.expiry;
  }
  uploadFile(query.id, startDate);
  return res.status(200).json({ success: "Uploading successfully" });
});

app.listen(port, () => {
  console.log(`Listening for API Calls`);
});
