"use client";

import { Select } from "antd";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const { Option } = Select;

function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localeActive = useLocale();

  const onSelectChange = (value) => {
    startTransition(() => {
      router.push(`/${value}`);
    });
  };

  return (
    <div className="local-switcher relative z-[999]">
      <Select
        value={localeActive}
        onChange={onSelectChange}
        disabled={isPending}
        className="!bg-[#0D0D0D]"
      >
        <Option value="en">
          <div className="flex items-center gap-2">
            <Image
              src="/images/flags/english.png"
              width="35"
              height="35"
              alt="english"
              className="w-8 h-8"
              quality={60}
            />
            Eng
          </div>
        </Option>
        <Option value="de">
          <div className="flex items-center gap-2">
            <Image
              src="/images/flags/german.png"
              width="35"
              height="35"
              alt="english"
              className="w-8 h-8"
              quality={60}
            />
            Ger
          </div>
        </Option>
        <Option value="es">
          <div className="flex items-center gap-2">
            <Image
              src="/images/flags/spanish.png"
              width="35"
              height="35"
              alt="english"
              className="w-8 h-8"
              quality={60}
            />
            Spa
          </div>
        </Option>
        <Option value="fr">
          <div className="flex items-center gap-2">
            <Image
              src="/images/flags/french.png"
              width="35"
              height="35"
              alt="french"
              className="w-8 h-8"
              quality={60}
            />
            Fra
          </div>
        </Option>
      </Select>
    </div>
  );
}

export default LocalSwitcher;
