import { LoginForm } from "../_components/LoginForm";

type SignInPageProps = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const SignInPage = ({ searchParams }: SignInPageProps) => {
  return (
    <LoginForm
      error={searchParams?.error}
      // callbackUrl={
      //   searchParams?.callbackUrl
      //     ? searchParams?.callbackUrl
      //     : process.env.NEXT_PUBLIC_URL
      // }
      callbackUrl={
        searchParams?.callbackUrl !== process.env.NEXT_PUBLIC_URL
          ? searchParams?.callbackUrl
          : ""
      }
    />
  );
};

export default SignInPage;
