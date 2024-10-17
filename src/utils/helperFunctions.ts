export const isPhoneNumberValid = (phone: string): boolean => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
};

export const isPanValid = (pan: string): boolean => {
  const regex = /^[A-Z]{3}P[A-Z][0-9]{4}[A-Z]{1}$/;
  return regex.test(pan);
};
