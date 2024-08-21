"use client";

import { Card, H4 } from "@/components/UI";
import { CardScanner } from "@/components/cardScanner/CardScanner";
import useApi from "@/helpers/apiRequest";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

export const PlayerVerification = () => {
  // ;
  const { fetchData, error, isLoading } = useApi();

  const t = useTranslations("tableData");

  // Document Type
  const [documentType, setDocumentType] = useState([]);
  const documentOptions = [
    { value: "Passport", label: "Passport" },
    { value: "Driving License", label: "Driving License" },
    { value: "Photo ID Card", label: "Photo ID Card" },
  ];

  //   upload Photo
  const documentPhoto = [
    {
      uid: "0",
      name: "xxx.png",
      status: "uploading",
      percent: 33,
    },
  ];

  const hasPhysicalCard = (data) => {
    return (
      data.front.handPresenceCheck === 1 && data.back.handPresenceCheck === 1
    );
  };

  const verifyCreditCard = async (recognizer) => {
    const { data, error } = await fetchData(
      "/player/creditCardVerify",
      "POST",
      {
        recognizer: recognizer,
      }
    );

    if (data) {
      toast.success(data.message);
    } else if (error) {
      // console.error("API Request Error:", error);
      toast.error(error.message);
    }
  };

  const handleCreditCard = (response) => {
    if (hasPhysicalCard(response.recognizer.documentLivenessCheck)) {
      verifyCreditCard(response.recognizer);
    } else {
      toast.error("Take the card in hand and try again");
    }
  };

  return (
    <>
      <section>
        <div className="grid tab:gap-2 laptop:gap-5">
          {/* <H4
            name="Coming Soon..."
            className="!text-indigo-500 text-center mb-5"
          /> */}

          {/* <Card className="">
            <H4 name="Identity" className="!text-white mb-2 text-center" />
            <P
              className="min-h-52 text-sm"
              name="Passport, Driving License or official Government issued ID card. Must be a Passport, Driving License or other official Government issued ID card. Both Front and Back of ID card must be received. Document must be in date and not expired. Document must be showing expiry date. Document must show your unaltered photo. Document must show your date of birth. Water marks on documents must be visible."
            />
            <div className="">
              <div className="text-left mt-3">
                <P name="Document Type" className="!text-white mb-2" />
                <Select
                  showSearch
                  placeholder="Select a currency"
                  value={documentType}
                  onChange={(documentType) => {
                    setDocumentType(documentType);
                  }}
                  style={{ width: "100%" }}
                  options={documentOptions}
                />
              </div>
              <div className="text-left mt-3">
                <P name="Photo ID" className="!text-white mb-2" />
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture"
                  className="!w-full text-white"
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />} className="text-white">
                    Choose Image
                  </Button>
                </Upload>
              </div>

              <UIButton name="Upload" className="w-full mt-5 bg-red-color" />
            </div>
          </Card> */}
          {/* item */}
          {/* <Card className="">
            <H4 name="Address" className="!text-white mb-2 text-center" />
            <P
              className="min-h-52 text-sm"
              name="Utility bill, phone bill or bank statement displaying your name and address in full. Must be either a utility bill, mobile phone bill or bank statement (copy of paper statement). Must show your FULL address including any post/zip codes. Must show your FULL name. Must display official logo of issuing company. Must be dated within the last 90 days. Must be able to see full document"
            />
            <div className="">
              <div className="text-left mt-3">
                <P name="Document Type" className="!text-white mb-2" />
                <Select
                  showSearch
                  placeholder="Select a currency"
                  value={documentType}
                  onChange={(documentType) => {
                    setDocumentType(documentType);
                  }}
                  style={{ width: "100%" }}
                  options={documentOptions}
                />
              </div>
              <div className="text-left mt-3">
                <P name="Photo ID" className="!text-white mb-2" />
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture"
                  className="!w-full text-white"
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />} className="text-white">
                    Proof of address
                  </Button>
                </Upload>
              </div>

              <UIButton name="Upload" className="w-full mt-5 bg-red-color" />
            </div>
          </Card> */}
          {/* item */}
          <Card className="">
            <H4
              name={t("creditCardVerification")}
              className="!text-white mb-2 text-center"
            />
            <div className="flex justify-center items-stretch h-[300px]">
              <CardScanner
                onScanSuccess={handleCreditCard}
                className="self-center"
              />
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};
