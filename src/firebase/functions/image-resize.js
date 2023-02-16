const functions = require("firebase-functions");
const spawn = require("child_process").spawnSync;
const path = require("path");
const os = require("os");

exports.image_resize = functions.storage.object().onFinalize((object) => {
  const tempFilePath = path.join(os.tmpdir(), object.name);
  object.contentType = "image/png";
  spawn("convert", [tempFilePath, "-thumbnail", "200x200>", tempFilePath]);
  functions.logger.log("Thumbnail created at", tempFilePath);
});
