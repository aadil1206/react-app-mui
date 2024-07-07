import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../LocalStorage/LocalStorage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface Inputs {
  email: string;
  firstName: string;
  password: string;
}
const schema = yup.object().shape({
  email: yup.string().required().email(),
  firstName: yup.string().required().min(2).max(25),
  password: yup.string().required().min(8).max(120),
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
    navigate("/Dashlayout");
  };

  return (
    <div className="col-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12 rounded-2 bg-white p-4">
          <div className="row justify-content-between">
            <div className="col-12 mt-3 flex-column d-flex c100">
              <label htmlFor="name">Your Name</label>

              <TextField
                {...register("email")}
                variant="outlined"
                margin="normal"
                label="Email"
                helperText={errors.email?.message}
                error={!!errors.email?.message}
                fullWidth
                required
              />
            </div>
            <div className="col-12 mt-3 flex-column d-flex c100">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <TextField
                {...register("firstName")}
                variant="outlined"
                margin="normal"
                label="First Name"
                helperText={errors.firstName?.message}
                error={!!errors.firstName?.message}
                fullWidth
                required
              />
            </div>
            <div className="col-12 mt-3 flex-column d-flex c100">
              <label htmlFor="email">Email Address</label>
              <TextField
                {...register("password")}
                variant="outlined"
                margin="normal"
                label="Password"
                helperText={errors.password?.message}
                error={!!errors.password?.message}
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
