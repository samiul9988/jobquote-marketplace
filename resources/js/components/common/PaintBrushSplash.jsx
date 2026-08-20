import React from 'react';

export function PaintBrushSplashBox({ children, className = '' }) {
  return (
    <div
      className={`brush-splash-card-wrapper ${className}`}
      style={{
        position: 'relative',
        maxWidth: '540px',
        width: '100%',
        margin: '0 auto',
        padding: '75px 50px 70px 50px',
        textAlign: 'center',
        zIndex: 10
      }}
    >
      {/* Authentic Artsy Paint Brush Stroke SVG with Organic Filter & Bristles */}
      <svg
        viewBox="0 0 600 650"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          filter: 'drop-shadow(0 18px 40px rgba(0, 0, 0, 0.16))',
          pointerEvents: 'none'
        }}
      >
        <defs>
          {/* Organic paint edge turbulence filter for natural artsy torn-brush edges */}
          <filter id="paintBrushEdgeFilter" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feMerge>
              <feMergeNode in="displaced" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Group with Paint Edge Filter */}
        <g fill="#FFFFFF" filter="url(#paintBrushEdgeFilter)">
          {/* Core Solid Paint Area */}
          <path d="
            M 110,90 
            C 180,65, 320,60, 490,85 
            C 530,170, 545,300, 520,440 
            C 505,500, 480,545, 410,555 
            C 330,570, 240,560, 160,545 
            C 100,530, 75,460, 70,360 
            C 65,240, 80,140, 110,90 
            Z
          " />

          {/* TOP BRUSH STROKES & DENSE BRISTLES */}
          <path d="M 85,90 L 100,35 L 115,80 L 130,25 L 145,75 L 165,15 L 180,65 L 205,30 L 220,75 L 245,20 L 265,65 L 290,10 L 315,60 L 340,15 L 360,65 L 385,25 L 405,75 L 430,35 L 450,80 L 475,40 L 495,95 Z" />
          <path d="M 135,40 L 142,10 L 150,45 Z" />
          <path d="M 195,25 L 202,0 L 210,30 Z" />
          <path d="M 265,20 L 272,-5 L 280,25 Z" />
          <path d="M 335,20 L 342,0 L 350,25 Z" />
          <path d="M 405,30 L 412,5 L 420,35 Z" />
          <path d="M 465,45 L 472,15 L 480,50 Z" />

          {/* RIGHT BRUSH STROKES & DRY BRISTLES */}
          <path d="M 485,90 L 535,100 L 500,125 L 555,140 L 510,165 L 570,185 L 515,215 L 585,240 L 525,270 L 590,305 L 530,340 L 585,375 L 525,410 L 570,445 L 515,480 L 555,515 L 495,540 Z" />
          <path d="M 530,135 L 580,145 L 535,155 Z" />
          <path d="M 545,205 L 600,218 L 550,230 Z" />
          <path d="M 550,275 L 605,290 L 555,300 Z" />
          <path d="M 545,350 L 595,365 L 550,375 Z" />
          <path d="M 535,425 L 585,440 L 540,450 Z" />

          {/* BOTTOM BRUSH STROKES & DRIPS */}
          <path d="M 495,535 L 515,595 L 480,560 L 460,620 L 435,575 L 410,635 L 385,580 L 355,650 L 330,585 L 300,660 L 275,585 L 245,645 L 220,580 L 190,635 L 170,570 L 140,615 L 120,560 L 95,590 L 85,530 Z" />
          <path d="M 430,590 L 438,645 L 446,595 Z" />
          <path d="M 350,610 L 358,665 L 366,615 Z" />
          <path d="M 270,610 L 278,665 L 286,615 Z" />
          <path d="M 190,590 L 198,645 L 206,595 Z" />

          {/* LEFT BRUSH STROKES & SIDE BRISTLES */}
          <path d="M 110,95 L 60,110 L 100,135 L 45,160 L 95,190 L 30,220 L 85,250 L 15,285 L 75,320 L 10,355 L 70,390 L 25,425 L 80,460 L 35,495 L 90,525 L 55,550 L 105,545 Z" />
          <path d="M 75,150 L 20,165 L 70,175 Z" />
          <path d="M 60,225 L 5,240 L 55,250 Z" />
          <path d="M 50,300 L -2,315 L 45,325 Z" />
          <path d="M 55,375 L 2,390 L 50,400 Z" />
          <path d="M 65,450 L 15,465 L 60,475 Z" />
        </g>

        {/* Fine Artistic Brush Bristles Lines (Extra Artsy Texture) */}
        <g stroke="#FFFFFF" strokeLinecap="round">
          <line x1="140" y1="50" x2="155" y2="10" strokeWidth="4" />
          <line x1="210" y1="40" x2="225" y2="5" strokeWidth="5" />
          <line x1="280" y1="30" x2="295" y2="0" strokeWidth="6" />
          <line x1="350" y1="35" x2="365" y2="5" strokeWidth="5" />
          <line x1="420" y1="45" x2="435" y2="15" strokeWidth="4" />

          <line x1="520" y1="170" x2="575" y2="185" strokeWidth="4" />
          <line x1="535" y1="240" x2="595" y2="255" strokeWidth="5" />
          <line x1="540" y1="310" x2="600" y2="325" strokeWidth="6" />
          <line x1="530" y1="380" x2="590" y2="395" strokeWidth="5" />
          <line x1="515" y1="450" x2="570" y2="465" strokeWidth="4" />

          <line x1="420" y1="580" x2="435" y2="635" strokeWidth="4" />
          <line x1="340" y1="600" x2="355" y2="655" strokeWidth="5" />
          <line x1="260" y1="600" x2="275" y2="655" strokeWidth="5" />
          <line x1="180" y1="580" x2="195" y2="635" strokeWidth="4" />

          <line x1="75" y1="180" x2="20" y2="195" strokeWidth="4" />
          <line x1="60" y1="255" x2="5" y2="270" strokeWidth="5" />
          <line x1="55" y1="330" x2="0" y2="345" strokeWidth="6" />
          <line x1="65" y1="405" x2="10" y2="420" strokeWidth="5" />
          <line x1="80" y1="475" x2="30" y2="490" strokeWidth="4" />
        </g>

        {/* Dynamic Paint Splatters & Dots */}
        <g fill="#FFFFFF">
          <circle cx="95" cy="25" r="3.5" />
          <circle cx="165" cy="5" r="4.5" />
          <circle cx="240" cy="-2" r="4" />
          <circle cx="310" cy="-8" r="5" />
          <circle cx="385" cy="2" r="4.5" />
          <circle cx="455" cy="12" r="4" />
          <circle cx="510" cy="35" r="3.5" />

          <circle cx="585" cy="125" r="4" />
          <circle cx="605" cy="205" r="5" />
          <circle cx="610" cy="285" r="4.5" />
          <circle cx="600" cy="365" r="4" />
          <circle cx="585" cy="440" r="3.5" />
          <circle cx="550" cy="520" r="4.5" />

          <circle cx="490" cy="620" r="4" />
          <circle cx="420" cy="650" r="4.5" />
          <circle cx="340" cy="670" r="5.5" />
          <circle cx="260" cy="670" r="5" />
          <circle cx="180" cy="650" r="4" />
          <circle cx="110" cy="620" r="3.5" />

          <circle cx="15" cy="150" r="4" />
          <circle cx="-5" cy="235" r="5" />
          <circle cx="-8" cy="320" r="4.5" />
          <circle cx="0" cy="405" r="4" />
          <circle cx="20" cy="485" r="3.5" />
        </g>
      </svg>

      {/* Content strictly centered inside brush area */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {children}
      </div>
    </div>
  );
}

