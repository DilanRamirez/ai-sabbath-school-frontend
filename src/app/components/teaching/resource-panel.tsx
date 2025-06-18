import React from "react";
import { Paper, Box, Typography, Card, CardContent } from "@mui/material";
import { Public, Group, Campaign } from "@mui/icons-material";

interface ResourcesPanelProps {
  missionMoment: string | undefined;
  communityActivity: string | undefined;
  callToAction: string | undefined;
}

export default function ResourcesPanel({
  missionMoment,
  communityActivity,
  callToAction,
}: ResourcesPanelProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Mission Moment */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Public sx={{ color: "#F39C12" }} />
          <Typography variant="h6" sx={{ color: "#F39C12", fontWeight: 600 }}>
            Momento Misionero
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", lineHeight: 1.6, mb: 2 }}
        >
          {missionMoment}
        </Typography>
      </Paper>

      {/* Community Activity */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Group sx={{ color: "#27AE60" }} />
          <Typography variant="h6" sx={{ color: "#27AE60", fontWeight: 600 }}>
            Actividad Comunitaria
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", lineHeight: 1.6 }}
        >
          {communityActivity}
        </Typography>
      </Paper>

      {/* Call to Action */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Campaign sx={{ color: "#E74C3C" }} />
          <Typography variant="h6" sx={{ color: "#E74C3C", fontWeight: 600 }}>
            Llamado a la Acción
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", lineHeight: 1.6 }}
        >
          {callToAction}
        </Typography>
      </Paper>

      {/* Teaching Tips */}
      <Card sx={{ bgcolor: "rgba(44, 62, 80, 0.05)" }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
            💡 Consejos de Enseñanza
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            <Typography
              component="li"
              variant="body2"
              sx={{ mb: 1, color: "text.secondary" }}
            >
              Haga preguntas abiertas para fomentar la participación
            </Typography>
            <Typography
              component="li"
              variant="body2"
              sx={{ mb: 1, color: "text.secondary" }}
            >
              Use ilustraciones visuales cuando sea posible
            </Typography>
            <Typography
              component="li"
              variant="body2"
              sx={{ mb: 1, color: "text.secondary" }}
            >
              Permita tiempo para reflexión personal
            </Typography>
            <Typography
              component="li"
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              Conecte la lección con experiencias de vida
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
