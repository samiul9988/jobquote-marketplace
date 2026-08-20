import React from 'react';
import { ZoomIn, MapPin, User } from 'lucide-react';

export default function ProjectCard({ project, onOpenLightbox }) {
  return (
    <div
      className="paintters-card project-card"
      style={{
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative'
      }}
      onClick={() => onOpenLightbox(project)}
    >
      <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="project-img"
        />

        {/* Hover Overlay */}
        <div
          className="project-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(10, 30, 20, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            backdropFilter: 'blur(3px)'
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <ZoomIn size={22} />
          </div>
        </div>

        {/* Category Tag */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            backgroundColor: 'rgba(18, 30, 40, 0.85)',
            color: '#FFFFFF',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            backdropFilter: 'blur(4px)'
          }}
        >
          {project.category}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-text-main)', marginBottom: '8px' }}>
          {project.title}
        </h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--color-text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <User size={13} color="var(--color-primary)" />
            {project.client}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={13} color="var(--color-primary)" />
            {project.location}
          </span>
        </div>
      </div>

      <style>{`
        .project-card:hover .project-img {
          transform: scale(1.08);
        }
        .project-card:hover .project-overlay {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
