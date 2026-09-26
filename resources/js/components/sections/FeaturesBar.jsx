import { usePage } from '@inertiajs/react';
import React from 'react';
import FeatureCard from '../cards/FeatureCard';
import ScrollReveal from '../common/ScrollReveal';
import { features } from '../../data/siteData';

export default function FeaturesBar() {
  const { settings = {} } = usePage().props;
  const dynFeatures = [1,2,3,4].map(n => ({
    id: n,
    icon: settings[`home_feature${n}_icon`] || (features[n-1] ? features[n-1].icon : ''),
    title: settings[`home_feature${n}_title`] || (features[n-1] ? features[n-1].title : ''),
    description: settings[`home_feature${n}_desc`] || (features[n-1] ? features[n-1].description : ''),
  }));
  return (
    <section
      style={{
        marginTop: '-40px',
        position: 'relative',
        zIndex: 30,
        marginBottom: '60px'
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px'
          }}
          className="dynFeatures-grid"
        >
          {dynFeatures.map((feat, idx) => (
            <ScrollReveal key={feat.id} animation="fade-up" delay={idx * 120}>
              <FeatureCard
                icon={feat.icon}
                title={feat.title}
                description={feat.description}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .dynFeatures-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .dynFeatures-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
