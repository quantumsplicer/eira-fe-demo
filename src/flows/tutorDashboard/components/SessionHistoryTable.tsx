import React, { useMemo, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { darken, lighten, useTheme } from "@mui/material";
import CreateSessionLinkDialog from "../dialogs/CreateSessionLinkDialog";

const lightTheme = createTheme({ palette: { mode: "light" } });
interface Session {
  title: string;
  studentPhoneNumber: string;
  timeOfSession: string;
  repeat: string;
  amount: number;
  status: string;
}
const data: Session[] = [
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Cancelled",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Scheduled",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Cancelled",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Scheduled",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Completed",
  },
  {
    title: "123",
    studentPhoneNumber: "+919997945005",
    timeOfSession: "today",
    repeat: "today",
    amount: 4000,
    status: "Completed",
  },
];
const SessionHistoryTable: React.FC = () => {
  const [createSessionLinkDialog, setCreateSessionLinkDialog] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const handleCloseSessionLinkDialog = () => {
    setCreateSessionLinkDialog(false);
  };
  const handleOpenSessionLinkDialog = () => {
    setCreateSessionLinkDialog(true);
  };
  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };
  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };
  const theme = useTheme();
  const baseBackgroundColor =
    theme.palette.mode === "dark"
      ? "rgba(100, 100, 100 , 1)"
      : "rgba(250, 250, 250, 1)";
  const columns = useMemo<MRT_ColumnDef<Session>[]>(
    () => [
      {
        accessorKey: "title", //simple recommended way to define a column
        header: "Title",
        // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "studentPhoneNumber", //simple recommended way to define a column
        header: "Student's Phone Number",
        //muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "timeOfSession", //simple recommended way to define a column
        header: "Time of Session",
        // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "repeat", //simple recommended way to define a column
        header: "Repeat",
        // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "amount", //simple recommended way to define a column
        header: "Amount",
        // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "status", //simple recommended way to define a column
        header: "Status",
        // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
        enableHiding: false, //disable a feature for this column
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              backgroundColor:
                cell.getValue<string>() === "Cancelled"
                  ? "#FBE7E8"
                  : cell.getValue<string>() === "Scheduled"
                  ? "#FEF2E5"
                  : "#EBF9F1",
              borderRadius: "1rem",
              color:
                cell.getValue<string>() === "Cancelled"
                  ? "#A30D11"
                  : cell.getValue<string>() === "Scheduled"
                  ? "#CD6200"
                  : "#3BB900",
              p: "0.5rem",
              width: "fullwidth",
            })}
          >
            {cell.getValue<string>()}
          </Box>
        ),
      },
    ],
    []
  );
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
    <React.Fragment>
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
                  onClick={handleOpenSessionLinkDialog}
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
      <CreateSessionLinkDialog
        openForm={createSessionLinkDialog}
        closeForm={handleCloseSessionLinkDialog}
        openConfirmation={openConfirmation}
        closeConfirmation={handleCloseConfirmation}
        openConfirmationPage={handleOpenConfirmation}
      />
    </React.Fragment>
  );
};

export default SessionHistoryTable;
