import React from 'react';
import SectionHeader from '../common/SectionHeader';
import PricingCard from '../cards/PricingCard';
import { pricingPlans } from '../../data/siteData';

export default function PricingSection({ onSelectPlan }) {
  return (
    <section
      id="pricing"
      style={{
        padding: '100px 0',
        backgroundColor: '#FFFFFF'
      }}
    >
      <div className="container-custom">
        <SectionHeader
          badge="Pricing Plans"
          title="Affordable & Transparent Painting Packages"
          description="Choose a package that fits your home or commercial space. All plans include full surface preparation and post-job clean-up."
          align="center"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px',
            alignItems: 'stretch'
          }}
          className="pricing-grid"
        >
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelectPlan={onSelectPlan}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .pricing-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
