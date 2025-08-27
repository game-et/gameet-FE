import { useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Checkbox } from "@heroui/react";

interface AllAgreedCheckboxProps {
  agreementNames: string[];
}

export default function AllAgreedCheckbox({ agreementNames }: AllAgreedCheckboxProps) {
  const { control, setValue, watch } = useFormContext();
  const { field } = useController({ name: "allAgreement", control });

  const agreedValueState = watch(agreementNames);
  const isAllAgreed = agreedValueState.every(value => value);

  useEffect(() => {
    field.onChange(isAllAgreed);
  }, [isAllAgreed, field]);

  const handleAllAgreedChange = (checked: boolean) => {
    if (checked) {
      agreementNames.forEach(el => setValue(el, true));
    } else {
      agreementNames.forEach(name => setValue(name, false));
    }
  };

  return (
    <Checkbox checked={isAllAgreed} onValueChange={handleAllAgreedChange}>
      모두 동의합니다
    </Checkbox>
  );
}
