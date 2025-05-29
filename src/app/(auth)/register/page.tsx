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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  isTeacher: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      isTeacher: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Register:", {
      email: data.email,
      password: data.password,
      role: data.isTeacher ? "teacher" : "student",
    });
    router.push("/quarters");
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
