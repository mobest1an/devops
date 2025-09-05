import { Typography, Box } from "@mui/material";

export default function NotFound() {
    return (
        <Box textAlign="center" mt={8}>
            <Typography variant="h4" color="error" gutterBottom>
                404 – Страница не найдена
            </Typography>
        </Box>
    );
}
