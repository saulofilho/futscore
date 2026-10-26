/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_CLIENT_ID?: string;
  readonly VITE_ADSENSE_SLOT_TOP_BANNER?: string;
  readonly VITE_ADSENSE_SLOT_FEED?: string;
  readonly VITE_ADSENSE_SLOT_MODAL?: string;
  readonly VITE_ADSENSE_TEST_MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
