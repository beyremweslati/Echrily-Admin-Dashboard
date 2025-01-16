import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCirlce from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase, detail}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    return (
        <Box width="100%" m="0 30px" >
            <Box display="flex" justifyContent="space-between">
                <Box>
                    {icon}
                    <Typography variant="h4" fontWeight="bold" sx={{ color: colors.grey[100] }}>
                        {title}
                    </Typography>
                </Box>
                <Box>
                    <ProgressCirlce progress={progress} />
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
                <Box display="flex" flexDirection="column">
                    <Typography variant="h5" sx={{ color: colors.blueAccent[500] }}>
                        {subtitle}
                    </Typography>
                    <Typography variant="h6" sx={{ color: colors.grey[300] }}>
                        {"( % " + detail + ")"}
                    </Typography>
                </Box>
                <Box>
                        <Typography variant="h5" fontStyle="italic" sx={{ color: increase < 0 ? colors.redAccent[500] : colors.greenAccent[500] }}>
                            {increase}%  
                        </Typography>
                </Box>
            </Box>
            
        </Box>
    );
}

export default StatBox;