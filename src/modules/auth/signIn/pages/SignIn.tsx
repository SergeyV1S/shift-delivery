import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";

import { PhoneForm } from "../_components/PhoneForm";
import { SignInForm } from "../_components/SignInForm";
import { TimerWithLink } from "../_components/TimerWithLink";
import { useSignIn } from "../model";

const SignInPage = () => {
  const {
    onOtpSubmit,
    signIn,
    state: { isLoading, retryDelay, phoneNumber }
  } = useSignIn();

  return (
    <Card className='m-auto w-full max-w-sm'>
      <CardHeader className='text-center border-b py-4 border-b-slate-200'>
        <CardTitle className='text-2xl'>Авторизация</CardTitle>
      </CardHeader>
      <CardContent className='mt-5'>
        {retryDelay ? (
          <SignInForm isLoading={isLoading} onSubmit={signIn} />
        ) : (
          <PhoneForm onSubmit={onOtpSubmit} isLoading={isLoading} />
        )}
      </CardContent>
      {retryDelay && phoneNumber && <TimerWithLink sendCode={onOtpSubmit} />}
    </Card>
  );
};

export default SignInPage;
