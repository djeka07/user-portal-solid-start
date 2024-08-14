interface ImportMetaEnv {
  readonly VITE_USER_API: string;
  readonly VITE_CHAT_API: string;
  readonly VITE_SOCKET: string;
  readonly VITE_SOCKET_PATH: string;
  readonly VITE_APPLICATION_ID: string;
  readonly VITE_AUTH_REFRESH_ACTIVE: string;
  readonly VITE_AUTH_CHECK_INTERVAL_MS: string;
  readonly VITE_AUTH_SUBSTRACT_MS: string;
  readonly VITE_SESSION_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
