import React from "react";
import { Paper, Box, Typography, Card, CardContent } from "@mui/material";
import { Public, Group, Campaign } from "@mui/icons-material";
import { MenuBook } from "@mui/icons-material";

interface ResourcesPanelProps {
  missionMoment: string | undefined;
  communityActivity: string | undefined;
  callToAction: string | undefined;
  glossary: Record<string, string> | undefined;
}

export default function ResourcesPanel({
  missionMoment,
  communityActivity,
  callToAction,
  glossary,
}: ResourcesPanelProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Glossary */}
      {glossary && (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <MenuBook sx={{ color: "primary.main" }} />
            <Typography
              variant="h6"
              sx={{ color: "primary.main", fontWeight: 600 }}
            >
              Glosario
            </Typography>
          </Box>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            {Object.entries(glossary).map(([term, definition]) => (
              <Typography
                component="li"
                variant="body2"
                sx={{ mb: 1, color: "text.secondary" }}
                key={term}
              >
                <strong>{term}:</strong> {definition}
              </Typography>
            ))}
          </Box>
        </Paper>
      )}

      {/* Mission Moment */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Public sx={{ color: "primary.main" }} />
          <Typography
            variant="h6"
            sx={{ color: "primary.main", fontWeight: 600 }}
          >
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
          <Group sx={{ color: "primary.main" }} />
          <Typography
            variant="h6"
            sx={{ color: "primary.main", fontWeight: 600 }}
          >
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
          <Campaign sx={{ color: "primary.main" }} />
          <Typography
            variant="h6"
            sx={{ color: "primary.main", fontWeight: 600 }}
          >
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
