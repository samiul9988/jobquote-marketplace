import React from 'react';
import { FacebookIcon, InstagramIcon, TwitterIcon } from '../common/SocialIcons';

export default function TeamCard({ member }) {
  return (
    <div
      className="paintters-card team-card"
      style={{
        overflow: 'hidden',
        textAlign: 'center',
        paddingBottom: '24px'
      }}
    >
      <div style={{ position: 'relative', height: '280px', overflow: 'hidden', marginBottom: '20px' }}>
        <img
          src={member.image}
          alt={member.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="team-img"
        />

        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(18, 30, 40, 0.85)',
            color: '#FFFFFF',
            padding: '4px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: '700',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(4px)'
          }}
        >
          {member.experience}
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-text-main)', marginBottom: '4px' }}>
          {member.name}
        </h4>
        <p style={{ fontSize: '13px', color: 'var(--color-primary)', fontWeight: '600', marginBottom: '16px' }}>
          {member.role}
        </p>

        {/* Socials */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {[FacebookIcon, InstagramIcon, TwitterIcon].map((IconComp, idx) => (
            <a
              key={idx}
              href="#team"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-light)',
                color: 'var(--color-text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-light)';
                e.currentTarget.style.color = 'var(--color-text-muted)';
              }}
            >
              <IconComp size={14} />
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .team-card:hover .team-img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
}
