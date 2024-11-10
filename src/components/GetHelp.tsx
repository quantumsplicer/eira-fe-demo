import React from "react";
import { Box, Typography, Link } from "@mui/material";

export const WHATSAPP_LINK = "https://wa.link/fipmfa";

const GetHelp = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minWidth: "320px",
        maxWidth: "400px",
        mb: 4,
        padding: 2,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="body1" fontSize={14} color="textPrimary">
        Need help?{" "}
      </Typography>
      <Typography variant="body1" fontSize={14} color="primary">
        <Link
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textDecoration: "none", fontWeight: "bold" }}
        >
          Contact Us on WhatsApp
        </Link>
      </Typography>
    </Box>
  );
};

export default GetHelp;
