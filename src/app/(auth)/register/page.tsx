"use client";

import React from "react";
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

const schema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  isTeacher: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const { register } = useAuth();

  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      isTeacher: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await register(
        data.name,
        data.email,
        data.password,
        data.isTeacher ?? false,
      );
    } catch (err) {
      console.error("Register error:", err);
      setErrorMessage("Error al registrarse. Inténtalo de nuevo.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e);
      }}
      noValidate
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            {...field}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            label="Correo electrónico"
            fullWidth
            margin="normal"
            {...field}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            {...field}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
      />
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
      {errorMessage && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Registrarse
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        ¿Ya tienes cuenta?{" "}
        <MuiLink component={Link} href="/login">
          Inicia sesión
        </MuiLink>
      </Typography>
    </Box>
  );
}
