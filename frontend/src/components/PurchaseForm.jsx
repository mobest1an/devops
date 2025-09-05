import {
    TextField,
    Button,
    Stack,
    Alert,
    Snackbar,
    CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { purchaseTicket } from "../api";

export default function PurchaseForm({ event }) {
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({
        open: false,
        text: "",
        severity: "success",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await purchaseTicket({
                eventId: event.id,
                price: parseFloat(price),
                quantity: Number(quantity),
            });
            setMsg({
                open: true,
                text: "Билеты успешно куплены!",
                severity: "success",
            });
            setPrice("");
            setQuantity(1);
        } catch (err) {
            setMsg({
                open: true,
                text: err.response?.data?.message || "Ошибка покупки",
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
                    <TextField
                        label="Цена (₽)"
                        value={price}
                        required
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        inputProps={{ step: "0.01", min: "0" }}
                    />
                    <TextField
                        label="Кол‑во"
                        value={quantity}
                        required
                        type="number"
                        onChange={(e) => setQuantity(e.target.value)}
                        inputProps={{ min: 1 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={20} />}
                    >
                        Купить
                    </Button>
                </Stack>
            </form>

            <Snackbar
                open={msg.open}
                autoHideDuration={4000}
                onClose={() => setMsg({ ...msg, open: false })}
            >
                <Alert severity={msg.severity} sx={{ width: "100%" }}>
                    {msg.text}
                </Alert>
            </Snackbar>
        </>
    );
}
