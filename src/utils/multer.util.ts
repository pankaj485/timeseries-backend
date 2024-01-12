const fs = require("fs");
const multer = require("multer");
import path from "path";

export const multerConfig = () => {
  return multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
      const fileUploadPath = path.resolve(__dirname, "./uploads");

      // if the directory doesn't exist then create it
      if (!fs.existsSync(fileUploadPath)) {
        fs.mkdirSync(fileUploadPath, { recursive: true }, (error: Error) => {
          if (error) console.log(error);
        });
      }

      cb(null, fileUploadPath);
    },
    filename: function (req: any, file: any, cb: any) {
      cb(null, file.fieldname + ".csv");
    },
  });
};
