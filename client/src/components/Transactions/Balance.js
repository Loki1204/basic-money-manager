import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { numberWithCommas } from "../../utils/format";
const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("Profile"));

  const amounts = transactions
    .filter(
      (transaction) =>
        transaction.creator === (user?.result._id || user?.result.googleId)
    )
    .map((filteredTransaction) => filteredTransaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  return (
    <>
      <>
        <h4>Your Balance</h4>
        <h1>₹{numberWithCommas(total)}</h1>
      </>
    </>
  );
};

export default Balance;
