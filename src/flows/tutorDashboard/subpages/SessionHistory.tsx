import React from "react";
import { Stack, useMediaQuery } from "@mui/material";

import SessionHistoryTable from "../components/tables/SessionHistoryTable";
import { useGetSessionListQuery } from "../../../APIs/definitions/session";

const SessionHistory: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const { data, isLoading, isSuccess, isError, error } =
    useGetSessionListQuery();
  return (
    <>
      <Stack spacing={5} pt={!isPhoneScreen ? 0 : 4}>
        {!isPhoneScreen ? <h1>Session History</h1> : <></>}
        <SessionHistoryTable data={data || []} />
      </Stack>
    </>
  );
};

export default SessionHistory;
