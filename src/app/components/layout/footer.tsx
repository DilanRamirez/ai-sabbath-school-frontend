"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box component="footer" textAlign="center" py={2} color="text.secondary">
      <Typography variant="body2">© Sabbath+ by Dilan Ramirez</Typography>
    </Box>
  );
};

export default Footer;
