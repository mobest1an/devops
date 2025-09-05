import { Paper, Typography } from "@mui/material";
import TicketList from "../components/TicketList";

export default function Tickets() {
    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Мои билеты
            </Typography>
            <TicketList />
        </Paper>
    );
}
