import MultiCurrencyIcon from "@/svgs/MultiCurrencyIcon";
import SafetyIcon from "@/svgs/SafetyIcon";

import {
  Container,
  H2,
  H4,
  H5,
  List,
  ListItem,
  P,
  UIImage,
  UILink,
} from "@/components/UI";

import {
  FooterAboutData,
  FooterInformationData,
  FooterQuickLinksData,
} from "@/data/FooterData";
import AdultIcon from "@/svgs/AdultIcon";
import HeadPhoneIcon from "@/svgs/HeadPhoneIcon";
import LikeIcon from "@/svgs/LikeIcon";
import { useTranslations } from "next-intl";
import Link from "next/link";
import FooterLicence from "./FooterLicence";

const Footer = () => {
  const footerAboutData = FooterAboutData();
  const footerInformationData = FooterInformationData();
  const footerQuickLinksData = FooterQuickLinksData();

  const t = useTranslations("Menubar");
  const footer = useTranslations("Footer");
  const footerMenu = useTranslations("HomePage");

  return (
    <>
      <section className="py-8">
        <Container>
          <H5 name={footer("Description1")} className="text-center" />
          <H5 name={footer("Description2")} className="text-center" />

          <div className="mt-8 text-center">
            <H2 name={footer("whyChoose")} />
            <P name={footer("whyChooseDes")} className="mt-1" />
          </div>

          {/*card*/}
          <div className="grid grid-cols-1 tab:grid-cols-2 desktop:grid-cols-4 gap-5 mt-9">
            <div className="bg-bg-color2 p-5">
              <div className="w-[45px]">
                <MultiCurrencyIcon />
              </div>
              <H4 name={footer("whyChooseItem1")} className="mt-7 text-white" />
              <P name={footer("whyChooseDes1")} className="mt-3" />
            </div>
            <div className="bg-bg-color2 p-5">
              <div className="w-[45px]">
                <SafetyIcon />
              </div>
              <H4 name={footer("whyChooseItem2")} className="mt-7 text-white" />
              <P name={footer("whyChooseDes2")} className="mt-3" />
            </div>
            <div className="bg-bg-color2 p-5">
              <div className="w-[45px]">
                <HeadPhoneIcon />
              </div>
              <H4 name={footer("whyChooseItem3")} className="mt-7 text-white" />
              <P name={footer("whyChooseDes3")} className="mt-3" />
            </div>
            <div className="bg-bg-color2 p-5">
              <div className="w-[45px]">
                <LikeIcon />
              </div>
              <H4 name={footer("whyChooseItem4")} className="mt-7 text-white" />
              <P name={footer("whyChooseDes4")} className="mt-3" />
            </div>
          </div>

          {/*  Brand  */}
          <div className="grid grid-cols-2 laptop:grid-cols-5 gap-5 mt-14 items-center">
            <div className="">
              <UILink
                href="https://www.online-casinos.ca/"
                name={
                  <UIImage
                    src="/images/brand/reviewed-by-online-casinos.svg"
                    alt="brand"
                    className="w-full h-[50px] object-cover"
                  />
                }
                target="_blank"
              />
            </div>
            <div className="">
              <UILink
                href="https://www.top10casinos.com/"
                name={
                  <UIImage
                    src="/images/brand/reviewed-by-top10casinos.svg"
                    alt="brand"
                    className="w-full h-auto object-cover"
                  />
                }
                target="_blank"
              />
            </div>
            <div className="">
              <UILink
                href="https://www.casino-on-line.com/"
                name={
                  <UIImage
                    src="/images/brand/reviewed-by-casino-online.png"
                    alt="brand"
                    className="w-full h-auto object-cover"
                  />
                }
                target="_blank"
              />
            </div>
            <div className="">
              <UILink
                href="https://casinosincanada.com/casinos/canada777/"
                name={
                  <UIImage
                    src="/images/brand/casinosincanada.png"
                    alt="brand"
                    className="w-full h-auto object-cover"
                  />
                }
                target="_blank"
              />
            </div>
            <div className="">
              <UILink
                href="https://casinolandia.com/casinos/canada777-casino/"
                name={
                  <UIImage
                    src="/images/brand/casinolandia.svg"
                    alt="brand"
                    className="w-full h-auto object-cover"
                  />
                }
                target="_blank"
              />
            </div>
          </div>
        </Container>
      </section>

      {/*Footer Menu*/}
      <section className="pt-10 py-3">
        <Container>
          <div className="grid grid-cols-2 tab:grid-cols-3 gap-5">
            {/*item*/}
            <div className="">
              <H4 name={t("About Us")} />
              <List className="mt-5">
                {footerAboutData?.map((data, i) => (
                  <ListItem key={i} className="mb-2">
                    <UILink
                      href={data.url}
                      name={data.name}
                      target={data.external ? "_blank" : ""}
                      className="text-text-color-primary hover:text-blue-color"
                    />
                  </ListItem>
                ))}
              </List>
            </div>

            {/*item*/}
            <div className="">
              <H4 name={footerMenu("Information")} />
              <List className="mt-5">
                {footerInformationData?.map((data, i) => (
                  <ListItem key={i} className="mb-2">
                    <UILink
                      href={data.url}
                      name={data.name}
                      className="text-text-color-primary hover:text-blue-color"
                    />
                  </ListItem>
                ))}
              </List>
            </div>

            {/*item*/}
            <div className="">
              <H4 name={footerMenu("QuickUILinks")} />
              <List className="mt-5">
                {footerQuickLinksData?.map((data, i) => (
                  <ListItem key={i} className="mb-2">
                    <UILink
                      href={data.url}
                      name={data.name}
                      className="text-text-color-primary hover:text-blue-color"
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </div>

          <div className="border-t border-primary-color mt-5 pt-5 text-center">
            <P name="© 2023 Europa777" />
          </div>

          {/*    adult*/}
          <div className="text-center px-3 py-5 tab:p-10 bg-bg-color2 mt-7">
            <AdultIcon />
            <P name="Contact us by" className="mt-2" />
            <div className="mt-2">
              <Link
                href="https://tawk.to/europa777"
                target="_blank"
                className="text-white border-r border-white mr-3 pr-3 mob:text-sm"
              >
                Support
              </Link>
              <Link
                href="tel:(604) 227-4664"
                className="text-white mob:text-sm"
              >
                Telephone: (604) 227-4664
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <FooterLicence />
    </>
  );
};

export default Footer;
