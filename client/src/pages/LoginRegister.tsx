import { FaGoogle, FaLock, FaUser } from "react-icons/fa6";
import styles from "../styles/login.module.css";
import { FaEnvelope } from "react-icons/fa";
import { useEffect } from "react";

function LoginRegister() {

  useEffect(() => {

    document.body.classList.add(styles.loginPage);

    window.addEventListener("hashchange", () => {
      const login = document.getElementById("login");
      const register = document.getElementById("register");
      const card = document.getElementById("card");

      if (window.location.hash === "#register") {
        card?.classList.add(styles.extend);
        login?.classList.remove(styles.selected);
        register?.classList.add(styles.selected);
      } else {
        card?.classList.remove(styles.extend);
        register?.classList.remove(styles.selected);
        login?.classList.add(styles.selected);
      }
    });

    window.addEventListener("load", () => {
      const login = document.getElementById("login");
      const register = document.getElementById("register");
      const card = document.getElementById("card");

      if (window.location.hash === "#register") {
        card?.classList.add(styles.extend);
        login?.classList.remove(styles.selected);
        register?.classList.add(styles.selected);
      } else {
        card?.classList.remove(styles.extend);
        register?.classList.remove(styles.selected);
        login?.classList.add(styles.selected);
      }
    });

    return () => {
      document.body.classList.remove(styles.loginPage);
      window.removeEventListener("hashchange", () => {});
    };
  }
  , []);


  return (
    <div className={styles.loginPage}>
      <div className={styles.loginAlign}>
        <div className={styles.loginCard} id="card">
          <div className={styles.head}>
            <div></div>
            <a id="login" className={styles.selected} href="#login">
              Login
            </a>
            <a id="register" href="#register">
              Register
            </a>
            <div></div>
          </div>
          <div className={styles.tabs}>
            <form>
              <div className={styles.inputs}>
                <div className={styles.input}>
                  <input placeholder="Username" type="text" />
                  <FaUser className="text-gray-500" />
                </div>
                <div className={styles.input}>
                  <input placeholder="Password" type="password" />
                  <FaLock  className="text-gray-500" />
                </div>
                <p>or sign up with:</p>
                <ul>
                  <li className="cursor-pointer">
                    <FaGoogle />
                  </li>
                </ul>
              </div>
              <button className="btn btn-primary w-32">Login</button>
            </form>
            <form>
              <div className={styles.inputs}>
                <div className={styles.input}>
                  <input placeholder="Email" type="text" />
                  <FaEnvelope className="text-gray-500" />
                </div>
                <div className={styles.input}>
                  <input placeholder="Username" type="text" />
                  <FaUser className="text-gray-500" />
                </div>
                <div className={styles.input}>
                  <input placeholder="Password" type="password" />
                  <FaLock className="text-gray-500" />
                </div>
                <p>or sign up with:</p>
                <ul>
                  <li className="cursor-pointer">
                    <FaGoogle />
                  </li>
                </ul>
              </div>
              <button className="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
