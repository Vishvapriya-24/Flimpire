import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Contact() {
  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>CONTACT US</h1>
        <p style={styles.heroSubtitle}>
          Got questions about movies, subscriptions, or partnerships? We’re here to help you anytime!
        </p>
      </div>

      {/* Info Section */}
      <div style={styles.infoSection}>
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
          <a href="#"><FaFacebook size={28} /></a>
          <a href="#"><FaInstagram size={28} /></a>
          <a href="#"><FaTwitter size={28} /></a>
          <a href="#"><FaYoutube size={28} /></a>
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
  hero: {
    backgroundImage:
      'url("https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    padding: "100px 20px",
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
  infoSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
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
  faqSection: {
    padding: "40px 20px",
    backgroundColor: "#f8f8f8",
  },
  faqButton: {
    padding: "12px 24px",
    backgroundColor: "#0077b6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
