import AllAgreedCheckbox from "@/components/common/checkbox/AllAgreedCheckbox";
import BaseCheckboxGroup from "@/components/common/checkbox/BaseCheckboxGroup";
import { Checkbox } from "@heroui/react";

export default function TermsArgreement() {
  const allTerms = ["required", "optional"];

  return (
    <div className="flex flex-col gap-2 my-5">
      <AllAgreedCheckbox agreementNames={allTerms} />
      <hr className="w-full border-primary-gray opacity-80" />

      <BaseCheckboxGroup name="required">
        <Checkbox value="terms">[필수] 이용약관 동의</Checkbox>
        <Checkbox value="privacy">[필수] 개인정보 수집 및 이용동의</Checkbox>
        <Checkbox value="data">[필수] 개인정보 처리 위탁동의</Checkbox>
      </BaseCheckboxGroup>

      <BaseCheckboxGroup name="optional">
        <Checkbox value="ad_info">[선택] 광고성 정보 수신 동의</Checkbox>
      </BaseCheckboxGroup>
    </div>
  );
}
