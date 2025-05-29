"use client";

import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/hooks/use-auth";

const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Error al iniciar sesión. Verifica tus datos.");
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
      {errorMessage && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Iniciar sesión
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        ¿No tienes cuenta?{" "}
        <MuiLink component={Link} href="/register">
          Regístrate
        </MuiLink>
      </Typography>
    </Box>
  );
}
