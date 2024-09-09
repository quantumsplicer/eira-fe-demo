import * as React from "react";
import Box from "@mui/material/Box";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import LinkIcon from "@mui/icons-material/LinkOutlined";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopyOutlined";
import Button from "@mui/material/Button";
import SharePaymentLinkImage from "../../../assets/images/svg/SharePaymentLink.svg";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const SharePaymentLinkCard: React.FC = () => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        width: "100%",
        backgroundColor: "white",
        boxShadow: 6,
        alignContent: "center",
      }}
    >
      <Stack
        sx={{ borderWidth: "2" }}
        direction="row"
        display="flex"
        justifyContent="space-between"
      >
        <Box p={4}>
          <Stack
            spacing={3}
            pt={2}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack>
              <Typography fontSize={22} fontWeight={590} align="center">
                Share your eira.club link to collect payment directly
              </Typography>
            </Stack>

            <TextField size="small" sx={{ width: "60%" }}></TextField>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#507FFD",
                borderRadius: 3,
                fontSize: 13,
                fontWeight: "bold",
                height: 45,
                width: "40%",
                paddingLeft: 3,
                paddingRight: 3,
                textTransform: "none",
              }}
            >
              <Stack direction="row" spacing={2} pt={1} pb={1}>
                <ShareOutlinedIcon />
                <Typography>Share Link</Typography>
              </Stack>
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{ width: "45%", backgroundColor: "#EBF1FF", borderRadius: 2 }}
          p={0}
        >
          <img
            src={SharePaymentLinkImage}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      </Stack>
    </Box>
  );
};
export default SharePaymentLinkCard;
