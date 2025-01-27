"use server";

import { cookies } from "next/headers";
import catchAsyncError from "~/utils/catchAsyncError";
import sendingEmail from "~/utils/email";
import { encrypt } from "~/utils/encryption/encryptAndDecrypt";
import generate8digitNumber from "~/utils/javascript/generate8digitNumber";
import { generateOtpEmailTemplate } from "~/utils/otpTemplate";

type Props = { name: string; email: string; password: string };

const handleUserSignup = catchAsyncError(async (data: Props) => {
  const otp = generate8digitNumber();

  const encryptData = encrypt({ ...data, otp });

  cookies().set("_sig", encryptData, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  const html = generateOtpEmailTemplate(otp);
  await sendingEmail(data.email, "Your OTP Code", html);
});

export default handleUserSignup;
