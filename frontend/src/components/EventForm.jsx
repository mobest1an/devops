import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
    Alert,
    Snackbar,
    CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { createEvent, updateEvent } from "../api";

export default function EventForm({ open, onClose, initialEvent = null, onSuccess }) {
    const [form, setForm] = useState({ name: "", game: "", startTime: "", id: undefined });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ open: false, text: "", severity: "success" });

    useEffect(() => {
        if (initialEvent) {
            setForm({
                id: initialEvent.id,
                name: initialEvent.name,
                game: initialEvent.game,
                startTime: new Date(initialEvent.startTime).toISOString().slice(0, 16),
            });
        } else {
            setForm({ name: "", game: "", startTime: "", id: undefined });
        }
        setError("");
    }, [initialEvent, open]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.game || !form.startTime) {
            setError("Все поля обязательны");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                name: form.name,
                game: form.game,
                startTime: new Date(form.startTime).toISOString(),
            };

            if (form.id) {
                await updateEvent(form.id, payload);
                setMsg({ open: true, text: "Событие обновлено", severity: "success" });
            } else {
                await createEvent(payload);
                setMsg({ open: true, text: "Событие создано", severity: "success" });
            }

            if (onSuccess) onSuccess();

            setTimeout(() => {
                setMsg((m) => ({ ...m, open: false }));
                onClose();
            }, 1200);
        } catch (err) {
            const txt = err.response?.data?.message || err.message || "Ошибка";
            setMsg({ open: true, text: txt, severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
                <DialogTitle>{form.id ? "Редактировать событие" : "Создать событие"}</DialogTitle>
                <DialogContent dividers>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Stack component="form" spacing={2} onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            label="Название"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Игра"
                            name="game"
                            value={form.game}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Дата и время начала"
                            name="startTime"
                            type="datetime-local"
                            value={form.startTime}
                            onChange={handleChange}
                            required
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} disabled={loading}>Отмена</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={20} />}
                    >
                        {form.id ? "Сохранить" : "Создать"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={msg.open}
                autoHideDuration={4000}
                onClose={() => setMsg((m) => ({ ...m, open: false }))}
            >
                <Alert severity={msg.severity} sx={{ width: "100%" }}>
                    {msg.text}
                </Alert>
            </Snackbar>
        </>
    );
}
