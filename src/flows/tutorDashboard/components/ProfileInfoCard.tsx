import * as React from "react";
import Box from "@mui/material/Box";
import { Divider, Stack, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import LinkIcon from "@mui/icons-material/LinkOutlined";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopyOutlined";
import StatusTag from "./StatusTag";
const amount = 20000;
const ProfileInfoCard: React.FC = () => {
  return (
    <Box
      sx={{
        pt: 6,
        borderRadius: 2,
        width: 480,
        height: 340,
        backgroundColor: "white",
        boxShadow: 6,
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        spacing={6}
      >
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
          spacing={0.5}
        >
          <Typography fontSize={20} fontWeight={600}>
            Maanav Seth
          </Typography>
          <Typography>+919997945005</Typography>
        </Stack>
        <Stack sx={{ width: "80%" }} spacing={2}>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography color="#7E7E7E" fontWeight={630}>
              Pan:
            </Typography>
            <Typography color="#3C3C3C" fontWeight={630}>
              EPZPP4919B
            </Typography>
          </Stack>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography color="#7E7E7E" fontWeight={630}>
              Account Verified:
            </Typography>
            <StatusTag cellValue="No" />
          </Stack>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography color="#7E7E7E" fontWeight={630}>
              Account Holder:
            </Typography>
            <Typography color="#3C3C3C" fontWeight={630}>
              Suneel Satpal
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
export default ProfileInfoCard;
