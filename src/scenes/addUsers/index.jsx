import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
const AddUsers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="ADD USERS" subtitle="Adding Users" />
    </Box>
  );
};

export default AddUsers;
