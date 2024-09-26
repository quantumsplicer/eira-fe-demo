import { useState, ChangeEvent } from "react";
import { Button, Avatar, Stack, useMediaQuery, Box } from "@mui/material";

const ProfilePhotoUpload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const isPhoneScreen = useMediaQuery("(max-width:600px)");

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Optional chaining in case no file is selected
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {!isPhoneScreen ? (
        <Stack
          sx={{
            justifyContent: "center", // Centers vertically
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Profile Photo"
            src={image || undefined}
            sx={{ width: 150, height: 150, marginBottom: 1 }}
          />
        </Stack>
      ) : (
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            pt: 8,
          }}
        >
          <Stack
            sx={{
              justifyContent: "center", // Centers vertically
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Profile Photo"
              src={image || undefined}
              sx={{ width: 150, height: 150, marginBottom: 1 }}
            />
          </Stack>
        </Box>
      )}
    </>
  );
};

export default ProfilePhotoUpload;
