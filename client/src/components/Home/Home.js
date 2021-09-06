import React from "react";

import Balance from "../Transactions/Balance";
import IncomeExpenses from "../Transactions/IncomeExpenses";
import TransactionList from "../Transactions/TransactionList";
import AddTransaction from "../Transactions/AddTransaction";

const Home = () => {
  return (
    <div>
      <Balance />
      <IncomeExpenses />
      <TransactionList />
      <AddTransaction />
    </div>
  );
};

export default Home;
