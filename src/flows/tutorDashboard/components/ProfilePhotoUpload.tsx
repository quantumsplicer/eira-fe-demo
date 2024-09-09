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
        sx={{ width: 100, height: 100, marginBottom: 1 }}
      />
      <Button
        variant="contained"
        component="label"
        sx={{
          backgroundColor: "#507FFD",
          borderRadius: 3,
          fontSize: 9,
          fontWeight: "bold",
          height: 23,
          textTransform: "none",
        }}
      >
        Upload Photo
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
      </Button>
    </Stack>
  );
};

export default ProfilePhotoUpload;
