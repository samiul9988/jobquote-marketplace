import React from 'react';
import Modal from '../common/Modal';

export default function VideoModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Watch Paintters in Action" maxWidth="750px">
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
        <iframe
          src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0"
          title="Paintters Video"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p style={{ marginTop: '16px', fontSize: '13px', color: 'var(--color-text-muted)', textAlign: 'center' }}>
        Discover how our certified team delivers immaculate, streak-free finishes with minimal disruption.
      </p>
    </Modal>
  );
}
