import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const OverviewBox = ({ title, subtitle, detail, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" flexDirection="column">
        <Typography variant="h5" sx={{ color: colors.blueAccent[500] }}>
          {subtitle}
        </Typography>

        {detail == null ? (
          ""
        ) : (
          <Typography variant="h6" sx={{ color: colors.redAccent[500] }}>
            ({detail})
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default OverviewBox;
