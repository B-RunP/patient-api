const crypto = require("crypto");
const jwtSecret = crypto.randomBytes(64).toString("hex");
console.log(jwtSecret);

// 8c8001393c76cb77aeb35c6d10b8f926906d5e35929aa88654ac707b3cbac7b2f6a1e85b323b295f2a1d0425b83f5d60e7698a7d12dd4d9fb8993949c76cf3df
