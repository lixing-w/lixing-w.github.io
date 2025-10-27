interface Polygon {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRotation: number;
  useColorIndex: number; // either 0, 1, 2, or 3
  color: string;
  nextColor: string;
  interpolatedColor: string;
}

interface ColorPalette {
  first: string;
  second: string;
  third: string;
  forth: string;
}

export default class MorphingBackground {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private polygons: Polygon[] = [];
  private animationId: number | null = null;
  private scrollPosition: number = 0;
  private isDarkMode: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  private mediaQueryList: MediaQueryList | null = null;
  
  private palettes: string[][] = [
    ['#E62727', '#F3F2EC', '#DCDCDC', '#1E93AB'],    
    ['#E62727', '#F3F2EC', '#DCDCDC', '#1E93AB'],   
    ['#FF90BB', '#FFC1DA', '#F8F8E1', '#8ACCD5'],    
    ['#9ECAD6', '#748DAE', '#F5CBCB', '#FFEAEA'], 
  ];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    
    this.resizeCanvas();
    this.initPolygons();
    this.setupScrollListener();
    this.setupThemeListener();
    this.animate();
  }

  private resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
  }
  
  private distributeBipolar(): number {
    const edgeBias = Math.random();
    return edgeBias < 0.5 
      ? Math.random() * 0.3  // Left edge (0-30% of width)
      : 0.7 + Math.random() * 0.3;  // Right edge (70-100% of width)
  }
  private initPolygons() {
    const numOfPolygons = 6; // number of polygons
    const numOfPalettes = this.palettes.length;
    for (let i = 0; i < numOfPolygons; i++) {
      const useColorIndex = i % numOfPalettes; // Cycle through color indices
      this.polygons.push({
        // Bipolar distribution: bias x towards left and right edges
        x: this.distributeBipolar() * this.canvas.width,
        y: this.distributeBipolar() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 800 + Math.random() * 200,
        rotation: Math.random() * Math.PI * 2,
        vRotation: (Math.random() - 0.5) * 0.001,
        useColorIndex: useColorIndex,
        color: this.palettes[0][useColorIndex],
        nextColor: this.palettes[1][useColorIndex],
        interpolatedColor: this.palettes[0][useColorIndex], // Initial color
      });
    }
  }

  private setupScrollListener() {
    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      this.scrollPosition = window.scrollY;
      
      // what's the location of CS projects title?
      const csProjectsTitle = document.getElementById('cs-projects');
      const musicTitle = document.getElementById('music');
      const maxTitle = document.getElementById('max');
      const csProjectsOffset = csProjectsTitle!.offsetTop;
      const musicOffset = musicTitle!.offsetTop;
      const maxOffset = maxTitle!.offsetTop;
      // which section we are in? interpolate progress within section
      let sectionIndex = 0;
      let sectionProgress = 0; // initial position
      if (this.scrollPosition < csProjectsOffset) {
        sectionIndex = 0;
        sectionProgress = this.scrollPosition / csProjectsOffset;
      } else if (this.scrollPosition >= csProjectsOffset && this.scrollPosition < musicOffset) {
        sectionIndex = 1;
        sectionProgress = (this.scrollPosition - csProjectsOffset) / (musicOffset - csProjectsOffset);
      } else if (this.scrollPosition >= musicOffset && this.scrollPosition < maxOffset) {
        sectionIndex = 2;
        sectionProgress = (this.scrollPosition - musicOffset) / (maxOffset - musicOffset);
      } else if (this.scrollPosition >= maxOffset) {
        sectionIndex = 3;
        sectionProgress = (this.scrollPosition - maxOffset) / (documentHeight - maxOffset);
      }
      
      // Map section progress to interpolation range (60% to 75%)
      const interpolationStart = 0.60;
      const interpolationEnd = 0.75;
      let interpolationProgress = 0;
      
      if (sectionProgress < interpolationStart) {
        interpolationProgress = 0; // Before 60%, stay at start color
      } else if (sectionProgress >= interpolationEnd) {
        interpolationProgress = 1; // At or after 75%, stay at end color
      } else {
        // Map 60%-75% range to 0-1
        interpolationProgress = (sectionProgress - interpolationStart) / (interpolationEnd - interpolationStart);
      }
      
      // Update polygon target colors based on scroll position
      this.polygons.forEach((polygon) => {
        const howManyPalettes = this.palettes.length;
        polygon.color = this.palettes[sectionIndex % howManyPalettes][polygon.useColorIndex];
        polygon.nextColor = this.palettes[(sectionIndex + 1) % howManyPalettes][polygon.useColorIndex];
        console.log(sectionIndex, sectionProgress);
        polygon.interpolatedColor = this.lerpColor(polygon.color, polygon.nextColor, interpolationProgress);
      });
    });
  }

  private lerpColor(from: string, to: string, t: number): string {
    const fromRgb = this.hexToRgb(from);
    const toRgb = this.hexToRgb(to);
    
    const r = Math.round(fromRgb.r + (toRgb.r - fromRgb.r) * t);
    const g = Math.round(fromRgb.g + (toRgb.g - fromRgb.g) * t);
    const b = Math.round(fromRgb.b + (toRgb.b - fromRgb.b) * t);
    
    return `rgb(${r}, ${g}, ${b})`;
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    // Ensure hex is valid and remove # if present
    hex = hex.replace('#', '').trim();
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : { r: 0, g: 0, b: 0 };
  }

  private rgbStringToRgb(rgbString: string): { r: number; g: number; b: number } {
    const result = /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/i.exec(rgbString);
    return result ? {
      r: parseInt(result[1], 10),
      g: parseInt(result[2], 10),
      b: parseInt(result[3], 10),
    } : { r: 0, g: 0, b: 0 };
  }

  private rgbToGray(from: string): string {
    const rgb = this.rgbStringToRgb(from);
    const gray = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
    return `rgb(${gray}, ${gray}, ${gray})`;
  }

  private hexToGray(hex: string): string {
    const rgb = this.hexToRgb(hex);
    const gray = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
    return `rgb(${gray}, ${gray}, ${gray})`;
  }

  private drawPolygon(polygon: Polygon) {
    const sides = 3;
    
    this.ctx.save();
    this.ctx.translate(polygon.x, polygon.y);
    this.ctx.rotate(polygon.rotation);

    if (!this.isDarkMode) {
      this.ctx.fillStyle = polygon.interpolatedColor; // draw with interpolated color
    } else {
      this.ctx.fillStyle = this.hexToGray(this.palettes[0][polygon.useColorIndex]); // fixed gray color for dark mode
    }
    this.ctx.globalAlpha = 0.1;
    
    this.ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2;
      const x = Math.cos(angle) * polygon.size;
      const y = Math.sin(angle) * polygon.size;
      i === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
    }
    this.ctx.closePath();
    this.ctx.fill();
    
    this.ctx.restore();
  }

  private updatePolygons() {
    this.polygons.forEach((polygon) => {
      polygon.x += polygon.vx;
      polygon.y += polygon.vy;
      polygon.rotation += polygon.vRotation;
      
      // if hit boundary, move back
      if (polygon.x < -200) polygon.vx = -polygon.vx;
      if (polygon.x > this.canvas.width + 200) polygon.vx = -polygon.vx;
      if (polygon.y < -200) polygon.vy = -polygon.vy;
      if (polygon.y > this.canvas.height + 200) polygon.vy = -polygon.vy;
    });
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background plain color
    // if dark mode?
    if (!this.isDarkMode) {
      this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    } else {
      this.ctx.fillStyle = 'rgba(12, 12, 12, 1)';
    }
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.updatePolygons();
    this.polygons.forEach((polygon) => this.drawPolygon(polygon));
    
    this.animationId = requestAnimationFrame(this.animate);
  };

  private setupThemeListener() {
    this.mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQueryList.addListener((e) => {
      this.isDarkMode = e.matches;
    });
  }

  public destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.mediaQueryList) {
      this.mediaQueryList.removeListener((e) => {
        this.isDarkMode = e.matches;
      });
    }
  }
}
