import { CheckboxGroup } from "@heroui/react";
import { RegisterOptions, useController, useFormContext } from "react-hook-form";

interface CheckboxGroupProps {
  name: string;
  rules?: RegisterOptions;
  children: React.ReactNode;
}

export default function BaseCheckboxGroup({ name, rules, children }: CheckboxGroupProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <CheckboxGroup
      {...field}
      isInvalid={!!error}
      value={field.value || []}
      onValueChange={field.onChange}
    >
      {children}
    </CheckboxGroup>
  );
}
