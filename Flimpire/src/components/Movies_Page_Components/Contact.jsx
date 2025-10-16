import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import img from '../../assets/contact.jpg';

export default function Contact() {
  return (
    <div style={styles.page}>
      {/* Optional small responsive CSS (remove if you don't want it) */}
      <style>{`
        /* On very small screens, stack the info boxes (only if desired).
           This uses !important to override the inline grid template on small screens. */
        @media (max-width: 700px) {
          .infoSection { grid-template-columns: 1fr !important; padding: 30px 10px !important; }
          .hero { padding: 80px 12px !important; }
        }
      `}</style>

      {/* Hero Section */}
      <div style={styles.hero} className="hero">
        <div style={styles.overlay} /> {/* overlay stays strictly inside the hero */}
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>CONTACT US</h1>
          <p style={styles.heroSubtitle}>
            Got questions about movies, subscriptions, or partnerships? We’re here to help you anytime!
          </p>
        </div>
      </div>

      {/* Info Section (keeps original 3-column arrangement) */}
      <div style={styles.infoSection} className="infoSection">
        {/* Support */}
        <div style={styles.infoBox}>
          <h2 style={styles.phone}>+91 78457 84616</h2>
          <p>subi332006@gmail.com</p>
          <p>Available Mon - Fri, 9:00AM - 6:00PM</p>
        </div>

        {/* Business Inquiries */}
        <div style={styles.infoBox}>
          <h3>Business Inquiries</h3>
          <p>For partnerships, advertising, and promotions:</p>
          <p>mvishvapriyamurugan@gmail.com</p>
        </div>

        {/* Location */}
        <div style={styles.infoBox}>
          <h3>Our Location</h3>
          <p>Chennai, India</p>
          <p>Worldwide Movie Access</p>
        </div>
      </div>

      {/* Send a Message */}
      <div style={styles.messageSection}>
        <h3 style={styles.messageTitle}>CONNECT WITH US</h3>
        <div style={styles.socials}>
          <a href="#" aria-label="Facebook"><FaFacebook size={28} /></a>
          <a href="#" aria-label="Instagram"><FaInstagram size={28} /></a>
          <a href="#" aria-label="Twitter"><FaTwitter size={28} /></a>
          <a href="#" aria-label="YouTube"><FaYoutube size={28} /></a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    color: "#222",
  },

  /* HERO */
  hero: {
    position: "relative",                 // <- MUST be relative so overlay is contained
    overflow: "hidden",                   // <- prevents any leak outside the hero
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    padding: "100px 20px",
  },

  // overlay dims only the hero background (does NOT affect outside)
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",   // change the alpha (0.0 - 1.0) to adjust darkness
    zIndex: 1,
  },

  // content wrapper sits above overlay
  heroContent: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  heroTitle: {
    fontSize: "3rem",
    fontWeight: "bold",
    margin: 0,
  },

  heroSubtitle: {
    marginTop: "10px",
    fontSize: "1.2rem",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },

  /* INFO SECTION - original 3-column arrangement preserved */
  infoSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",   // <- original arrangement kept
    gap: "30px",
    padding: "60px 20px",
    backgroundColor: "white",
  },

  infoBox: {
    lineHeight: "1.6",
  },

  phone: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  /* MESSAGE / SOCIALS */
  messageSection: {
    padding: "40px 20px",
    borderTop: "1px solid #ddd",
  },

  messageTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "15px",
  },

  socials: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    fontSize: "1.5rem",
  },
};
