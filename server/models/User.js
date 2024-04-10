const mongoose = require("mongoose");

//USER SCHEMA

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    hasCreatedAccount: {
      type: Boolean,
      default: false,
    },
    //user can have many accounts so using "Referencing"
    accounts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//MODEL
const User = mongoose.model("User", userSchema);
//(.model("User"..) User is a collection name in the database)

module.exports = User;
