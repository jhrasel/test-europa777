import { Container, P } from "@/components/UI";
import Image from "next/image";
import Link from "next/link";

export default function FooterLicence() {
  return (
    <>
      <section>
        <Container>
          <div className="flex flex-col gap-5">
            {/* item */}
            <div className="flex items-center gap-3">
              {/* img */}
              <Link
                href="https://validator.antillephone.com.lc/validate_domaine_europa777com_seal_id_a50d55ac24ed4eb5cf07aa027af374d2af4ec45781c23c191d2238f967cacf795e1d154ef63ef980d562c0d09ca40feestampfdc0ab6ad95f3111f5d77983bd3c049b/"
                target="_blank"
                className="w-[70px]"
              >
                {/* <Image
                  src="/images/FooterLicence.png"
                  alt="FooterLicence.png"
                  width="70"
                  height="70"
                /> */}
              </Link>
              {/* text */}
              <P
                name="Europa777 is operated by TriMat Gaming B.V. bearing company registration number 164107, a company incorporated under the laws of Curaçao, having its registered address at 	Schottegatweg Oost 10 Unit 1-9, Bon Bini Business Center, issued by Antillephone N.V. .  Payments are processed by Tkd advertising and development agency limited, with its registered address at Vistra Corporate Services Centre, Suite 23, 1st Floor, Eden Plaza, Eden Island, Mahé, Republic of Seychelles registration number 160889, as per agreement between the two companies."
                className="w-[90%]"
              />
            </div>

            {/* item */}
            <div className="flex items-center gap-3">
              {/* img */}
              <div className="w-[70px] text-center">
                <Image
                  src="/images/over_18_logo.png"
                  alt="over_18_logo.png"
                  width="45"
                  height="45"
                  className="m-auto"
                />
              </div>
              {/* text */}
              <P
                name="Only players above the age of 18 and who reside in countries where gambling is legal are allowed to play on Europa777.com"
                className="w-[90%]"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
