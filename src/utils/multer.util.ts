import { Request, Response } from "express";
const fs = require("fs");
const multer = require("multer");
import path from "path";

// config for uplaoding file with multer
export const multerStorageConfig = () => {
  // storage realted config to manage file uploads
  const storage = multer.diskStorage({
    destination: (req: Request, file: any, callback: any) => {
      const fileUploadPath = path.join(__dirname, "../../", "public/uploads");

      // if the directory doesn't exist then create it
      if (!fs.existsSync(fileUploadPath)) {
        fs.mkdirSync(fileUploadPath, { recursive: true }, (error: Error) => {
          if (error) console.log(error);
        });
      }

      callback(null, fileUploadPath);
    },
    filename: (req: Request, file: any, callback: any) => {
      callback(null, `csvfile.csv`);
    },
  });

  return storage;
};
