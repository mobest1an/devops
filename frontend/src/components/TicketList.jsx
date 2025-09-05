import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    CircularProgress,
    Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchTickets } from "../api";

export default function TicketList() {
    const [tickets, setTickets] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchTickets()
            .then((res) => setTickets(res.data))
            .catch((e) => setError(e.message));
    }, []);

    if (error) return <Alert severity="error">{error}</Alert>;
    if (!tickets) return <CircularProgress />;

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Событие</TableCell>
                        <TableCell>Игра</TableCell>
                        <TableCell>Дата события</TableCell>
                        <TableCell>Цена</TableCell>
                        <TableCell>Кол‑во</TableCell>
                        <TableCell>Время покупки</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets.map((t) => (
                        <TableRow key={t.id}>
                            <TableCell>{t.id}</TableCell>
                            <TableCell>{t.event?.name ?? "—"}</TableCell>
                            <TableCell>{t.event?.game ?? "—"}</TableCell>
                            <TableCell>
                                {t.event?.startTime
                                    ? new Date(t.event.startTime).toLocaleString()
                                    : "—"}
                            </TableCell>
                            <TableCell>{t.price?.toFixed(2) ?? "—"}</TableCell>
                            <TableCell>{t.quantity ?? "—"}</TableCell>
                            <TableCell>
                                {t.purchaseTime
                                    ? new Date(t.purchaseTime).toLocaleString()
                                    : "—"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
