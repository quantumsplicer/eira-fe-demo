import React, { useMemo, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  createMRTColumnHelper,
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { darken, lighten, useTheme } from "@mui/material";
import StatusTag from "./StatusTag";
import SessionLinkDialog from "../dialogs/SessionLinkDialog";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";

const lightTheme = createTheme({ palette: { mode: "light" } });
interface Session {
  title: string;
  studentPhoneNumber: string;
  timeOfSession: string;
  repeat: string;
  status: string;
}
const data: Session[] = [
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Cancelled",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Scheduled",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Cancelled",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Scheduled",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    status: "Completed",
  },
];

const SessionHistoryTable: React.FC = () => {
  const [activeDialog, setActiveDialog] = useState<string>("None");
  const heading = "Session Successfully created";
  const subHeading =
    "link for your session has been successfully sent to your attendees via email";
  const openDialog = () => {
    setActiveDialog("SessionLinkDialog");
  };
  const columnHelper = createMRTColumnHelper<Session>();
  const theme = useTheme();
  const baseBackgroundColor =
    theme.palette.mode === "dark"
      ? "rgba(100, 100, 100 , 1)"
      : "rgba(250, 250, 250, 1)";

  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      enableHiding: false,
    }),
    columnHelper.accessor("studentPhoneNumber", {
      header: "Student's Phone Number",
      enableHiding: false,
    }),
    columnHelper.accessor("timeOfSession", {
      header: "Time of Session",
      enableHiding: false,
    }),
    columnHelper.accessor("repeat", {
      header: "Repeat",
      enableHiding: false,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      enableHiding: false,
      Cell: ({ cell }) => <StatusTag cellValue={cell.getValue<string>()} />,
    }),
  ];
  const table = useMaterialReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableToolbarInternalActions: false,
    enableTopToolbar: false,
    enableColumnActions: false,
    enableSorting: false,
    enableRowVirtualization: true,
    enableColumnVirtualization: true,
    initialState: {
      density: "spacious",
    },
    defaultColumn: {
      //allow columns to get larger than default

      size: 40, //make columns wider by default
    },
    muiTableBodyProps: {
      sx: (theme) => ({
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: darken(baseBackgroundColor, 0.1),
          },
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]):hover > td':
          {
            backgroundColor: darken(baseBackgroundColor, 0.2),
          },
        '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: lighten(baseBackgroundColor, 0.1),
          },
        '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]):hover > td':
          {
            backgroundColor: darken(baseBackgroundColor, 0.2),
          },
      }),
    },
    muiTableHeadRowProps: () => ({
      //conditionally style pinned columns
      sx: {
        backgroundColor: "#c0c4c4",
      },
    }),
  });
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Box
          height="fullheight"
          width="fullwidth"
          my={4}
          gap={4}
          p={2}
          sx={{ boxShadow: 8, backgroundColor: "white", borderRadius: 2 }}
        >
          <Stack spacing={2}>
            <Stack direction="row">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between", // Distribute space between children
                  width: "100%", // Ensure the Box takes full width of its parent
                  padding: 2, // Optional: Adjust padding as needed
                }}
              >
                <Typography sx={{ fontSize: 17, fontWeight: "bold" }}>
                  Session History
                </Typography>
                <Button
                  variant="contained"
                  onClick={openDialog}
                  sx={{
                    backgroundColor: "#507FFD",
                    borderRadius: 3,
                    fontSize: 13,
                    fontWeight: "bold",
                    height: 45,
                    paddingLeft: 3,
                    paddingRight: 3,
                  }}
                >
                  Create a Session Link
                </Button>
              </Box>
            </Stack>
            <MaterialReactTable table={table} />
          </Stack>
        </Box>
      </ThemeProvider>
      <SessionLinkDialog
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      />
      <ConfirmationDialog
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
        heading={heading}
        subHeading={subHeading}
      />
    </>
  );
};

export default SessionHistoryTable;
