import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogCard({ post, onReadMore }) {
  return (
    <div
      className="paintters-card blog-card"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="blog-img"
        />
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            backgroundColor: 'var(--color-primary)',
            color: '#FFFFFF',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase'
          }}
        >
          {post.category}
        </div>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} color="var(--color-primary)" />
              {post.date}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <User size={13} color="var(--color-primary)" />
              {post.author}
            </span>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-text-main)', lineHeight: '1.4', marginBottom: '10px' }}>
            {post.title}
          </h3>

          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
            {post.summary}
          </p>
        </div>

        <button
          onClick={() => onReadMore(post)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-primary)',
            fontSize: '14px',
            fontWeight: '700',
            paddingTop: '14px',
            borderTop: '1px solid var(--color-border)',
            width: '100%'
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-primary-hover)')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
        >
          <span>Read Full Article</span>
          <ArrowRight size={15} />
        </button>
      </div>

      <style>{`
        .blog-card:hover .blog-img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
}
