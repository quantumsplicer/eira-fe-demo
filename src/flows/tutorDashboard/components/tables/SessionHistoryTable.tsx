import React, { useMemo, useState } from "react";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import {
  createMRTColumnHelper,
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { darken, lighten, useTheme } from "@mui/material";
import StatusTag from "../StatusTag";
import SessionLinkDialog from "../../dialogs/SessionLinkDialog";
import { Virtuoso } from "react-virtuoso";

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
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
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
          sx={
            !isPhoneScreen
              ? { boxShadow: 8, backgroundColor: "white", borderRadius: 2 }
              : {
                  backgroundColor: "white",
                }
          }
        >
          <Stack spacing={2}>
            <Stack direction="row">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: 2,
                }}
              >
                <Typography
                  sx={{ fontSize: 17, fontWeight: "bold", alignSelf: "center" }}
                >
                  Session History
                </Typography>
                <Button
                  variant="contained"
                  onClick={openDialog}
                  sx={
                    !isPhoneScreen
                      ? {
                          backgroundColor: "#507FFD",
                          borderRadius: 3,
                          fontSize: 13,
                          fontWeight: "bold",
                          height: 45,
                          paddingLeft: 3,
                          paddingRight: 3,
                          textTransform: "none",
                        }
                      : {
                          backgroundColor: "#507FFD",
                          borderRadius: 5,
                          fontSize: 13,
                          fontWeight: "bold",
                          height: 45,
                          paddingLeft: 3,
                          paddingRight: 3,
                          textTransform: "none",
                        }
                  }
                >
                  Create a Session Link
                </Button>
              </Box>
            </Stack>
            {!isPhoneScreen ? (
              <MaterialReactTable table={table} />
            ) : (
              <></>
              // <Virtuoso
              //   style={{ height: 710 }}
              //   data={data}
              //   itemContent={(_, user) => (
              //     <PaymentHistoryTableMobile
              //       name={user.title}
              //       phoneNumber={user.studentPhoneNumber}
              //       status={user.status}
              //       amount={3}
              //     />
              //   )}
              // />
            )}
          </Stack>
        </Box>
      </ThemeProvider>
      {/* <SessionLinkDialog
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      /> */}
      {/* <ConfirmationDialog
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
        heading={heading}
        subHeading={subHeading}
      /> */}
    </>
  );
};

export default SessionHistoryTable;
