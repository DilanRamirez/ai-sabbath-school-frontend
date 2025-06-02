import { Box, Container, Skeleton } from "@mui/material";
import React from "react";

const LessonDaySkeleton = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Skeleton variant="text" width="40%" height={40} />
      <Skeleton variant="text" width="30%" height={24} sx={{ mb: 3 }} />
      {[...Array(6)].map((_, i) => (
        <Skeleton
          key={i}
          variant="rectangular"
          width="100%"
          height={80}
          sx={{ mb: 2 }}
        />
      ))}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Skeleton variant="rectangular" width={120} height={36} />
        <Skeleton variant="rectangular" width={180} height={36} />
      </Box>
    </Container>
  );
};

export default LessonDaySkeleton;
