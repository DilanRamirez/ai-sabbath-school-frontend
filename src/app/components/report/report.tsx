import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Box,
  Button,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import { ReportFilters, ReportFiltersValue } from "./report-filters";
import ReportPreview from "./report-preview";
import { useReportData } from "@/app/hooks/use-report";

// Mock API functions:
async function generateReportPreview(
  filters: ReportFiltersValue
): Promise<string> {
  // This would call your backend to assemble HTML or PDF preview URL
  // For now, return a placeholder URL or HTML
  return Promise.resolve(
    "/api/report/preview?" +
      new URLSearchParams({
        quarterId: filters.quarterId,
        days: filters.days.join(","),
      })
  );
}

async function downloadReportPDF(filters: ReportFiltersValue): Promise<Blob> {
  const response = await fetch("/api/report/pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
  });
  if (!response.ok) {
    throw new Error("Failed to download report");
  }
  return await response.blob();
}

export default function ReportPage() {
  const { quarters, lessons, loading: dataLoading } = useReportData();

  const [filters, setFilters] = useState<ReportFiltersValue>({
    quarterId: "",
    days: [],
    includeNotes: true,
  });
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Regenerate preview whenever filters change
  useEffect(() => {
    if (!filters.quarterId) return;
    setLoadingPreview(true);
    setError(null);

    generateReportPreview(filters)
      .then((url) => {
        setPreviewUrl(url);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoadingPreview(false);
      });
  }, [filters]);

  // Download handler
  const handleDownload = useCallback(async () => {
    if (!filters.quarterId) return;
    setDownloading(true);
    setError(null);
    try {
      const blob = await downloadReportPDF(filters);
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `Reporte_${filters.quarterId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (err: any) {
      setError(err.message || "Error al descargar reporte");
    } finally {
      setDownloading(false);
    }
  }, [filters]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Generador de Reportes
      </Typography>

      {dataLoading && <CircularProgress />}

      {/* Filters */}
      <ReportFilters
        quarters={quarters}
        lessons={lessons}
        onChange={() => null}
      />

      {/* Preview or loading/error */}
      <Box
        sx={{
          position: "relative",
          mb: 2,
          minHeight: 300,
          border: "1px solid #ddd",
        }}
      >
        {loadingPreview ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ p: 2 }}>
            {error}
          </Typography>
        ) : previewUrl ? (
          <ReportPreview url={previewUrl} />
        ) : (
          <Typography sx={{ p: 2 }}>
            Selecciona los filtros para ver vista previa del reporte
          </Typography>
        )}
      </Box>

      {/* Download button */}
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button
          variant="outlined"
          onClick={() => setFilters({ ...filters, quarterId: "" })}
          disabled={loadingPreview}
        >
          Resetear
        </Button>
        <Button
          variant="contained"
          onClick={handleDownload}
          disabled={downloading || !filters.quarterId}
        >
          {downloading ? "Descargando..." : "Descargar PDF"}
        </Button>
      </Stack>
    </Container>
  );
}
