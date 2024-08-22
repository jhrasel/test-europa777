"use client";

import { Container, H2, H4, ListItem, P, UIImage } from "@/components/UI";
import SignIn from "@/components/signIn/SignIn";
import useAuth from "@/helpers/useAuth";
import { List } from "antd";
import { useTranslations } from "next-intl";
import { FaRegCheckCircle } from "react-icons/fa";

export const Cashback = () => {
  const t = useTranslations("Common");
  const cashback = useTranslations("CashbackPage");
  const { isLoggedIn } = useAuth();

  return (
    <>
      <section>
        <Container>
          <div className="w-full desktop:w-[80%] m-auto">
            <UIImage
              src="/images/cashback.jpg"
              className="w-full h-auto rounded-3xl"
            />
            <H4
              name={`${cashback("cashback")} 20%`}
              className="mt-3 mb-6 text-white"
            />
            <H2
              name={`${cashback("everyday")} 20%`}
              className="laptop:!text-4xl desktop:!text-5xl !text-blue-color"
            />
            <P name={cashback("description")} className="mt-2" />
            <List className="mt-6">
              <ListItem className="flex items-start gap-2">
                <FaRegCheckCircle className="text-4xl text-white" />
                <P name={cashback("listDes1")} className="w-90% text-white" />
              </ListItem>
            </List>

            <div className="mt-5">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-bg-color3">
                    <th className="text-left text-md laptop:text-xl text-white p-3">
                      Cashback
                    </th>
                    <th className="text-left text-md laptop:text-xl text-white p-3">
                      Deposit amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-bg-color1">
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      10%
                    </td>
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      USD 20 - USD 499
                    </td>
                  </tr>
                  <tr className="bg-bg-color2">
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      11%
                    </td>
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      USD 500 - USD 699
                    </td>
                  </tr>
                  <tr className="bg-bg-color1">
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      12%
                    </td>
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      USD 700 - USD 799
                    </td>
                  </tr>
                  <tr className="bg-bg-color2">
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      13%
                    </td>
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      USD 800 - USD 999
                    </td>
                  </tr>
                  <tr className="bg-bg-color1">
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      14%
                    </td>
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      USD 1000 - USD 1499
                    </td>
                  </tr>
                  <tr className="bg-bg-color2">
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      15%
                    </td>
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      USD 1500 - USD 1999
                    </td>
                  </tr>
                  <tr className="bg-bg-color1">
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      16%
                    </td>
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      USD 2000 - USD 2499
                    </td>
                  </tr>
                  <tr className="bg-bg-color2">
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      17%
                    </td>
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      USD 2500 - USD 2499
                    </td>
                  </tr>
                  <tr className="bg-bg-color1">
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      18%
                    </td>
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      USD 3500 - USD 3999
                    </td>
                  </tr>
                  <tr className="bg-bg-color2">
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      19%
                    </td>
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      USD 4000 - USD 4999
                    </td>
                  </tr>
                  <tr className="bg-bg-color1">
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      20%
                    </td>
                    <td className="text-left text-sm laptop:text-md text-white p-3">
                      USD 5000 or more
                    </td>
                  </tr>
                  <tr className="bg-bg-color2">
                    <td
                      colSpan={2}
                      className="text-left text-md text-white p-7"
                    >
                      or the equivalent in other currencies at the internal
                      casino exchange rates.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <List className="mt-6">
              <ListItem className="flex items-start gap-5 mb-4">
                <FaRegCheckCircle className="text-3xl text-white" />
                <P name={cashback("listDes2")} className="w-[90%] text-white" />
              </ListItem>
              <ListItem className="flex items-start gap-5 mb-4">
                <FaRegCheckCircle className="text-3xl text-white" />
                <P name={cashback("listDes3")} className="w-[90%] text-white" />
              </ListItem>
              <ListItem className="flex items-start gap-5 mb-4">
                <FaRegCheckCircle className="text-3xl text-white" />
                <P name={cashback("listDes4")} className="w-[90%] text-white" />
              </ListItem>
              <ListItem className="flex items-start gap-5 mb-4">
                <FaRegCheckCircle className="text-3xl text-white" />
                <P name={cashback("listDes5")} className="w-[90%] text-white" />
              </ListItem>
              <ListItem className="flex items-start gap-5 mb-4">
                <FaRegCheckCircle className="text-3xl text-white" />
                <P name={cashback("listDes6")} className="w-[90%] text-white" />
              </ListItem>
              <ListItem className="flex items-start gap-5 mb-4">
                <FaRegCheckCircle className="text-3xl text-white" />
                <P name={cashback("listDes7")} className="w-[90%] text-white" />
              </ListItem>
              <ListItem className="flex items-start gap-5 mb-4">
                <FaRegCheckCircle className="text-3xl text-white" />
                <P name={cashback("listDes8")} className="w-[90%] text-white" />
              </ListItem>
              <ListItem className="flex items-start gap-5 mb-4">
                <FaRegCheckCircle className="text-3xl text-white" />
                <P name={cashback("listDes9")} className="w-[90%] text-white" />
              </ListItem>
              <ListItem className="flex items-start gap-5 mb-4">
                <FaRegCheckCircle className="text-3xl text-white" />
                <P
                  name={cashback("listDes10")}
                  className="w-[90%] text-white"
                />
              </ListItem>

              {/* <ListItem className="flex items-start gap-5 mb-4">
                <UILink
                  href=""
                  name="Read more about our Bonus Terms and Conditions"
                  className="!text-blue-color"
                />
              </ListItem> */}
            </List>

            <div className="text-center">
              {isLoggedIn ? (
                ""
              ) : (
                <SignIn name={t("Sign In")} className="bg-blue-color" />
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
