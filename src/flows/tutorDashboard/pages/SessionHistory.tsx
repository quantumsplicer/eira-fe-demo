import React from "react";
import { Stack } from "@mui/material";

import SessionHistoryTable from "../components/SessionHistoryTable";

const SessionHistory: React.FC = () => {
  return (
    <>
      <Stack spacing={5}>
        <h1>Session History</h1>
        <SessionHistoryTable />
      </Stack>
    </>
  );
};

export default SessionHistory;
