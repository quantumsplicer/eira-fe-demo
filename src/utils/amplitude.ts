import * as amplitude from "@amplitude/analytics-browser";
import { environment } from "../APIs";

export const initializeAmplitude = (options?: object) => {
  const userId = localStorage.getItem("phoneNumber");
  
  if (environment !== "prod") return;

  amplitude.init("59df26eab25f22917c6af7c59838db57", {
    userId: userId ?? "",
    ...options,
  });
};

export const trackEvent = (eventName: string, eventProperties?: object) => {
  const role =
    localStorage.getItem("studentLogin") == "true" ? "student" : "teacher";
  amplitude.track(eventName, { ...eventProperties, role: role });
};
