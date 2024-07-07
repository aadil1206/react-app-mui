import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../LocalStorage/LocalStorage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface Inputs {
  Name: string;
  Number: string;
  email: string;
}
const schema = yup.object().shape({
  email: yup.string().required().email(),
  Number: yup
    .string()
    .required()
    .matches(/^\d{1,10}$/, "Number must be between 1 and 10 digits"),
  Name: yup.string().required(),
});
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const { setItem } = useLocalStorage("values");
  const navigate = useNavigate();
  const onSubmit = (data: Inputs) => {
    setItem(data);
    navigate("/Page");
  };

  return (
    <div className="col-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12 rounded-2 bg-white p-4">
          <div className="row justify-content-between">
            <div className="col-12 mt-3 flex-column d-flex c100">
              <label htmlFor="name">Your Name</label>

              <TextField
                {...register("Name")}
                variant="outlined"
                margin="normal"
                label="Name"
                helperText={errors.Name?.message}
                error={!!errors.Name?.message}
                fullWidth
                required
              />
            </div>
            <div className="col-12 mt-3 flex-column d-flex c100">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <TextField
                {...register("Number")}
                variant="outlined"
                margin="normal"
                label="Number"
                helperText={errors.Number?.message}
                error={!!errors.Number?.message}
                fullWidth
                required
              />
            </div>
            <div className="col-12 mt-3 flex-column d-flex c100">
              <label htmlFor="email">Email Address</label>
              <TextField
                {...register("email")}
                variant="outlined"
                margin="normal"
                label="Email"
                helperText={errors.email?.message}
                error={!!errors.email?.message}
                type="password"
                fullWidth
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            // className={submitButton}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
