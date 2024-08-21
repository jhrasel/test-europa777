"use client";

import { Select } from "antd";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { UIImage } from "./UI";

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
            <UIImage src="/images/flags/english.png" className="!w-auto !h-8" />
            Eng
          </div>
        </Option>
        <Option value="de">
          <div className="flex items-center gap-2">
            <UIImage src="/images/flags/german.png" className="!w-auto !h-8" />
            Ger
          </div>
        </Option>
        <Option value="es">
          <div className="flex items-center gap-2">
            <UIImage src="/images/flags/spanish.png" className="!w-auto !h-8" />
            Spa
          </div>
        </Option>
        <Option value="fr">
          <div className="flex items-center gap-2">
            <UIImage src="/images/flags/french.png" className="!w-auto !h-8" />
            Fra
          </div>
        </Option>
      </Select>
    </div>
  );
}

export default LocalSwitcher;
