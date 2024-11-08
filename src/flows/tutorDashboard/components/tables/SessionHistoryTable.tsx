import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
import SendSessionLinkFlow from "../flows/SendSessionLinkFlow";
import { SessionDetails } from "../../../../APIs/definitions/session";
import Amount from "../../../../components/Amount";
import tickMark from "../../../../assets/images/png/tick-mark.png";
import exclamationMark from "../../../../assets/images/svg/ExclamationMark.svg";
const lightTheme = createTheme({ palette: { mode: "light" } });

// const data: Session[] = [
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Cancelled",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Scheduled",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Completed",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Cancelled",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Scheduled",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Completed",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Completed",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Completed",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Completed",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Completed",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Completed",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Completed",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Completed",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Completed",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Completed",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Completed",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Completed",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Completed",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Completed",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Completed",
//   },
//   {
//     title: "123",
//     studentPhoneNumber: "+919997945005",
//     timeOfSession: "today",
//     repeat: "today",
//     status: "Completed",
//   },
// ];

interface SessionMobileCellProps {
  session: SessionDetails;
  onClick: () => void;
}
const SessionMobileCell = ({ session, onClick }: SessionMobileCellProps) => {
  return (
    <Button
      sx={{
        border: "0.2px solid",
        borderRadius: 4,
        borderColor: "#C3C3C3",
        p: 2,
        marginBottom: 2,
        width: "100%",
        textTransform: "none",
        color: "inherit",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      }}
      onClick={onClick}
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              height: "95%",
              alignSelf: "center",
              borderWidth: 2.5,
              borderColor: "#2AC426",
            }}
          />
          <Stack>
            <Typography fontSize={18}>{session.title}</Typography>
            <Typography fontSize={14} color="#C3C3C3">
              {session.student_id}
            </Typography>
          </Stack>
        </Stack>
        <Stack pr={2}>
          <Typography fontSize={19} fontWeight={500} textAlign="right">
            ₹ {0}
          </Typography>
          <Typography fontSize={14} color="#C3C3C3" textAlign="right">
            {session.starttime}
          </Typography>
        </Stack>
      </Stack>
    </Button>
  );
};

interface SessionHistoryTableProps {
  data: any[];
}

