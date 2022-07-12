import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment, styled, TextField } from "@mui/material";
import style from "./InputApp.module.css";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
			borderColor: "#F1F0F3",
    },
    "&:hover fieldset": {
      borderWidth: "1px",
      borderColor: "#68B7EC",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "1px",
      borderColor: "#68B7EC",
    },
  },
});

export const InputApp = ({
  icon,
  type,
  handleClick,
	showPassword,
	field,
  ...props
}) => {
  // console.log(icon);

  return (
    <CssTextField
      hover={"true"}
      className={style.input}
      sx={{}}
			type={type}
			{...field}
      InputProps={
        icon && {
          endAdornment: (
            <InputAdornment onClick={handleClick} position="end">
              <IconButton
                className={style.icon}
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
