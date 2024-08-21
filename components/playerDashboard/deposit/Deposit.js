"use client";

import { Card } from "@/components/UI";
import useApi from "@/helpers/apiRequest";
import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { DepositData } from "./DepositData";

export const Deposit = () => {
  const { fetchData } = useApi();
  const [items, setItems] = useState([]);
  const [activeKey, setActiveKey] = useState("1");

  const onChange = (key) => {
    setActiveKey(key);
  };

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetchData("/player/getProfile", "GET");
        const country = response?.data?.Player?.country;
        const updatedItems = DepositData(country);
        setItems(updatedItems);
      } catch (error) {}
    };

    fetchCountry();
  }, [fetchData]);

  return (
    <>
      <section className="custom-tabs">
        <Card className="!p-3 tab:!p-5">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Card>
        {/* <DepositHistory /> */}
      </section>
    </>
  );
};
