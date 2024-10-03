"use client";

import { Card } from "@/components/UI";
import useApi from "@/helpers/apiRequest";
import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { WithdrawData } from "./WithdrawData";
import CustomSkeleton from "@/helpers/CustomSkeleton";

export const Withdraw = () => {
  const { fetchData } = useApi();
  const [items, setItems] = useState([]);
  const [activeKey, setActiveKey] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetchData("/player/getProfile", "GET");
        const country = response?.data?.Player?.country;
        const updatedItems = WithdrawData(country);
        setItems(updatedItems);
      } catch (error) {}
    };

    fetchCountry();
  }, [fetchData]);

  // Tabs Data
  const onChange = (key) => {
    setActiveKey(key);
  };

  return (
    <>
      <section className="custom-tabs">
        {isLoading ? (
          <CustomSkeleton hasImage={true} hasText={true} />
        ) : (
          <Card className="!p-2 tab:!p-5 laptop:w-[780px] m-auto">
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </Card>
        )}
      </section>
    </>
  );
};
