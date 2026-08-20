import React from 'react';
import SectionHeader from '../common/SectionHeader';
import TeamCard from '../cards/TeamCard';
import { teamMembers } from '../../data/siteData';

export default function TeamSection() {
  return (
    <section
      id="team"
      style={{
        padding: '100px 0',
        backgroundColor: '#FFFFFF'
      }}
    >
      <div className="container-custom">
        <SectionHeader
          badge="Expert Team"
          title="Meet Our Professional Painters"
          description="Dedicated craftsmen with extensive training, meticulous attention to detail, and a passion for perfect finishes."
          align="center"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px'
          }}
          className="team-grid"
        >
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .team-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
