'use client';

import { useEffect, useRef } from 'react';
import { InlineMath } from 'react-katex';
import MorphingBackground from './components/MorphingBackground';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const scrollVelocity = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      new MorphingBackground(canvasRef.current);
    }
  }, []);

  useEffect(() => {
    const scrollSpeed = 50; // pixels per frame

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        keysPressed.current[e.key] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        keysPressed.current[e.key] = false;
      }
    };

    const scroll = () => {
      let newVelocity = 0;

      if (keysPressed.current['ArrowDown']) {
        newVelocity += scrollSpeed;
      }
      if (keysPressed.current['ArrowUp']) {
        newVelocity -= scrollSpeed;
      }

      if (newVelocity !== 0) {
        window.scrollBy(0, newVelocity);
      }

      animationFrameId.current = requestAnimationFrame(scroll);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    animationFrameId.current = requestAnimationFrame(scroll);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') { // if enter or space is pressed
      e.preventDefault();
      scrollToSection(id);
    }
  };

  return (
    <>
      <canvas ref={canvasRef} />
      
      <nav>
        <a onClick={() => scrollToSection('hero')} onKeyDown={(e) => handleNavKeyDown(e, 'hero')} tabIndex={0} role="button">Home</a>
        <a onClick={() => scrollToSection('cs-projects')} onKeyDown={(e) => handleNavKeyDown(e, 'cs-projects')} tabIndex={0} role="button">CS</a>
        <a onClick={() => scrollToSection('max')} onKeyDown={(e) => handleNavKeyDown(e, 'max')} tabIndex={0} role="button">Max/MSP</a>
        <a onClick={() => scrollToSection('music')} onKeyDown={(e) => handleNavKeyDown(e, 'music')} tabIndex={0} role="button">Music</a>
        <a onClick={() => scrollToSection('contact')} onKeyDown={(e) => handleNavKeyDown(e, 'contact')} tabIndex={0} role="button">Contact</a>
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
          <h2 tabIndex={0}>CS Projects</h2>

          {/* CERN Research */}
          <div className="project">
            <h3>4D Scilicon Tracker Performance Characterization with ML</h3>
            <p className="project-meta">
              Research with <a href="https://home.cern" target="_blank" rel="noopener noreferrer" tabIndex={0}>European Organization for Nuclear Research (CERN)</a> | Advisor: <a href="https://vivo.brown.edu/display/gbarone1" target="_blank" rel="noopener noreferrer" tabIndex={0}>Prof. Gaetano Barone</a> | Jun 2025 - Present
            </p>
            <p>
              Developed a comprehensive system to characterize Low-Gain Avalanche Detector (LGAD) 
              performance under environmental stress factors using machine learning. Worked with post-docs 
              and grad students on data collection and detector manufacturing.
            </p>
            <p>
              See IEEE Poster <a href="https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy85ZTI4MTdmMDM4OTNkMjAxL0ViMFpsUTNTckhWQ3VOTkRuamdXazhVQlp3c0V3MTVpU3Nyc0NhcF9pUzVhcVE&cid=9E2817F03893D201&id=9E2817F03893D201%21s0d9519bdacd24275b8d3439e381693c5&parId=9E2817F03893D201%21s4d412fff098347cd8d3721c242bc02c6&o=OneUp" target="_blank" rel="noopener noreferrer" tabIndex={0}>here</a>.
            </p>
            <p>
              <strong>Key Contributions:</strong>
            </p>
            <ul style={{ textAlign: 'left', marginLeft: '2rem', color: 'var(--text-secondary)' }}>
              <li>Built a robust database management system with custom script language handling 400+ scan curves from 41 detectors</li>
              <li>Proposed and implemented RANSAC-based (RANdom SAmple Consensus) curve fitting and linear interpolation to achieve noise-robustness and better resolution in curve analysis</li>
              <li>Designed and trained conditional autoencoder to predict detector response across temperature, humidity, and bias voltage ranges</li>
              <li>Model predictions showed <InlineMath math="R^2 = 0.99" /> on linear correlation between breakdown voltage and temperature</li>
              <li>Model reconstructs training curves with <InlineMath math="RMSE = 0.090" /> and showed a low <InlineMath math="4.9\%" /> slope error compared to training data</li>
              <li>Research presented on <a href="https://indico.cern.ch/category/17387/" target="_blank" rel="noopener noreferrer" tabIndex={0}>CERN Detector Research and Development Working Group 2 (CERN DRD3 WG2)</a> Meeting in October 2025, and <a href="https://indico.global/event/14966/" target="_blank" rel="noopener noreferrer" tabIndex={0}>Coordinating Panel for Advanced Detectors (CPAD 2025)</a> at Penn</li>
            </ul>
            <p style={{ marginTop: '1rem' }}>
              <strong>Tech Stack:</strong> Python, PyTorch, RANSAC
            </p>
          </div>

          {/* DJMAX AI */}
          <div className="project" tabIndex={0}>
            <h3>DJMAX Rhythm Game AI Player</h3>
            <p className="project-meta">
              Term Project for Computer Vision | Team: Me, Jonie Nishimura, Tiffay Gao. | May 2025
            </p>
            <p>
              Built a real-time AI player for <a href="https://store.steampowered.com/app/960170/DJMAX_RESPECT_V/" target="_blank" rel="noopener noreferrer" tabIndex={0}><i>DJMAX Respect V</i></a>, a famous rhythm game, using deep learning in 2 weeks.
              The system outstrips average human performance, consistently scoring above 97% accuracy.
            </p>
            <p>
              <strong>My Contributions:</strong>
            </p>
            <ul style={{ textAlign: 'left', marginLeft: '2rem', color: 'var(--text-secondary)' }}>
              <li>Collected and curated 139,500 training frames through gameplay</li>
              <li>Customized ResNet18 + GRU backbone with modified pooling layers and track-specific feature map splitting to predict multi-track keypresses in the game</li>
              <li>Designed a dynamic loss function with moving average smoothing to model timing tolerance, transient emphasis to prioritize keypress predictions, and class imbalance handling for robust training</li>
              <li>Optimized model to run at ~45 FPS in real time with 97% average accuracy</li>
            </ul>
            <p style={{ marginTop: '1rem' }}>
              <strong>Demo Video:</strong>
            </p>
            <div className="video-container-inblock" style={{ aspectRatio: '1260 / 816' }}>
              <iframe 
                src="https://drive.google.com/file/d/1R4fXzo1rUxJgjgfUEzuSzTBLk3b6OEWm/preview" 
              >
              </iframe>
            </div>
            <p style={{ marginTop: '1rem', fontSize: 'var(--font-size-base)'}}>
                This video shows the AI playing the song "L" in real-time on a MacBook.
                The AI triggers the keys automatically without human input, 
                consistently catching fast paced notes with high accuracy, and breaks my personal record at the end.
            </p>
            <p style={{ marginTop: '1rem', fontSize: 'var(--font-size-base)'}}>
                More demos can be found on <a href="https://drive.google.com/drive/folders/1wsH6CuSxASzPQl1X4VYxtIIR43HAku2k?usp=share_link" target="_blank" rel="noopener noreferrer" tabIndex={0}>Google Drive</a>
            </p>
            <p style={{ marginTop: '1rem' }}>
              <strong>Tech Stack:</strong> Python, PyTorch, OpenCV, NumPy
            </p>
            <p>
              <strong>Team Roles:</strong> 
            </p>
            <p style={{ marginTop: '1rem', fontSize: 'var(--font-size-base)' }}>
              <strong>Lixing Wang (Me):</strong> Model architecture & loss function design, data collection pipeline (capture.py), dataset implementation (dataset.py), inference optimization, real-time gameplay testing.
              <br />
              <strong>Tiffany Gao:</strong> Model training & evaluation, core model implementation (model.py, train.py, test.py), video dataset class design, visualization & graphing.
              <br />
              <strong>Jonie Nishimura:</strong> Preprocessing functions (validation, trim_video), inference pipeline (play.py), TensorFlow-to-PyTorch conversion, poster design.
            </p>
          </div>
        </section>

        {/* MAX/MSP */}
        <section id="max">
          <h2>Max/MSP Patches</h2>
          <p>Creative signal processing and real-time audio manipulation tools built in Cycling '74 Max 9.</p>

          <div className="music-item">
            <h3>Multi-effect Delay Loop</h3>
            <p>
              This patch creates a multi-effect delay loop, allowing for intricate sound design and live performance manipulation. 
              It features a random sampling buffer, delay loop with overdrive and pitchshift feedback, stereo widening, and randomized EQ, creating a rich, evolving soundscape.
            </p>
            
            <p style={{ marginTop: '2rem', fontWeight: 600 }}>Patch Interface</p>
            <img
              src="/delay_loop_presentation.png"
              alt="Max Patch Multi-effect Delay Loop Presentation Mode Screenshot"
              style={{
                maxWidth: '80%',
                borderRadius: '12px',
                margin: '1rem 0',
              }}
            />
            <p style={{ marginTop: '2rem', fontWeight: 600 }}>Patch Implementation</p>
                        <img
              src="/delay_loop.png"
              alt="Max Patch Multi-effect Delay Loop Screenshot"
              style={{
                maxWidth: '80%',
                borderRadius: '12px',
                margin: '1rem 0',
              }}
            />

            <p style={{ marginTop: '2rem', fontWeight: 600 }}>Watch In Action</p>
            <div className="video-container" style={{ aspectRatio: '1672 / 1080'}}>
              <iframe
                src="https://drive.google.com/file/d/1-z8ZfuU9-QDBQ69xdH1rjrZAGeIns92v/preview"
              />
            </div>
          </div>
        </section>

        {/* MUSIC */}
        <section id="music">
          <h2 tabIndex={0}>Music Works</h2>

          {/* Featured Song */}
          <div className="music-item" tabIndex={0}>
            <h3 tabIndex={0}>Masquerade feat. KAFU</h3>
            <p className="project-meta">Latest Release | 2025</p>
            <p>
              My first vocaloid composition combining mysterious atmosphere with catchy synth melodies.
              I composed, produced, and created the music video entirely myself using Stable Diffusion
              for AI-generated artwork. 
            </p>
            <p>
              The song ranked 14th in <br /> <a href="https://www.bilibili.com/opus/1105740885194178560" target="_blank" rel="noopener noreferrer" tabIndex={0}>Bili_Board Vocaloid Weekly Charts (Week 24, August 27, 2025 - Issue 64).</a>
            </p>
            <p>
              <strong>Behind the Scenes:</strong> ~40 hours of production | Composition,  
              arrangement, mixing, music video creation, and visual effects.
            </p>
            <p style={{ fontSize: 'var(--font-size-sm)' }}> Click the play button at lower left corner to watch. Or click on the video directly to access on Bilibili.</p>
            <div className="video-container">
              <iframe
                src="//player.bilibili.com/player.html?isOutside=true&bvid=BV1q9YbzyEKd&cid=31789027319&p=1&autoplay=0"
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
            
            <h4 style={{ marginTop: '2rem', color: 'var(--accent-2)' }}><a href="https://open.spotify.com/album/5YcmMfCioLzhn9hN7e1Lxo" target="_blank" rel="noopener noreferrer">EVERWIND</a></h4>
            <p style={{ fontSize: 'var(--font-size-base)' }}>
              Japanese ACG-inspired electronic music (Kawaii Bass) with energetic synths and infectious beats.
              <br />
              Late 2024 to Early 2025 production.
            </p>
            <p style={{ fontSize: 'var(--font-size-sm)' }}> If the player doesn't load, click the pink title above to access on Spotify.</p>
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

            <h4 style={{ marginTop: '2rem', color: 'var(--accent-2)' }}><a href="https://open.spotify.com/album/1mhELS8TIXMlH8IzZ8DOyg" target="_blank" rel="noopener noreferrer">Telescope</a></h4>
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
              height="480" 
              frameBorder="0" 
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy">
            </iframe>

            <h4 style={{ marginTop: '2rem', color: 'var(--accent-2)' }}><a href="https://open.spotify.com/album/5h32lZHHXLd5nwsQsXr79J" target="_blank" rel="noopener noreferrer">Featured: Echoes of Summer</a></h4>
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
                src="//player.bilibili.com/player.html?isOutside=true&aid=560493183&bvid=BV19e4y1b7Jd&cid=836054901&p=1&autoplay=0"
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
              <strong>Skills:</strong> Composition, Arrangement, Production, Music Video Production, 
              Vocaloid Synthesis (CEVIO AI), Logic Pro
            </p>
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
              <p>PyTorch • Deep Learning • Computer Vision</p>
            </div>
            
            <div>
              <h3 style={{ color: 'var(--accent-1)', fontSize: 'var(--font-size-lg)' }}>Web & Tools</h3>
              <p>React • Next.js • Node.js • Git</p>
            </div>
            
            <div>
              <h3 style={{ color: 'var(--accent-1)', fontSize: 'var(--font-size-lg)' }}>Music Production</h3>
              <p>Composition • Production • CEVIO AI • Max/MSP • Logic</p>
            </div>
            
            <div>
              <h3 style={{ color: 'var(--accent-1)', fontSize: 'var(--font-size-lg)' }}>Math</h3>
              <p>Linear Algebra • Multivariable Calculus • Abstract Algebra • Analysis • Graph Theory</p>
            </div>
            
            <div>
              <h3 style={{ color: 'var(--accent-1)', fontSize: 'var(--font-size-lg)' }}>Courses Taken</h3>
              <p>Algorithm Design • Deep Learning • Real-time Music Systems • Software Engineering</p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <h2 tabIndex={0}>Let's Connect</h2>
          
          <div style={{ margin: '2rem 0' }}>
            <a href="mailto:lixing_wang@brown.edu" className="btn" tabIndex={0}>
              Email Me
            </a>
            <a href="/main.pdf" className="btn" tabIndex={0} target="_blank" rel="noopener noreferrer">
              Download Resume
            </a>
          </div>

          <div style={{ margin: '2rem 0', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <a href="https://github.com/lixing-w" target="_blank" rel="noopener noreferrer" tabIndex={0}>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/lixing-wang-b11a852b0/" target="_blank" rel="noopener noreferrer" tabIndex={0}>
              LinkedIn
            </a>
            <a href="https://space.bilibili.com/80270727" target="_blank" rel="noopener noreferrer" tabIndex={0}>
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
