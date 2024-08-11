import { Box, Stack, Typography } from "@mui/material";
import EiraBack from "../assets/images/png/eira-back-1.png";
import TutorLoginSVG from "../assets/images/svg/TutorLogin.svg";
import listBullet from "../assets/images/png/list_bullet.png";

export const EiraBack2 = () => {
    return (
        <Box>
            <Stack sx={{ width: "100%" }} alignItems={"flex-end"}>
                <img
                    src={TutorLoginSVG}
                    style={{
                        position: "absolute",
                        width: "30%",
                        height: "30%",
                        bottom: 140,
                        marginRight: 20,
                    }}
                />
            </Stack>
            <Stack
                direction="column"
                position={"absolute"}
                color="#fff"
                top={100}
                right={100}
                width="40vw"
            >
                <Box>
                    <Typography fontSize={30} fontWeight={"bold"} mb={5} ml={4}>
                        Why choose Eira for accepting your tuition payments?
                    </Typography>
                    <ul style={{ listStyle: "none" }}>
                        <li style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                            >
                                <img style={{ width: "15px", height: "15px", marginRight: "10px" }} src={listBullet} />
                                Offer no-cose EMI to your students
                            </Stack>
                        </li>
                        <li style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                            >
                                <img style={{ width: "15px", height: "15px", marginRight: "10px" }} src={listBullet} />
                                Safe, Secure and Hassle-free payment flow and timely settlements
                            </Stack>
                        </li>
                        <li style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                            >
                                <img style={{ width: "15px", height: "15px", marginRight: "10px" }} src={listBullet} />
                                Accept credit card payments @ 1% only
                            </Stack>
                        </li>
                    </ul>
                </Box>
            </Stack>

            <img src={EiraBack} style={{ width: "100%", height: "100%" }} />
        </Box>
    );
};