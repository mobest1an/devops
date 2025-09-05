import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    IconButton,
    CircularProgress,
    Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { fetchEvents } from "../api";
import { useNavigate } from "react-router-dom";

export default function EventList({ refreshKey, onSelect, onEdit }) {
    const [events, setEvents] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setEvents(null);
        setError("");
        fetchEvents()
            .then((res) => setEvents(res.data))
            .catch((e) => setError(e.message));
    }, [refreshKey]);

    if (error) return <Alert severity="error">{error}</Alert>;
    if (!events) return <CircularProgress />;

    return (
        <List>
            {events.map((ev) => (
                <ListItem key={ev.id} disablePadding sx={{ alignItems: "center" }}>
                    <ListItemButton
                        onClick={() => {
                            onSelect?.(ev.id);
                            navigate(`/events/${ev.id}`);
                        }}
                        sx={{ flexGrow: 1 }}
                    >
                        <ListItemText
                            primary={ev.name}
                            secondary={`${ev.game} | ${new Date(ev.startTime).toLocaleString()}`}
                        />
                    </ListItemButton>

                    <IconButton
                        edge="end"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onEdit) onEdit(ev);
                        }}
                        size="small"
                        title="Редактировать"
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </ListItem>
            ))}
        </List>
    );
}
