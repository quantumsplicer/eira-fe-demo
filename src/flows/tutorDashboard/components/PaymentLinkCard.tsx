import * as React from "react";
import Box from "@mui/material/Box";
import { Divider, Stack, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import LinkIcon from "@mui/icons-material/LinkOutlined";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopyOutlined";
const amount = 20000;
const PaymentLinkCard: React.FC = () => {
  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 2,
        width: 480,
        backgroundColor: "white",
        boxShadow: 6,
        alignContent: "center",
      }}
    >
      <Stack spacing={3}>
        <Stack direction="row" spacing={2}>
          <InfoIcon />
          <Typography fontWeight="bold">
            Share your payment link to receive payments
          </Typography>
        </Stack>
        <Stack direction="row">
          <Box
            sx={{
              width: 480,
              backgroundColor: "#EBF1FF",
              p: 1,
              borderRadius: 2,
            }}
            justifyContent="center"
          >
            <Stack direction="row">
              <LinkIcon />
              <Divider orientation="vertical" variant="middle" flexItem />
              <Link sx={{ pl: 2 }}>payAnagh.com</Link>
            </Stack>
          </Box>
          <IconButton aria-label="copy to clipboard">
            <ContentCopyIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};
export default PaymentLinkCard;
