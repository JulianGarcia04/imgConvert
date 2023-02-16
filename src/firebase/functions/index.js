const gm = require("gm").subClass({ imageMagick: true });
const functions = require("firebase-functions");
// const { Storage } = require("@google-cloud/storage");
const admin = require("firebase-admin");
admin.initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// const { convert } = require("imagemagick-convert");
const path = require("path");
const os = require("os");
const fs = require("fs");

// const storage = new Storage();

exports.image_resize = functions.storage
  .object()
  .onFinalize(async (object, ctx) => {
    const fileName = path.basename(object.name);
    const name = fileName.split(".")[0];
    const bucket = admin.storage().bucket(object.bucket);
    const file = bucket.file(object.name);
    // const filePath = `gs://${object.bucket}/${object.name}`;
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const metadata = {
      contentType: "image/png",
    };
    // Download process
    try {
      await file.download({ destination: tempFilePath });
    } catch (error) {
      throw new Error(`File download failed: ${error}`);
    }
    // convert image process
    try {
      gm(tempFilePath)
        .resize(1280, 720)
        .write(tempFilePath, (err) => {
          if (!err) {
            functions.logger.log("Thumbnail created at", tempFilePath);
            return;
          }
        });

      await bucket.upload(tempFilePath, {
        destination: path.join(path.dirname(file.name), `${name}.png`),
        metadata: metadata,
      });

      return fs.unlinkSync(tempFilePath);
    } catch (error) {
      throw new Error(`File transform failed: ${error}`);
    }
    // Uploading the thumbnail.
  });
