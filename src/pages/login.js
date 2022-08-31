import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/slice/users-slice";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { error_message } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <img
                  src="images/trolla-logo.png"
                  alt="aa"
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "50%",
                  }}
                />
                <form className="pt-3">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Username"
                      onChange={(e) =>
                        setUser((pev) => ({
                          ...pev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  {/* {user.userName}||| {user.password} */}
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      onChange={(e) =>
                        setUser((pev) => ({ ...pev, password: e.target.value }))
                      }
                    />
                  </div>
                  <h5>{error_message}</h5>
                  <div className="mt-3">
                    <a
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={() => dispatch(login(user))}
                    >
                      SIGN IN
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- content-wrapper ends --> */}
      </div>
      {/* <!-- page-body-wrapper ends --> */}
    </div>
  );
};

export default Login;
