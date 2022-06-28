import { Box, Grid } from "@mui/material";
import { useState } from "react";
import {
  FormSignIn,
  FormRecoveryWithLogin,
  FormRecoveryWithPass,
  FormRecoveryWithNewPass,
} from "./../../components/Forms";
import style from "./Auth.module.css";

const Auth = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  const view = () => {
    switch (step) {
      case 1:
        return <FormSignIn nextStep={nextStep} prevStep={prevStep} />;
      case 2:
        return (
          <FormRecoveryWithLogin nextStep={nextStep} prevStep={prevStep} />
        );
      case 3:
        return <FormRecoveryWithPass nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return (
          <FormRecoveryWithNewPass nextStep={nextStep} prevStep={prevStep} />
        );
      default:
        return;
    }
  };
  return (
    <Grid container height="100vh">
      <Grid item xs={0} sm={6}>
        <div className={style.auth__bg}></div>
      </Grid>
      <Grid item xs={12} sm={6} display="flex">
				{view()}
      </Grid>
    </Grid>
  );
};
export default Auth;
