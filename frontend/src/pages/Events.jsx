import { useState, useCallback } from "react";
import { Box, Button } from "@mui/material";
import EventList from "../components/EventList";
import EventDetails from "../components/EventDetails";
import EventForm from "../components/EventForm";
import { deleteEvent } from "../api/api";

export default function EventsPage() {
    const [refreshKey, setRefreshKey] = useState(0);
    const refresh = useCallback(() => setRefreshKey((prev) => prev + 1), []);

    const [selectedId, setSelectedId] = useState(null);
    const [editEvent, setEditEvent] = useState(null);
    const [formOpen, setFormOpen] = useState(false);

    const openCreateForm = () => {
        setEditEvent(null);
        setFormOpen(true);
    };
    const openEditForm = (ev) => {
        setEditEvent(ev);
        setFormOpen(true);
    };

    const handleDelete = async (eventId) => {
        try {
            await deleteEvent(eventId);
            if (selectedId === eventId) setSelectedId(null);
            refresh();
        } catch (err) {
            alert(
                err.response?.data?.message ||
                err.message ||
                "Не удалось удалить событие"
            );
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Button variant="contained" onClick={openCreateForm} sx={{ mb: 2 }}>
                + Добавить событие
            </Button>

            <Box display="flex" gap={3}>
                <Box flex={1} maxWidth={350}>
                    <EventList
                        refreshKey={refreshKey}
                        onSelect={setSelectedId}
                        onEdit={openEditForm}
                        onDelete={handleDelete}
                    />
                </Box>

                <Box flex={2}>
                    <EventDetails eventId={selectedId} />
                </Box>
            </Box>

            <EventForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                initialEvent={editEvent}
                onSuccess={() => {
                    refresh();
                    setSelectedId(null);
                }}
            />
        </Box>
    );
}
