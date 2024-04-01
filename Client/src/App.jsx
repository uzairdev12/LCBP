import "./App.css";
import logo from "./images/logo.png";
import hero from "./images/hero-img.png";
import demo from "./images/demo-image.png";
function App() {
  return (
    <>
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
              <li
                className="nav-item nav-custom-link btn btn-demo-small"
                style={{ padding: "0px 20px; margin-left: 30px" }}
              >
                <a className="nav-link" style={{ fontSize: "17px" }}>
                  Login{" "}
                  <i className="icon ion-ios-arrow-forward icon-mobile"></i>
                </a>
              </li>
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
              <a className="btn btn-regular">Login</a>
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
                <a className="btn btn-regular">Login </a>
              </div>
            </div>
            <div>
              <img src={demo} className="img-fluid" alt="Demo image" />
            </div>
          </div>
        </div>
      </section>
      <div className="demopage">
        <h1>FIVERR PAGE</h1>
      </div>
      <section id="pricing">
        <div className="container">
          <div className="title-block">
            <h2>Plans and Pricing</h2>
            <p>
              The best opportunity to earn online by using your contacts and
              social circle.
            </p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="pricing-box">
                <h3 className="demo">Basic Plan</h3>
                <h6>750 pkr</h6>
                <small>forever</small>
                <p>Basic Plan gives you alot of features.</p>
                <div className="divider-light"></div>
                <ul>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    Post your gigs
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    10% reffer bonus
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    boxes
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    spins
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    Free online Courses
                  </li>
                </ul>
                <div className="text-center">
                  <a className="btn btn-buy">Buy now</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="pricing-box">
                <h3>Standard Plan</h3>
                <h6>1500 pkr</h6>
                <small>Forever</small>
                <p>Outrank your competitors with this amazing plan</p>
                <div className="divider-light"></div>
                <ul>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    Post your gigs
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    15% reffer bonus
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    boxes
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    spins
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    Free online Courses
                  </li>
                </ul>
                <div className="text-center">
                  <a className="btn btn-buy">Buy now</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="pricing-box">
                <h3>Premium plan</h3>
                <h6>2500 pkr</h6>
                <small>Forever</small>
                <p>
                  Earn significantly more than others with this amazing plan
                </p>
                <div className="divider-light"></div>
                <ul>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    Post your gigs
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    25% reffer bonus
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    boxes and spins
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    Free online Courses
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline"></i>
                    Boosted gigs - <span>¡New!</span>
                  </li>
                </ul>
                <div className="text-center">
                  <a className="btn btn-buy">Buy now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="call-to-action">
        <div className="container text-center">
          <h2>Increase your online earning with LCBP</h2>
          <div className="title-block">
            <p>Buy a plan to start your online earning journey with LCBP.</p>
            <a className="btn btn-regular">Get Started</a>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h5>Buy plans</h5>
              <ul>
                <li>
                  <a>Basic Plan</a>
                </li>
                <li>
                  <a>Standard Plan</a>
                </li>
                <li>
                  <a>Premium Plan</a>
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
    </>
  );
}

export default App;
