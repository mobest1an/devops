import { Outlet, NavLink } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Box,
    Button,
} from "@mui/material";

export default function Layout() {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        🎮 Билеты на киберспортивные события
                    </Typography>
                    <Button component={NavLink} to="/" color="inherit">
                        Главная
                    </Button>
                    <Button component={NavLink} to="/events" color="inherit">
                        События
                    </Button>
                    <Button component={NavLink} to="/tickets" color="inherit">
                        Мои билеты
                    </Button>
                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4 }}>
                <Outlet />
            </Container>

            <Box component="footer" sx={{ p: 2, textAlign: "center", mt: 4 }}>
                {new Date().getFullYear()} CyberTickets
            </Box>
        </>
    );
}
