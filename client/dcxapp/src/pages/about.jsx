import "bootstrap/dist/css/bootstrap.min.css";
import adVideo from "../assets/videos/ad.mp4";

function AboutUs() {
  return (
    <div>
      <div class="card border-primary container mb-4">
        <div class="card-body ">
          <div>
            <h3 class="fw-bold text-center">
              Welcome to DCX Developer Directory!
            </h3>
            <h5 class="blue-text">Who Are We?</h5>
            <p>
              We are a fictional website and service that list top web
              developers around the world. Search and browse fictional web
              developers on our website absolutley FREE!
            </p>
            <h5 class="blue-text">What Skills Do Our Developers Have?</h5>
            <p>
              Our listed fictional web developers skill ranges from Graphic
              design with Photoshop, Illustrator and Fireworks to markup
              languages like HTML5, XHTML and XML to programming languages such
              as Javascript, PHP, Python and ASP
            </p>
          </div>
          <video class="mb-4" width="400" height="240" controls>
            <source src={adVideo} type="video/mp4"></source>
          </video>
        </div>
      </div>
    </div>
  );
}
export default AboutUs;
