import { usePage } from '@inertiajs/react';
import React from 'react';
import { MapPin, Mail, Clock } from 'lucide-react';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '../common/SocialIcons';
import { siteInfo } from '../../data/siteData';

export default function TopBar() {
  const { settings = {} } = usePage().props;
  return (
    <div
      style={{
        backgroundColor: 'var(--color-dark)',
        color: '#A0B1C0',
        fontSize: '13px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '10px 0'
      }}
    >
      <div className="container-custom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        
        {/* Left: Address & Email */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={14} color="var(--color-primary)" />
            <span>{(settings.location || siteInfo.address)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={14} color="var(--color-primary)" />
            <a href={`mailto:${(settings.email || siteInfo.email)}`} style={{ color: '#A0B1C0' }} onMouseOver={(e) => e.target.style.color = '#FFF'} onMouseOut={(e) => e.target.style.color = '#A0B1C0'}>
              {(settings.email || siteInfo.email)}
            </a>
          </div>
        </div>

        {/* Right: Working Hours & Socials */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={14} color="var(--color-primary)" />
            <span>{siteInfo.workingHours}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href={siteInfo.socialLinks.facebook} target="_blank" rel="noreferrer" style={{ color: '#A0B1C0', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}>
              <FacebookIcon size={14} />
            </a>
            <a href={siteInfo.socialLinks.instagram} target="_blank" rel="noreferrer" style={{ color: '#A0B1C0', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}>
              <InstagramIcon size={14} />
            </a>
            <a href={siteInfo.socialLinks.twitter} target="_blank" rel="noreferrer" style={{ color: '#A0B1C0', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}>
              <TwitterIcon size={14} />
            </a>
            <a href={siteInfo.socialLinks.youtube} target="_blank" rel="noreferrer" style={{ color: '#A0B1C0', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}>
              <YoutubeIcon size={14} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
