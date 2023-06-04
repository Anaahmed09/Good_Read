const path = require("path");
const fs = require("fs");
const mime = require("mime");
const sharp = require("sharp");
// Validation functions
const validateEmail=(email)=> {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
const validatePassword=(password, minLength, maxLength)=> {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$&/?]).{8,20}$/;
    return (
      password.length >= minLength &&
      password.length <= maxLength &&
      re.test(password)
    );
  }
const validateInput=(input, min, max)=> {
    if (
      input &&
      typeof input == "string" &&
      input.length > min &&
      input.length < max
    ) {
      return true;
    }
  }
const validateImage=(filename)=>{
    if (!fs.existsSync(filename) || !fs.statSync(filename).isFile()) {
      return false;
    }
    const ext = path.extname(filename);
    if (![".jpg", ".jpeg", ".png", ".gif", ".webp", ".tiff"].includes(ext)) {
      return false;
    }
    try {
      const buffer = fs.readFileSync(filename);
      const metadata = sharp(buffer).metadata();
      if (
        !metadata.format ||
        !["jpeg", "png", "gif", "webp", "tiff"].includes(metadata.format)
      ) {
        return false;
      }
    } catch (err) {
      return false;
    }
    return true;
  }
  module.exports = {validateEmail,validatePassword,validateInput,validateImage};