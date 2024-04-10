const mongoose = require("mongoose");

//AACOUNT SCHEMA

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    accountType: {
      type: String,
      enum: [
        "Savings",
        "Investments",
        "Checking",
        "Credit Card",
        "Building",
        "School",
        "Project",
        "Utilities",
        "Travel",
        "Personal",
        "Groceries",
        "Entertainment",
        "Loan",
        "Cash Flow",
        "Uncategorized",
      ],
      required: true,
    },

    initialBalance: {
      type: Number,
      default: 0,
    },
    //account can have many transaction so using "Referencing"
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//MODEL
const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
