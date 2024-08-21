"use client";

import { Card } from "@/components/UI";
import { Tabs } from "antd";
import { useState } from "react";
import { WithdrawData } from "./WithdrawData";

export const Withdraw = () => {
  const [withdrawsDatas, setwithdrawsData] = useState([]);
  const [activeKey, setActiveKey] = useState("1");

  // Tabs Data
  const onChange = (key) => {
    setActiveKey(key);
  };

  const items = WithdrawData;

  return (
    <>
      <section className="custom-tabs">
        <Card>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Card>
      </section>
    </>
  );
};
