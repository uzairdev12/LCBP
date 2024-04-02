import "./home.css";
import logo from "../images/logo.png";
import hero from "../images/hero-img.png";
import demo from "../images/demo-image.png";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const userid = localStorage.getItem("AUTHUSERUNIQUEID");

  return (
    <div className="home">
      <nav
        className="navbar navbar-default navbar-expand-lg fixed-top custom-navbar"
        style={{ paddingBottom: "10px" }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="icon ion-md-menu"></span>
        </button>
        <img
          src={logo}
          className="img-fluid nav-logo-mobile logo"
          alt="Company Logo"
        />
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <div className="container nav-cont">
            <img
              src={logo}
              className="img-fluid nav-logo-desktop logo"
              alt="Company Logo"
            />
            <ul
              className="navbar-nav ml-auto nav-right d-flex align-items-center"
              data-easing="easeInOutExpo"
              data-speed="1250"
              data-offset="65"
            >
              <li className="nav-item nav-custom-link">
                <a className="nav-link">
                  Home{" "}
                  <i className="icon ion-ios-arrow-forward icon-mobile"></i>
                </a>
              </li>
              <li className="nav-item nav-custom-link">
                <a className="nav-link">
                  Freelancers
                  <i className="icon ion-ios-arrow-forward icon-mobile"></i>
                </a>
              </li>
              <li className="nav-item nav-custom-link">
                <a className="nav-link">
                  Communities
                  <i className="icon ion-ios-arrow-forward icon-mobile"></i>
                </a>
              </li>
              <li className="nav-item nav-custom-link">
                <a className="nav-link">
                  Plans{" "}
                  <i className="icon ion-ios-arrow-forward icon-mobile"></i>
                </a>
              </li>
              {userid ? (
                <li
                  className="nav-item nav-custom-link btn btn-demo-small"
                  style={{ padding: "0px 20px; margin-left: 30px" }}
                  onClick={() => navigate("/profile")}
                >
                  <a className="nav-link" style={{ fontSize: "17px" }}>
                    Profile{" "}
                    <i className="icon ion-ios-arrow-forward icon-mobile"></i>
                  </a>
                </li>
              ) : (
                <li
                  className="nav-item nav-custom-link btn btn-demo-small"
                  style={{ padding: "0px 20px; margin-left: 30px" }}
                  onClick={() => navigate("/login")}
                >
                  <a className="nav-link" style={{ fontSize: "17px" }}>
                    Login{" "}
                    <i className="icon ion-ios-arrow-forward icon-mobile"></i>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <section id="hero">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-5 col-md-5 col-sm-5 col-xs-5"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={hero} className="img-fluid" alt="Demo image" />
            </div>
            <div className="col-md-7 content-box hero-content">
              <span>Unlimited opportunities</span>
              <h1>
                LCB Learn and Earn <b> With LCBP's Digital contributions </b>
              </h1>
              <p>Learn and Earn online with LCBP's easy-to-use platform.</p>
              {userid ? (
                <a
                  onClick={() => navigate("profile")}
                  className="btn btn-regular"
                >
                  Profile
                </a>
              ) : (
                <a
                  onClick={() => navigate("/login")}
                  className="btn btn-regular"
                >
                  Login
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      <section id="marketing">
        <div className="container">
          <div className="aboutPage">
            <div>
              <div className="content-box">
                <span>About US</span>
                <h2>We are LCBP</h2>
                <p style={{ textAlign: "justify" }}>
                  Forget the struggle of finding freelance work, or the
                  frustration of not knowing where to start. We're building a
                  future where anyone, regardless of experience, can thrive
                  online. Our platform seamlessly connects skilled freelancers
                  with eager clients, while simultaneously offering free
                  educational programs to equip newcomers for success. It's
                  online income, simplified.
                </p>
                {userid ? (
                  <a
                    className="btn btn-regular"
                    onClick={() => navigate("/profile")}
                  >
                    Profile{" "}
                  </a>
                ) : (
                  <a
                    className="btn btn-regular"
                    onClick={() => navigate("/login")}
                  >
                    Login{" "}
                  </a>
                )}
              </div>
            </div>
            <div>
              <img src={demo} className="img-fluid" alt="Demo image" />
            </div>
          </div>
        </div>
      </section>
      <div className="demopage">
        <h1>LC-Freelancers PAGE</h1>
      </div>

      <section id="call-to-action">
        <div className="container text-center">
          <h2>Increase your online earning with LCBP</h2>
          <div className="title-block">
            <p>Buy a plan to start your online earning journey with LCBP.</p>
            {userid ? (
              <a
                className="btn btn-regular"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </a>
            ) : (
              <a className="btn btn-regular">Get Started</a>
            )}
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h5>Company</h5>
              <ul>
                <li>
                  <a>Terms of services</a>
                </li>
                <li>
                  <a>Privacy policy</a>
                </li>
                <li>
                  <a>Contact</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Main apps</h5>
              <ul>
                <li>
                  <a>LC Communities</a>
                </li>
                <li>
                  <a>LC Chat</a>
                </li>
                <li>
                  <a>LC Ads</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>FAQs</h5>
              <ul>
                <li>
                  <a>Why LCBP?</a>
                </li>
                <li>
                  <a>Which plan to buy?</a>
                </li>
                <li>
                  <a>How will I earn?</a>
                </li>
                <li>
                  <a>How do I get paid?</a>
                </li>
                <li>
                  <a>What is LCBP?</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>LCBP</h5>
              <p>
                LCBP is an online platform that allows you to earn online. We
                also offer free online courses.
              </p>
              <p>
                <a className="external-links">support@lcbp.com</a>
              </p>
            </div>
          </div>
          <div className="divider"></div>
          <div className="row">
            <div className="col-md-6 col-xs-12">
              <a>
                <i className="icon ion-logo-facebook"></i>
              </a>
              <a>
                <i className="icon ion-logo-instagram"></i>
              </a>
              <a>
                <i className="icon ion-logo-twitter"></i>
              </a>
              <a>
                <i className="icon ion-logo-youtube"></i>
              </a>
            </div>
            <div className="col-md-6 col-xs-12">
              <small>
                2018 &copy; All rights reserved. Made by
                <a className="external-links">Uzair Manan</a>
              </small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
