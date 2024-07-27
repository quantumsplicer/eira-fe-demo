import { Box, Stack } from "@mui/material";
import EiraBack from "../assets/images/png/eira-back-1.png";
import MobilePaymentsSVG from "../assets/images/svg/MobilePayments.svg";

export const EiraBack1 = () => {
  return (
    <Box>
      <Stack sx={{width: "100%"}} alignItems={"flex-end"}>
        <img
          src={MobilePaymentsSVG}
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            bottom: 50,
            marginRight: 50,
          }}
        />
      </Stack>
      <img src={EiraBack} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
};
