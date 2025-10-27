'use client';

import { useEffect, useRef } from 'react';
import MorphingBackground from './components/MorphingBackground';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      new MorphingBackground(canvasRef.current);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <canvas ref={canvasRef} />
      
      <nav>
        <a onClick={() => scrollToSection('hero')}>Home</a>
        <a onClick={() => scrollToSection('cs-projects')}>CS Projects</a>
        <a onClick={() => scrollToSection('music')}>Music</a>
        <a onClick={() => scrollToSection('max')}>Max/MSP</a>
        <a onClick={() => scrollToSection('contact')}>Contact</a>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section id="hero">
          <h1>Lixing Wang</h1>
          <p style={{ fontSize: 'var(--font-size-xl)', marginBottom: '2rem' }}>
            Math + CS + Music @ Brown University
          </p>
          <p>
            I code and I compose. I believe the best work comes from the intersection of
            technical depth and creative vision. Whether it's building intelligent systems,
            creating music, or crafting real-time audio tools. I'm passionate about projects
            that challenge both sides of my brain.
          </p>
          <p style={{ marginTop: '2rem', color: 'var(--text-secondary)' }}>
            Expected graduation: Spring 2027
          </p>
        </section>

        {/* CS PROJECTS */}
        <section id="cs-projects">
          <h2>CS Projects</h2>

          {/* CERN Research */}
          <div className="project">
            <h3>LGAD Performance Characterization with ML</h3>
            <p className="project-meta">
              Research with CERN | Prof. Gaetano Barone
            </p>
            <p>
              Developed a comprehensive system to characterize Low-Gain Avalanche Detector (LGAD) 
              performance under environmental stress factors using machine learning.
            </p>
            <p>
              <strong>Key Contributions:</strong>
            </p>
            <ul style={{ textAlign: 'left', marginLeft: '2rem', color: 'var(--text-secondary)' }}>
              <li>Built a robust database management system handling 10,000+ scan curves</li>
              <li>Implemented RANSAC-based outlier rejection achieving 98.5% accuracy in curve fitting</li>
              <li>Designed and trained conditional autoencoder to predict detector response across temperature, humidity, and bias voltage ranges</li>
              <li>Model predictions showed 94.2% correlation with experimental data</li>
            </ul>
            <p style={{ marginTop: '1rem' }}>
              <strong>Tech Stack:</strong> Python, PyTorch, Pandas, RANSAC
            </p>
          </div>

          {/* DJMAX AI */}
          <div className="project">
            <h3>DJMAX Rhythm Game AI Player</h3>
            <p className="project-meta">
              Term Project | Team: Me, Jonie Nishimura, Tiffay Gao.
            </p>
            <p>
              Built a real-time AI player for <i>DJMAX Respect V</i>, a world-famous rhythm game, using deep learning.
              The system outstrips average human performance, consistently scoring above 97% accuracy.
            </p>
            <p>
              <strong>My Contributions:</strong>
            </p>
            <ul style={{ textAlign: 'left', marginLeft: '2rem', color: 'var(--text-secondary)' }}>
              <li>Collected and curated 139,500 training frames through gameplay</li>
              <li>Designed ResNet18 + GRU architecture for temporal pattern recognition</li>
              <li>Engineered custom loss function balancing precision and timing accuracy</li>
              <li>Optimized model to run at ~45 FPS locally with 97% average accuracy</li>
            </ul>
            <p style={{ marginTop: '1rem' }}>
              <strong>Demo Video:</strong>
            </p>
            <div className="video-container-inblock">
              <iframe 
                src="https://drive.google.com/file/d/1R4fXzo1rUxJgjgfUEzuSzTBLk3b6OEWm/preview" 
                width="640" 
                height="480" 
                allow="autoplay"
              >
              </iframe>
            </div>
            <p style={{ marginTop: '1rem', fontSize: 'var(--font-size-base)'}}>
                More demos can be found on <a href="https://drive.google.com/drive/folders/1wsH6CuSxASzPQl1X4VYxtIIR43HAku2k?usp=share_link">Google Drive</a>
            </p>
            <p style={{ marginTop: '1rem' }}>
              <strong>Tech Stack:</strong> Python, PyTorch, OpenCV, NumPy
            </p>
            <p style={{ marginTop: '1rem', fontSize: 'var(--font-size-base)' }}>
              <strong>Team Roles:</strong> 
              <br />
              <strong>Lixing Wang (Me):</strong> Model architecture & loss function design, data collection pipeline (capture.py), dataset implementation (dataset.py), inference optimization, real-time gameplay testing.
              <br />
              <strong>Tiffany Gao:</strong> Model training & evaluation, core model implementation (model.py, train.py, test.py), video dataset class design, visualization & graphing.
              <br />
              <strong>Jonie Nishimura:</strong> Preprocessing functions (validation, trim_video), inference pipeline (play.py), TensorFlow-to-PyTorch conversion, poster design.
            </p>
          </div>
        </section>

        {/* MUSIC */}
        <section id="music">
          <h2>Music Works</h2>

          {/* Featured Song */}
          <div className="music-item">
            <h3>Masquerade feat. KAFU</h3>
            <p className="project-meta">Latest Release | 2025</p>
            <p>
              My first vocaloid composition combining mysterious atmosphere with catchy synth melodies.
              I composed, produced, and created the music video entirely myself using Stable Diffusion
              for AI-generated artwork. 
            </p>
            <p>
              The song ranked 14th in <br /> <a href="https://www.bilibili.com/opus/1105740885194178560">Bili_Board Vocaloid Weekly Charts (Week 24, August 27, 2025 - Issue 64).</a>
            </p>
            <p>
              <strong>Behind the Scenes:</strong> ~40 hours of production | Composition,  
              arrangement, mixing, music video creation, and visual effects.
            </p>
            <div className="video-container">
              <iframe
                src="//player.bilibili.com/player.html?isOutside=true&bvid=BV1q9YbzyEKd&cid=31789027319&p=1"
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                width="1920"
                height="1080"
              />
            </div>
          </div>

          {/* Albums */}
          <div className="music-item">
            <h3>Discography</h3>
            <p>Released on Spotify, Apple Music, NetEase Music, and other platforms.</p>
            
            <h4 style={{ marginTop: '2rem', color: 'var(--accent-2)' }}>EVERWIND</h4>
            <p style={{ fontSize: 'var(--font-size-base)' }}>
              Japanese ACG-inspired electronic music (Kawaii Bass) with energetic synths and infectious beats.
              <br />
              Late 2024 to Early 2025 production.
            </p>
            <iframe 
              data-testid="embed-iframe" 
              style={{ borderRadius: '12px', margin: '1rem 0' }}
              src="https://open.spotify.com/embed/album/5YcmMfCioLzhn9hN7e1Lxo?utm_source=generator" 
              width="100%" 
              height="730" 
              frameBorder="0" 
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy">
            </iframe>

            <h4 style={{ marginTop: '2rem', color: 'var(--accent-2)' }}>Telescope</h4>
            <p style={{ fontSize: 'var(--font-size-base)' }}>
              First released album as KONOHA' Sakurai. 
              <br />
              Mid 2024 works on Kawaii Bass.
            </p>
            <iframe 
              data-testid="embed-iframe" 
              style={{ borderRadius: '12px', margin: '1rem 0' }}
              src="https://open.spotify.com/embed/album/1mhELS8TIXMlH8IzZ8DOyg?utm_source=generator" 
              width="100%" 
              height="470" 
              frameBorder="0" 
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy">
            </iframe>

            <h4 style={{ marginTop: '2rem', color: 'var(--accent-2)' }}>Featured: Echoes of Summer</h4>
            <p style={{ fontSize: 'var(--font-size-base)' }}>
              Featured artist on this collaborative album. I produced the second track.
              <br />
              Mid 2024 release.
            </p>
            <iframe 
              data-testid="embed-iframe" 
              style={{ borderRadius: '12px', margin: '1rem 0' }}
              src="https://open.spotify.com/embed/album/5h32lZHHXLd5nwsQsXr79J?utm_source=generator" 
              width="100%" 
              height="352" 
              frameBorder="0" 
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy">
            </iframe>
          </div>

          {/* Classical Works */}
          <div className="music-item">
            <h3>Classical Piano Work: Atop the Forest</h3>
            <p>
              2023 composition for classical piano. The piece explores harmonic complexity 
              and emotional depth. I used MIDI notation and manually tweaked MIDI mock-ups.
            </p>
            <div className="video-container">
              <iframe
                src="//player.bilibili.com/player.html?isOutside=true&aid=560493183&bvid=BV19e4y1b7Jd&cid=836054901&p=1"
                scrolling="no"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>

          {/* General Music Section */}
          <div className="music-item">
            <h3>About My Music</h3>
            <p>
              Most of my production and compositional skills have been developed independently 
              through continuous experimentation and creative exploration. While I've studied 
              music theory, composition, and real-time systems at Brown, my distinctive style 
              comes from hands-on practice, community engagement, and pushing boundaries in 
              electronic and vocaloid music production.
            </p>
            <p>
              Through out my musical journey, I released works under different aliases, including
              "IKAYAKI" for vocaloid music, "KONOHA' Sakurai" for electronic music, 
              and "HoshiMiya" for earlier classical piano compositions.
            </p>
            <p>
              <strong>Skills:</strong> Composition, Arrangement, Production, Music Video Direction, 
              AI-assisted Visual Design, Vocaloid Synthesis
            </p>
          </div>
        </section>

        {/* MAX/MSP */}
        <section id="max">
          <h2>Max/MSP Patches</h2>
          <p>Creative signal processing and real-time audio manipulation tools built in Cycling Max 9.</p>

          <div className="music-item">
            <h3>Patch Name: [Your Patch]</h3>
            <p className="project-meta">Real-time Audio Processing</p>
            <p>
              [Description of what your patch does, creative applications, inspiration]
            </p>
            
            <p style={{ marginTop: '2rem', fontWeight: 600 }}>Patch Interface:</p>
            <img
              src="/max-patch-screenshot.png"
              alt="Max Patch"
              style={{
                maxWidth: '100%',
                borderRadius: '12px',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                margin: '1rem 0',
              }}
            />

            <p style={{ marginTop: '2rem', fontWeight: 600 }}>Demo:</p>
            <div className="video-container">
              <iframe
                src="https://drive.google.com/file/d/YOUR_FILE_ID/preview"
                allow="autoplay"
              />
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <h2>Skills & Experience</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', margin: '2rem 0' }}>
            <div>
              <h3 style={{ color: 'var(--accent-1)', fontSize: 'var(--font-size-lg)' }}>Programming Languages</h3>
              <p>Python • TypeScript • C++ • Java • JavaScript</p>
            </div>
            
            <div>
              <h3 style={{ color: 'var(--accent-1)', fontSize: 'var(--font-size-lg)' }}>ML/AI</h3>
              <p>PyTorch • Deep Learning • Computer Vision • RANSAC</p>
            </div>
            
            <div>
              <h3 style={{ color: 'var(--accent-1)', fontSize: 'var(--font-size-lg)' }}>Web & Tools</h3>
              <p>React • Next.js • Database Design • Git</p>
            </div>
            
            <div>
              <h3 style={{ color: 'var(--accent-1)', fontSize: 'var(--font-size-lg)' }}>Music Production</h3>
              <p>Composition • Vocaloid • Max/MSP • DAW</p>
            </div>
            
            <div>
              <h3 style={{ color: 'var(--accent-1)', fontSize: 'var(--font-size-lg)' }}>Math</h3>
              <p>Linear Algebra • Abstract Algebra • Analysis • Graph Theory</p>
            </div>
            
            <div>
              <h3 style={{ color: 'var(--accent-1)', fontSize: 'var(--font-size-lg)' }}>Courses Taken</h3>
              <p>Algorithm Design • Real-time Systems • Software Engineering</p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <h2>Let's Connect</h2>
          
          <div style={{ margin: '2rem 0' }}>
            <a href="mailto:lixing_wang@brown.edu" className="btn">
              Email Me
            </a>
            <a href="/resume.pdf" className="btn">
              Download Resume
            </a>
          </div>

          <div style={{ margin: '2rem 0', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <a href="https://github.com/lixing-w" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/lixing-wang-b11a852b0/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://space.bilibili.com/80270727" target="_blank" rel="noopener noreferrer">
              Bilibili
            </a>
          </div>

          <footer>
            <p style={{ fontSize: 'var(--font-size-base)' }}>
              © 2025 Lixing Wang. Built with Next.js, TypeScript, and React.
            </p>
          </footer>
        </section>
      </main>
    </>
  );
}
