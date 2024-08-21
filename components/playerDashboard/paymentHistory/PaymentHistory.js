"use client";

import { Tabs } from "antd";
import { DepositHistory } from "../deposit/DepositHistory";
import WithdrawHistory from "../withdraw/WithdrawHistory";

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Deposit History",
    children: (
      <>
        <DepositHistory />
      </>
    ),
  },
  {
    key: "2",
    label: "Withdraw History",
    children: (
      <>
        <WithdrawHistory />
      </>
    ),
  },
];

export default function PaymentHistory() {
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
}
