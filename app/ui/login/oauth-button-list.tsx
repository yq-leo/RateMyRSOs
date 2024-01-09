"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { ClientSafeProvider } from "next-auth/react";
import styles from "./oauth-button-list.module.css";

export default function OAuthButtonList({
  providers,
}: {
  providers: ClientSafeProvider[];
}) {
  return (
    <div className={styles.main}>
      {providers.map(
        (provider) =>
          provider.id !== "credentials" && (
            <div key={provider.name} className={styles.oauthWrapper}>
              <Image
                className={styles.oauthIcon}
                src={`/${provider.id}-icon.svg`}
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
          )
      )}
    </div>
  );
}
