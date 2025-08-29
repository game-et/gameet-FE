import { useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Checkbox } from "@heroui/react";

interface AllAgreedCheckboxProps {
  agreementNames: string[];
}

export default function AllAgreedCheckbox({ agreementNames }: AllAgreedCheckboxProps) {
  const { control, setValue, watch } = useFormContext();
  const { field } = useController({ name: "allAgreement", control });

  // 모두 동의 활성화 확인
  const isAllAgreed = agreementNames.every(name => {
    const value = watch(name);
    if (Array.isArray(value)) {
      if (name === "required") {
        return value.length === 3;
      }
      if (name === "optional") {
        return value.length >= 1;
      }
      return value.length > 0;
    }
    return Boolean(value);
  });

  useEffect(() => {
    field.onChange(isAllAgreed);
  }, [isAllAgreed, field]);

  const handleAllAgreedChange = (checked: boolean) => {
    if (checked) {
      // 모든 체크박스 활성화
      agreementNames.forEach(name => {
        if (name === "required") {
          setValue(name, ["terms", "privacy", "data"]);
        } else if (name === "optional") {
          setValue(name, ["ad_info"]);
        } else {
          setValue(name, true);
        }
      });
    } else {
      // 모든 체크박스 비활성화
      agreementNames.forEach(name => {
        if (name === "required" || name === "optional") {
          setValue(name, []);
        } else {
          setValue(name, false);
        }
      });
    }
  };

  return (
    <Checkbox isSelected={isAllAgreed} onValueChange={handleAllAgreedChange}>
      모두 동의합니다
    </Checkbox>
  );
}
