import { useForm } from "react-hook-form";
import { useEmailVerify } from "../../auth/useEmailVerify";
import { EmailVerifyType } from "@/constants/auth/EmailVerifyType";
import { useSignUpMutation } from "./useSignUpMutation";

export interface SignUpFormData {
  email: string;
  authCode: string;
  password: string;
  passwordCheck: string;
  required: string[];
  optional: string[];
}

export function useSignUpForm(onSuccessCallback?: () => void) {
  const methods = useForm<SignUpFormData>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
      required: [],
      optional: [],
    },
  });
  const signUpMutation = useSignUpMutation();

  const { isEmailSend, isEmailVerify, sendCode, verifyCode } = useEmailVerify({
    email: methods.watch("email"),
    code: methods.watch("authCode"),
    watch: methods.watch,
    setError: methods.setError,
    clearErrors: methods.clearErrors,
  });

  const onSubmit = (formData: SignUpFormData) => {
    const requiredTerms = formData.required || [];
    const isRequiredTermsAgreed =
      requiredTerms.includes("terms") &&
      requiredTerms.includes("privacy") &&
      requiredTerms.includes("data");

    if (!isRequiredTermsAgreed) {
      methods.setError("required", {
        type: "manual",
        message: "필수 약관에 모두 동의해 주세요.",
      });
      return;
    }

    signUpMutation.mutate(formData);
  };
  return {
    methods,
    onSubmit,
    isEmailSend,
    isEmailVerify,
    signUpError: signUpMutation.error,
    isSignUpLoading: signUpMutation.isPending,
    sendEmailAuth: () => sendCode(EmailVerifyType.SIGN_UP),
    verifyEmailAuth: () => verifyCode(EmailVerifyType.SIGN_UP),
  };
}
