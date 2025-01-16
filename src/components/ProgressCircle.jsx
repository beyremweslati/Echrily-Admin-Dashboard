import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressCirlce = ({progress = "0.75", size="40"}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const angle = Math.abs(progress) * 360;
    const progressColor = progress >= 0 ? colors.greenAccent[500] : colors.redAccent[500];

    return ( 
        <Box
            sx =  {{
                background: `radial-gradient(${colors.primary[400]} 55%, transparent 56% ), conic-gradient(${progressColor} 0deg ${angle}deg, ${colors.primary[800]} ${angle}deg 360deg)`,
                borderRadius: "50%",
                width: `${size}px`,
                height: `${size}px`,
            }}
        />
    );
}
export default ProgressCirlce;