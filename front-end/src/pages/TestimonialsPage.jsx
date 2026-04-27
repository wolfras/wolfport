// src/pages/TestimonialsPage.jsx
import React from 'react';

const TestimonialsPage = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Elissa Ntihinduka',
      role: 'Full Stack Developer, TechSolutions',
      text: 'Working with Wolfras was an absolute pleasure. His ability to translate complex ideas into clean, performant solutions is world-class.'
    },
    {
      id: 2,
      name: 'Uwimana Yassin',
      role: 'Lead Designer, CreativeFlow',
      text: "WolfPort's design system and animations brought our brand to life. The attention to detail is unmatched."
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-number">04</span>
          <h2>Testimonials</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-text">"{testimonial.text}"</div>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPage;