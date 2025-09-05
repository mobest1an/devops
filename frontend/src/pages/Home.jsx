import { Typography, Box } from "@mui/material";

export default function Home() {
    return (
        <Box textAlign="center" mt={4}>
            <Typography variant="h4" gutterBottom>
                Добро пожаловать в приложение CyberTickets
            </Typography>
            <Typography>
                Выберите событие, купите билет и наслаждайтесь киберспортом.
            </Typography>
        </Box>
    );
}
