import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { IconButton, Input, InputAdornment, styled, TextField } from "@mui/material";
import styles from "./InputApp.module.css";

// const CssTextField = styled(TextField)({
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
// 			borderColor: "#F1F0F3",
//     },
//     "&:hover fieldset": {
//       borderWidth: "1px",
//       borderColor: "#68B7EC",
//     },
//     "&.Mui-focused fieldset": {
//       borderWidth: "1px",
//       borderColor: "#68B7EC",
//     },
//   },
// });

export const InputApp = ({
  icon,
  type,
  handleClick,
  showPassword,
  ...props
}) => {
  // console.log(icon);

  return (
		<Input 
			className={styles.input}
      hover={"true"}
      sx={{}}
      type={type}
      InputProps={
        icon && {
          endAdornment: (
            <InputAdornment onClick={handleClick} position="end">
              <IconButton
                className={styles.icon}
                aria-label="toggle password visibility"
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOffOutlined />
                ) : (
                  <VisibilityOutlined />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }
        // icon
        //   ? {
        //       endAdornment: (
        //         <InputAdornment onClick={handleClick} position="end">
        //           <IconButton
        //             className={style.icon}
        //             aria-label="toggle password visibility"
        //             edge="end"
        //           >
        //             {icon}
        //           </IconButton>
        //         </InputAdornment>
        //       ),
        //     }
        //   : {
        //       endAdornment: (
        //         <InputAdornment onClick={handleClick} position="end">
        //           <IconButton
        //             className={style.icon}
        //             aria-label="toggle password visibility"
        //             edge="end"
        //           >
        //             {showPassword ? (
        //               <VisibilityOffOutlined />
        //             ) : (
        //               <VisibilityOutlined />
        //             )}
        //           </IconButton>
        //         </InputAdornment>
        //       ),
        //     }
      }
      {...props}
    />
  );
};
