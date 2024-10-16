import React from "react";
import { Stack, useMediaQuery } from "@mui/material";

import SessionHistoryTable from "../components/tables/SessionHistoryTable";

const SessionHistory: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Stack spacing={5} pt={!isPhoneScreen ? 0 : 4}>
        {!isPhoneScreen ? <h1>Session History</h1> : <></>}
        <SessionHistoryTable />
      </Stack>
    </>
  );
};

export default SessionHistory;
