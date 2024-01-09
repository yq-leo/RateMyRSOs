import { getProviders } from "next-auth/react";
import styles from "./login-form.module.css";

import OAuthButtonList from "./oauth-button-list";
import EmailForm from "./email-form";

export default async function LoginForm() {
  const providers = await getProviders();
  const oauthProviders = Object.values(providers ?? []).filter(
    (providers) => providers.type === "oauth"
  );

  return (
    <div className={styles.main}>
      <OAuthButtonList providers={oauthProviders} />
      <div className={styles.divider}>
        <span>Or login with email</span>
      </div>
      <EmailForm />
    </div>
  );
}
