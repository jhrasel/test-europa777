import Link from "next/link";

export const metadata = {
  title: "FAQ",
};

const page = () => {
  const appTitle = "Europa777";
  return (
    <>
      <div className="rule-header">Frequently Ask Questions</div>
      <div className="rule-body">
        <div className="rule-label">1. What is {appTitle} ?</div>
        <div className="rule-content">
          <p>
            We are a online casino where gambling activities are hosted by
            numbers renowned gaming providers in the industry with over 3100
            games to play. Click here to learn more{" "}
            <Link style={{ color: "blueviolet" }} href="/about-us">
              about us
            </Link>
          </p>
        </div>
        <div className="rule-label">
          2. What currencies does {appTitle} accept ?
        </div>
        <div className="rule-content">
          <p>
            We accept CAD, USD, GBP, and EUR. However, you can deposit in
            certain cryptocurrencies that will be converted to your choice of
            the aformentioned currencies to play in. See the{" "}
            <Link style={{ color: "blueviolet" }} href="/deposit" />
            Payment Page
          </p>
        </div>
        <div className="rule-label">3. Who can play at {appTitle} ?</div>
        <div className="rule-content">
          <p>
            {appTitle} is available to most players from around the world,
            unfortunately however, players from the following the following
            countries are restricted from registering: Afghanistan, Aruba,
            Bonaire, Burma, Congo, Curacao, Eritrea, Ethiopia, France, Iran,
            Iraq, Libya, Malaysia, Myanmar, The Netherlands, North Korea,
            Palestine, Saba, Singapore, Somalia, Statia, St. Maarten, Sudan,
            Syria, Singapore, United Kingdom, Yemen, and Zimbabwe.
          </p>
        </div>
        <div className="rule-label">4. Are there any bonus restrictions ?</div>
        <div className="rule-content">
          <p>
            Our amazing bonuses will have different terms and conditions, so
            read them carefully before accepting. If you have any further
            questions, please contact our brilliant Support Team.
          </p>
        </div>
        <div className="rule-label">5. How do I claim a bonus ?</div>
        <div className="rule-content">
          <p>
            All bonuses will have a coupon code for you to redeem, once you have
            chosen the bonus you will like to use
          </p>
          <p>Go to the Dashboard section in the from left side menu</p>
          <p>Select the Deposit Tab</p>
          <p>Choose Bonus Package</p>
          <p>Make your deposit and the bonus will be added automatically</p>
        </div>
        <div className="rule-label">6. What are wagering requirements ?</div>
        <div className="rule-content">
          <p>
            All our bonuses have their own terms and conditions and the wagering
            requirement specifies how many times the bonus funds have to be
            wagered before making a withdrawal. You will however see the bonus
            requirements below each bonus on the{" "}
            <Link style={{ color: "blueviolet" }} href="#">
              Promotions
            </Link>{" "}
            as well as the{" "}
            <Link style={{ color: "blueviolet" }} href="bonus-terms">
              Bonus Terms
            </Link>{" "}
            pages.
          </p>
        </div>
        <div className="rule-label">7. What is a welcome bonus ?</div>
        <div className="rule-content">
          <p>
            Welcome bonuses provide new players with bonus monies equal to a
            percentage of their initial deposit to welcome them to the casino
            and give them a taste of whats on offer.
          </p>
        </div>
        <div className="rule-label">
          8. What if I have a problem or complaint ?
        </div>
        <div className="rule-content">
          <p>
            That is why our excellent Support Team are there for you 24/7 to
            assist you with anything you may need via our live chat function or
            email at support@canada777.com
          </p>
        </div>
        <div className="rule-label">
          9. Is there a minimum or maximum deposit or withdrawal limit ?
        </div>
        <div className="rule-content">
          <p>
            There is a minimum accepted deposit of US$ 20 or currency equivalent
            to make your way to winning.
          </p>
          <p></p>
          <p>
            The minimum withdrawal is US$ 50 or currency equivalent with a
            maximum daily (24 hour period) withdrawal limit of $4,000.
          </p>
        </div>
        <div className="rule-label">10. Can I win real money ?</div>
        <div className="rule-content">
          <p>
            Absolutely, all games allow you to play for real cash prizes and
            luck jackpots along the way. If you feel the need to practice a bit
            first, you can play the games in Demo.
          </p>
        </div>
        <div className="rule-label">11. How can I deposit or withdraw ?</div>
        <div className="rule-content">
          <p>
            {" "}
            The following deposit and withdrawal methods are available at{" "}
            {appTitle}: Interac, Visa, MasterCard, Crypto Wallet: BTC, LTC, ETH,
            TRX (Tron), BNB (Binance coin), BUSB (Binance USD). Learn ore on our{" "}
            <Link style={{ color: "blueviolet" }} href="deposit">
              Payments
            </Link>{" "}
            page.
          </p>
        </div>
      </div>
    </>
  );
};

export default page;
