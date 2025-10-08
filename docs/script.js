// Auto-detect user's operating system and update download button
document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('download-btn');
  const osName = document.getElementById('os-name');
  
  // Get user agent
  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform.toLowerCase();
  
  let detectedOS = 'Unknown';
  let downloadUrl = 'https://github.com/Manuel-Mezzanotte/AnimeWeek-2.0/releases/latest';
  
  // Detect macOS
  if (userAgent.includes('mac') || platform.includes('mac')) {
    detectedOS = 'macOS';
    downloadUrl = 'https://github.com/Manuel-Mezzanotte/AnimeWeek-2.0/releases/download/v2.0.0/AnimeWeek-2.0.0-arm64.dmg';
  }
  // Detect Windows
  else if (userAgent.includes('win') || platform.includes('win')) {
    detectedOS = 'Windows';
    downloadUrl = 'https://github.com/Manuel-Mezzanotte/AnimeWeek-2.0/releases/download/v2.0.0/AnimeWeek.Setup.2.0.0.exe';
  }
  // Detect Linux (fallback to GitHub releases page)
  else if (userAgent.includes('linux') || platform.includes('linux')) {
    detectedOS = 'Linux';
    downloadUrl = 'https://github.com/Manuel-Mezzanotte/AnimeWeek-2.0/releases/latest';
  }
  
  // Update button text and link
  if (osName) {
    osName.textContent = detectedOS;
  }
  
  if (downloadBtn) {
    downloadBtn.href = downloadUrl;
    
    // Track download clicks (optional - can integrate with analytics later)
    downloadBtn.addEventListener('click', () => {
      console.log(`Download initiated for ${detectedOS}`);
      
      // Optional: Add Google Analytics event tracking here
      // gtag('event', 'download', {
      //   'event_category': 'Downloads',
      //   'event_label': detectedOS,
      //   'value': 1
      // });
    });
  }
  
  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Animation on scroll - DISABLED for cleaner experience
  /*
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe feature cards
  document.querySelectorAll('.feature-card, .download-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
  */
});

// Parallax effect - DISABLED for cleaner experience
/*
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});
*/

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
  // Press 'D' to trigger download
  if (e.key === 'd' || e.key === 'D') {
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn && !e.ctrlKey && !e.metaKey) {
      downloadBtn.click();
    }
  }
});
