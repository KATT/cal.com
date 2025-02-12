import type { GetServerSidePropsContext } from "next";
import { getProviders, signIn, getCsrfToken } from "next-auth/react";

import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import { Button } from "@calcom/ui";

import PageWrapper from "@components/PageWrapper";

type Provider = {
  name: string;
  id: string;
};

function signin({ providers }: { providers: Provider[] }) {
  return (
    <div className="center mt-10 justify-between space-y-5 text-center align-baseline">
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <Button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</Button>
          </div>
        );
      })}
    </div>
  );
}

signin.PageWrapper = PageWrapper;

export default signin;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;

  const session = await getServerSession({ req });
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  return {
    props: {
      csrfToken,
      providers,
    },
  };
}
