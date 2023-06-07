/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_PATH_API: string;
  readonly REACT_APP_API_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
