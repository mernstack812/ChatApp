import jwt from "jsonwebtoken";

export const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECERET_KEY, {
    expiresIn: "10d",
  });

  console.log("mtoken name :" + token);
  console.log("mresponse : " + res);

  res.cookie("jwt", token, {
    httpOnly: true,
  });

  
};