export function BottomBrushDivider() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        lineHeight: 0,
        zIndex: 5,
        pointerEvents: 'none'
      }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: '65px',
          display: 'block'
        }}
        fill="#FFFFFF"
      >
        <path d="
          M0,120 L1200,120 L1200,60 
          C1150,20 1100,70 1050,40 
          C1000,80 950,20 900,60 
          C850,30 800,70 750,45 
          C700,80 650,25 600,60 
          C550,35 500,75 450,40 
          C400,80 350,20 300,55 
          C250,30 200,70 150,40 
          C100,80 50,30 0,65 
          Z
        "/>
        <polygon points="1200,60 1180,10 1160,50 1140,20 1120,60 1100,15 1080,55 1060,25 1040,65 1020,10 1000,50 980,20 960,60 940,15 920,55 900,25 880,65 860,10 840,50 820,20 800,60 780,15 760,55 740,25 720,65 700,10 680,50 660,20 640,60 620,15 600,55 580,25 560,65 540,10 520,50 500,20 480,60 460,15 440,55 420,25 400,65 380,10 360,50 340,20 320,60 300,15 280,55 260,25 240,65 220,10 200,50 180,20 160,60 140,15 120,55 100,25 80,65 60,10 40,50 20,20 0,65 0,120 1200,120" />
      </svg>
    </div>
  );
}
