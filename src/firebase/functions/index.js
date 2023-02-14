const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const spawn = require("child_process").spawnSync;
const path = require("path");
const os = require("os");
const fs = require("fs");

exports.image_resize = functions.storage.object().onFinalize((object) => {
  const fileName = path.basename(object.name);

  const tempFilePath = path.join(os.tmpdir(), fileName);
  const bucket = admin.storage().bucket(object.bucket);
  const metadata = {
    contentType: "image/png",
  };
  spawn("convert", [tempFilePath, "-thumbnail", "1280x720>", tempFilePath]);
  functions.logger.log("Thumbnail created at", tempFilePath);
  const thumbFileName = `thumb_${object.name}`;
  const thumbFilePath = path.join(path.dirname(object.name), thumbFileName);
  // Uploading the thumbnail.
  bucket.upload(tempFilePath, {
    destination: thumbFilePath,
    metadata: metadata,
  });
  // Once the thumbnail has been uploaded delete the local file to free up disk space.
  return fs.unlinkSync(tempFilePath);
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
