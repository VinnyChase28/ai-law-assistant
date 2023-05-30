// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface ImportMetaEnv {
      VITE_OIDC_ISSUER: string;
      VITE_OIDC_CLIENT_ID: string;
      VITE_OIDC_CLIENT_SECRET: string;
      VITE_OIDC_REDIRECT_URI: string;
      VITE_OIDC_POST_LOGOUT_REDIRECT_URI: string;
      VITE_OIDC_CLIENT_SCOPE: string;
      VITE_OIDC_TOKEN_REFRESH_MAX_RETRIES: number;
      VITE_REFRESH_TOKEN_ENDPOINT: string;
      VITE_REFRESH_PAGE_ON_SESSION_TIMEOUT: boolean;
    }

    interface PageData {
      session: import("sveltekit-oidc").Session | null;
    }
  }
}

export {};