const SessionHistoryTable: React.FC<SessionHistoryTableProps> = ({ data }) => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const [sessionLinkFlowActive, setSessionLinkFlowActive] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDrawerSessionDetails, setActiveDrawerSessionDetails] =
    useState<SessionDetails | null>(null);

  const handleOnClick = (session: SessionDetails) => {
    return () => {
      setIsDrawerOpen(true);
      setActiveDrawerSessionDetails(session);
    };
  };
  const handleOnClickCreateSessionLink = () => {
    setSessionLinkFlowActive(true);
  };

  const columnHelper = createMRTColumnHelper<SessionDetails>();
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
    columnHelper.accessor("student_id", {
      header: "Student's Phone Number",
      enableHiding: false,
    }),
    columnHelper.accessor("starttime", {
      header: "Time of Session",
      enableHiding: false,
    }),
    columnHelper.accessor("endtime", {
      header: "End Time",
      enableHiding: false,
    }),
  ];
  const table = useMaterialReactTable({
    columns,
    data: data || [],
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
                  height: "95vh",
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
                  onClick={handleOnClickCreateSessionLink}
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
            ) : data && data.length > 0 ? (
              <>
                <Virtuoso
                  style={{ height: 710 }}
                  data={data}
                  itemContent={(_, session) => (
                    <SessionMobileCell
                      session={session}
                      onClick={handleOnClick(session)}
                    />
                  )}
                />
                <Drawer
                  open={isDrawerOpen}
                  onClose={() => setIsDrawerOpen(false)}
                  sx={{
                    width: "100%",
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                      padding: 5,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      width: "100%",
                      boxSizing: "border-box",
                    },
                  }}
                  anchor="bottom"
                >
                  <Box sx={{ position: "absolute", top: 16, right: 16 }}>
                    <IconButton onClick={() => setIsDrawerOpen(false)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <Box height="100%" width="100%">
                    <Stack height="100%" width="100%">
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        alignSelf={"center"}
                      >
                        <Typography
                          variant="h5"
                          sx={{ fontSize: 20 }}
                          color={"#969696"}
                          mr={1}
                          alignSelf={"center"}
                        >
                          Session Details
                        </Typography>
                        <Amount
                          amount={Number(activeDrawerSessionDetails?.amount)}
                          fontSize={20}
                        />
                      </Stack>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        alignSelf={"center"}
                      >
                        <Typography
                          variant="h5"
                          sx={{ fontSize: 20 }}
                          color={"#969696"}
                          mr={1}
                        >
                          sent to
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ fontSize: 20 }}
                          mr={1}
                          fontWeight={"bold"}
                        >
                          {activeDrawerSessionDetails?.student_id}
                        </Typography>
                      </Stack>
                      {activeDrawerSessionDetails?.amount === 0 ? (
                        <img
                          src={tickMark}
                          style={{
                            marginTop: "30px",
                            width: 70,
                            alignSelf: "center",
                          }}
                        />
                      ) : (
                        <img
                          src={exclamationMark}
                          style={{
                            marginTop: "30px",
                            width: 70,
                            alignSelf: "center",
                          }}
                        />
                      )}
                      {activeDrawerSessionDetails?.amount === 0 ? (
                        <Box mt={3} alignSelf={"center"}>
                          <Typography
                            color={"#7e7e7e"}
                            component={"span"}
                            fontWeight={"bold"}
                          >
                            {`expires on `}
                          </Typography>
                          <Typography component={"span"} fontWeight={"bold"}>
                            {activeDrawerSessionDetails.endtime}
                          </Typography>
                          <Typography
                            component={"span"}
                            color={"#7e7e7e"}
                            fontWeight={"bold"}
                          >
                            {` at`}
                          </Typography>
                          <Typography component={"span"} fontWeight={"bold"}>
                            {activeDrawerSessionDetails.endtime}
                          </Typography>
                        </Box>
                      ) : (
                        <Box mt={3} alignSelf={"center"}>
                          <Typography color={"#7e7e7e"}>
                            Payment link expired
                          </Typography>
                        </Box>
                      )}

                      <Box
                        width="100%"
                        minWidth="320px"
                        maxWidth="400px"
                        mt={5}
                      >
                        <Stack>
                          <Stack
                            justifyContent={"space-between"}
                            direction={"row"}
                            mb={2}
                          >
                            <Typography width={"50%"} color={"#7e7e7e"}>
                              Date of Creation
                            </Typography>
                            <Stack alignItems={"flex-end"}>
                              <Typography>
                                {activeDrawerSessionDetails?.starttime}
                              </Typography>
                            </Stack>
                          </Stack>
                          <Stack
                            justifyContent={"space-between"}
                            direction={"row"}
                            mb={2}
                          >
                            <Typography width={"50%"} color={"#7e7e7e"}>
                              Expires On
                            </Typography>
                            <Stack alignItems={"flex-end"}>
                              <Typography>
                                {activeDrawerSessionDetails?.endtime}
                              </Typography>
                            </Stack>
                          </Stack>
                          <Stack
                            justifyContent={"space-between"}
                            direction={"row"}
                            mb={2}
                          >
                            <Typography width={"50%"} color={"#7e7e7e"}>
                              Payer
                            </Typography>
                            <Stack alignItems={"flex-end"}>
                              <Typography>
                                {activeDrawerSessionDetails?.teacher_id}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                </Drawer>
              </>
            ) : (
              <>
                {" "}
                <Box
                  sx={{
                    minHeight: "30vh",
                    height: "fullheight",
                    backgroundColor: "#ebedf0",
                    borderRadius: 4,
                  }}
                >
                  <Stack
                    justifyContent="space-evenly"
                    alignItems="center"
                    sx={{
                      height: "30vh",
                    }}
                  >
                    <Typography
                      fontSize={"1.1rem"}
                      color="#b8bbbf"
                      textAlign="center"
                    >
                      You've not created any sessions yet!
                    </Typography>
                    <Stack direction="column" spacing={2}>
                      <Typography
                        fontSize={"0.7rem"}
                        color="#b8bbbf"
                        sx={{ fontStyle: "italic" }}
                        textAlign="center"
                      >
                        Create a session now to start and invite your students!
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={handleOnClickCreateSessionLink}
                        sx={{
                          backgroundColor: "#507FFD",
                          borderRadius: 2,
                          fontSize: "0.7rem",
                          width: "12rem",
                          fontWeight: "bold",
                          height: 40,
                          paddingLeft: 1,
                          paddingRight: 1,
                          textTransform: "none",
                          alignSelf: "center",
                        }}
                      >
                        Create a Session Link
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </>
            )}
          </Stack>
        </Box>
        {sessionLinkFlowActive && (
          <SendSessionLinkFlow
            isActive={sessionLinkFlowActive}
            onClose={() => setSessionLinkFlowActive(false)}
          />
        )}
      </ThemeProvider>
    </>
  );
};

export default SessionHistoryTable;
