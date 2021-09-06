import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import Transaction from "./Transactions";
const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("Profile"));

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>History</h3>
      {user ? (
        <ul className="list">
          {transactions
            .filter(
              (transaction) =>
                transaction.creator ===
                (user?.result.googleId || user?.result._id)
            )
            .map((filteredTransaction) => (
              <Transaction
                key={filteredTransaction._id}
                transaction={filteredTransaction}
              />
            ))}
        </ul>
      ) : (
        <p>SignIn to see your transactions</p>
      )}
    </>
  );
};

export default TransactionList;
