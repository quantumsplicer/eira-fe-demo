import { useState, ChangeEvent } from "react";
import { Button, Avatar, Stack } from "@mui/material";

const ProfilePhotoUpload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Optional chaining in case no file is selected
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
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
  );
};

export default ProfilePhotoUpload;
