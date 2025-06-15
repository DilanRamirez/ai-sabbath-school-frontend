"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  useScrollTrigger,
} from "@mui/material";
import { useState, useEffect } from "react";

const sections = [
  { id: "inicio", label: "Inicio" },
  { id: "acerca", label: "Acerca" },
  { id: "funciones", label: "Funciones" },
  { id: "confianza", label: "Confianza" },
];

export default function WelcomeHeader() {
  const [activeSection, setActiveSection] = useState("inicio");
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 500;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        borderRadius: 0,
        bgcolor: trigger
          ? "rgba(44, 62, 80, 0.95)"
          : "linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #2C3E50 100%)",
        backdropFilter: "blur(10px)",
        boxShadow: trigger ? 4 : 2,
        transition: "all 0.3s ease",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            justifyContent: "center",
            py: { xs: 1, md: 0 },
            minHeight: { xs: "56px", md: "64px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, sm: 2, md: 4 },
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
              width: "100%",
              justifyContent: { xs: "flex-start", md: "center" },
              px: { xs: 1, sm: 0 },
            }}
          >
            {sections.map((section) => (
              <Button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                sx={{
                  color:
                    activeSection === section.id
                      ? "white"
                      : "rgba(255,255,255,0.7)",
                  fontWeight: activeSection === section.id ? 600 : 400,
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  minWidth: "auto",
                  px: { xs: 1.5, md: 2 },
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  position: "relative",
                  "&:hover": {
                    color: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: activeSection === section.id ? "80%" : "0%",
                    height: "2px",
                    bgcolor: "white",
                    transition: "width 0.3s ease",
                  },
                }}
              >
                {section.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
