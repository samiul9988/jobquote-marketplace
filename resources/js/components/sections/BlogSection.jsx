import React, { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import BlogCard from '../cards/BlogCard';
import Modal from '../common/Modal';
import { blogPosts } from '../../data/siteData';
import { Calendar, User } from 'lucide-react';

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section
      id="blog"
      style={{
        padding: '100px 0 160px 0',
        backgroundColor: '#FFFFFF'
      }}
    >
      <div className="container-custom">
        <SectionHeader
          badge="Latest News & Insights"
          title="Expert Painting Tips & Inspiration"
          description="Stay updated with professional color advice, seasonal weatherproofing techniques, and surface prep secrets."
          align="center"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px'
          }}
          className="blog-grid"
        >
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onReadMore={(p) => setSelectedPost(p)}
            />
          ))}
        </div>

        {/* Blog Article Reader Modal */}
        <Modal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          title={selectedPost?.title || 'Article'}
          maxWidth="700px"
        >
          {selectedPost && (
            <div>
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                style={{
                  width: '100%',
                  height: '280px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '20px'
                }}
              />
              <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} color="var(--color-primary)" />
                  {selectedPost.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={14} color="var(--color-primary)" />
                  By {selectedPost.author}
                </span>
              </div>
              <p style={{ fontSize: '15px', color: 'var(--color-text-main)', lineHeight: '1.8', marginBottom: '16px' }}>
                {selectedPost.summary}
              </p>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
                When planning a major painting overhaul, starting with proper surface cleaning and moisture testing is paramount. High-quality paints will adhere smoothly and retain their luster for years when supported by the right primer and skilled application technique.
              </p>
            </div>
          )}
        </Modal>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .blog-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
