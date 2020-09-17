import { environment } from "./environments/environment";

export const CONFIG = {
  API_URL: environment.apiUrl,
  APP: {
    ID: "com.hybrid.app",
    NAME: "Hybrid App",
    FULLNAME: "Hybrid App",
    DESCRIPTION: "Modern Hybrid App Boilerplate.",
    VERSION: "1.0.0"
  },
  MESSAGES: {
    REQUEST_ERROR: "Erreur survenue, réessayer plus tard.",
    NETWORK_OFF: "Aucune connexion internet",
    NETWORK_ON: "De nouveau connecté à internet"
  },
  KEYS: {
    AUTH: "app_authentication",
    SETTINGS: "app_settings"
  }
};
