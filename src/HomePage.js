import './HomePage.css'; 

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <h1>Application</h1>
        <p>Timer&Calendar</p>
      </header>
      <main className="main-content">
        <section className="feature">
          <div className="feature-icon">⏳</div>
          <div className="feature-text">
            <h2>Timer</h2>
   
            <a href="/timer" className="cta-button">Incepe Timer</a>
          </div>
        </section>
        <section className="feature">
          <div className="feature-icon">📅</div>
          <div className="feature-text">
            <h2>Calendar</h2>
      
            <a href="/calendar" className="cta-button">Vezi Calendar</a>
          </div>
        </section>
      </main>
      <footer className="footer">
 
      </footer>
    </div>
  );
};

export default HomePage;
