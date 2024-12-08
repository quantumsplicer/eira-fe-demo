import * as amplitude from "@amplitude/analytics-browser";

export const initializeAmplitude = (userId: string, options?: object) => {
  amplitude.init("59df26eab25f22917c6af7c59838db57", userId, options);
};

export const trackEvent = (eventName: string, eventProperties?: object) => {
  const role = localStorage.getItem("studentLogin") == 'true' ? "student" : "teacher";
  amplitude.track(eventName, {...eventProperties, role: role});
};
