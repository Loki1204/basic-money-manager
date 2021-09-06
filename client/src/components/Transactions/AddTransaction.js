import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const user = JSON.parse(localStorage.getItem("Profile"));

  // Handling the Transaction form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setText("");
    setAmount(0);

    // Creating a new transaction
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
      creator: user.result._id || user.result.googleId,
    };

    addTransaction(newTransaction);
  };

  return (
    <>
      <h3>Add a new transaction</h3>
      {user ? (
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text..."
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">
              Amount <br />
              (negative - expense, positive - income)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
            />
          </div>
          <button className="btn" type="submit">
            Add transaction
          </button>
        </form>
      ) : (
        <p>SignIn to add transactions</p>
      )}
    </>
  );
};

export default AddTransaction;
