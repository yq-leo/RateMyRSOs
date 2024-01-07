"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders } from "next-auth/react";
import styles from "./oauth-button-list.module.css";

export default function OAuthButtonList({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={styles.main}>
      {Object.values(providers ?? []).map((provider) => (
        <div key={provider.name} className={styles.oauthWrapper}>
          <Image
            className={styles.oauthIcon}
            src={`/${provider.name}-icon.svg`}
            alt={`${provider.name} logo`}
            width={30}
            height={30}
          />
          <button
            className={styles.oauthBtn}
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
