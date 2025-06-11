"use client";

import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/hooks/use-auth";

// Validation schema for registration form
const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("El nombre es obligatorio")
      .min(2, "Mínimo 2 caracteres"),
    email: z
      .string()
      .nonempty("El correo es obligatorio")
      .email("Correo inválido"),
    password: z
      .string()
      .nonempty("La contraseña es obligatoria")
      .min(6, "Mínimo 6 caracteres"),
    isTeacher: z.boolean().optional(),
  })
  .required();

type RegisterFormInputs = z.infer<typeof registerSchema>;

/**
 * Registration page component.
 */
export default function RegisterPage() {
  const { register: registerUser } = useAuth();

  // UI state for loading and submission errors
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  // Initialize form with validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      isTeacher: false,
    },
  });

  /**
   * Handles form submission.
   */
  const onSubmit = useCallback(
    async (data: RegisterFormInputs) => {
      setFormError("");
      setLoading(true);
      try {
        // Trim text inputs
        await registerUser(
          data.name.trim(),
          data.email.trim(),
          data.password,
          data.isTeacher ?? false,
        );
      } catch (err: any) {
        console.error("Error de registro:", err);
        setFormError(
          err?.message || "Error al registrarse. Inténtalo de nuevo.",
        );
      } finally {
        setLoading(false);
      }
    },
    [registerUser],
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={loading}
    >
      {/* Name input field */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nombre"
            fullWidth
            margin="normal"
            required
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            aria-invalid={Boolean(errors.name)}
          />
        )}
      />

      {/* Email input field */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Correo electrónico"
            fullWidth
            margin="normal"
            required
            autoComplete="email"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            aria-invalid={Boolean(errors.email)}
          />
        )}
      />

      {/* Password input field */}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            required
            autoComplete="new-password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            aria-invalid={Boolean(errors.password)}
          />
        )}
      />

      {/* Teacher checkbox */}
      <Controller
        name="isTeacher"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label="Soy maestro(a)"
          />
        )}
      />

      {/* Display submission error */}
      {formError && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {formError}
        </Typography>
      )}

      {/* Submit button */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? "Cargando..." : "Registrarse"}
      </Button>

      {/* Link to login page */}
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        ¿Ya tienes cuenta?{" "}
        <MuiLink component={Link} href="/login">
          Inicia sesión
        </MuiLink>
      </Typography>
    </Box>
  );
}
