import {
    Card,
    CardContent,
    Typography,
    Divider,
    CircularProgress,
    Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchEvent } from "../api/api";
import PurchaseForm from "./PurchaseForm";

export default function EventDetails({ eventId }) {
    const [event, setEvent] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!eventId) return;
        setEvent(null);
        setError("");

        fetchEvent(eventId)
            .then((res) => setEvent(res.data))
            .catch((e) => setError(e.message));
    }, [eventId]);

    if (!eventId) return <Typography>Выберите событие слева</Typography>;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!event) return <CircularProgress />;

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h5">{event.name}</Typography>
                <Typography color="text.secondary">{event.game}</Typography>
                <Typography>
                    Начало: {new Date(event.startTime).toLocaleString()}
                </Typography>

                <Divider sx={{ my: 2 }} />
                <PurchaseForm event={event} />
            </CardContent>
        </Card>
    );
}
