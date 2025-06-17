/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useBibleReference } from "@/app/hooks/use-bible";

interface BibleReferenceModalProps {
  open: boolean;
  reference: string | null;
  onClose: () => void;
}

const BibleReferenceModal: React.FC<BibleReferenceModalProps> = React.memo(
  ({ open, reference, onClose }) => {
    // Call hooks at top level before any conditional returns
    const {
      data: citationData,
      loading: citationLoading,
      error: citationError,
      fetchReference,
    } = useBibleReference();

    // Memoized trigger for fetching when modal opens
    const triggerFetch = React.useCallback(() => {
      fetchReference(reference!);
    }, [fetchReference, reference]);

    // Fetch on open or reference change
    React.useEffect(() => {
      if (open && reference) {
        triggerFetch();
      }
    }, [triggerFetch, open, reference]);

    // Prepare content to render inside the modal
    const renderContent = React.useMemo(() => {
      if (citationLoading) {
        return (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress aria-label="Loading bible verse" />
          </Box>
        );
      }
      if (citationError) {
        return <Typography color="error">{citationError}</Typography>;
      }
      if (citationData) {
        return "text" in citationData ? (
          <Typography variant="body1">{citationData.text}</Typography>
        ) : (
          Object.entries(citationData.verses || {}).map(([v, txt]) => (
            <Typography key={v} variant="body1">
              <strong>{v}:</strong> {txt}
            </Typography>
          ))
        );
      }
      return (
        <Typography variant="body2" color="text.secondary">
          No verses found.
        </Typography>
      );
    }, [citationLoading, citationError, citationData]);

    // Early exit only after all hooks have been initialized
    if (!open || !reference) {
      return null;
    }

    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="bible-reference-title"
      >
        <DialogTitle id="bible-reference-title">
          {`Cita bíblica: ${reference}`}
          <Typography variant="subtitle2" color="secondary">
            Reina Valera 1960
          </Typography>
        </DialogTitle>
        <DialogContent dividers>{renderContent}</DialogContent>
        <DialogActions>
          <Button onClick={onClose} aria-label="Close bible reference modal">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
);

export default BibleReferenceModal;
