import { useState } from 'react';
import { Package, BarChart3, Bell, Users, Upload, Shield, ChevronDown, ChevronUp, Play, Check, Star, ArrowRight } from 'lucide-react';
import './LandingPage.css';

function LandingPage({ onGetStarted }) {
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    { icon: <Package size={24} />, title: 'Real-time Tracking', desc: 'Track stock levels in real-time and get instant updates.' },
    { icon: <Bell size={24} />, title: 'Low Stock Alerts', desc: 'Get notified before stock runs out so you never miss a sale.' },
    { icon: <BarChart3 size={24} />, title: 'Powerful Reports', desc: 'Make data-driven decisions with advanced analytics.' },
    { icon: <Users size={24} />, title: 'Multi-user Access', desc: 'Manage permissions and work as a team seamlessly.' },
    { icon: <Upload size={24} />, title: 'Easy Import / Export', desc: 'Import or export your data with just a few clicks.' },
    { icon: <Shield size={24} />, title: 'Secure & Reliable', desc: 'Your data is safe with enterprise-grade security.' },
  ];

  const pricing = [
    { name: 'Free', price: '$0', period: '/month', features: ['Up to 50 products', '1 user', 'Basic reports', 'Email support'], cta: 'Get Started Free', popular: false },
    { name: 'Pro', price: '$29', period: '/month', features: ['Up to 5,000 products', '5 users', 'Advanced reports', 'Low stock alerts', 'Priority support'], cta: 'Start Pro Trial', popular: true },
    { name: 'Enterprise', price: '$99', period: '/month', features: ['Unlimited products', 'Unlimited users', 'Custom reports', 'API access', 'Dedicated account manager', '24/7 phone support'], cta: 'Contact Sales', popular: false },
  ];

  const steps = [
    { num: '1', title: 'Sign Up', desc: 'Create your free account in seconds with Google sign-in.' },
    { num: '2', title: 'Add Products', desc: 'Import your inventory or add products manually with categories.' },
    { num: '3', title: 'Track & Manage', desc: 'Monitor stock levels, set alerts, and manage orders from your dashboard.' },
    { num: '4', title: 'Grow Your Business', desc: 'Use reports and insights to optimize stock and reduce losses.' },
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Owner, TechGadgets Store', text: 'DukanStore transformed how we manage inventory. We reduced stockouts by 80% in the first month!', rating: 5 },
    { name: 'Michael Chen', role: 'Operations Manager, FreshMart', text: 'The real-time alerts saved us thousands. We never run out of bestsellers anymore.', rating: 5 },
    { name: 'Emily Rodriguez', role: 'Founder, Crafts & Co', text: 'Finally an inventory tool that\'s simple enough for my small team but powerful enough to scale.', rating: 5 },
    { name: 'David Kim', role: 'Supply Chain Lead, AutoParts Pro', text: 'The reporting features give us insights we never had before. Game changer for our operations.', rating: 5 },
    { name: 'Lisa Thompson', role: 'CEO, BeautyBox', text: 'We switched from spreadsheets to DukanStore and saved 15 hours per week on inventory management.', rating: 5 },
    { name: 'James Wilson', role: 'Warehouse Manager, SportZone', text: 'Multi-user access means my whole team stays in sync. No more miscommunication about stock levels.', rating: 4 },
  ];

  const faqs = [
    { q: 'Is there a free plan available?', a: 'Yes! Our free plan supports up to 50 products and 1 user. No credit card required to get started.' },
    { q: 'Can I import my existing inventory data?', a: 'Absolutely. You can import data via CSV or Excel files. We also support direct integration with popular e-commerce platforms.' },
    { q: 'How does the low stock alert work?', a: 'You set custom thresholds for each product. When stock drops below your threshold, you get notified via email and in-app notifications instantly.' },
    { q: 'Is my data secure?', a: 'Yes. We use enterprise-grade encryption, regular backups, and comply with industry security standards to keep your data safe.' },
    { q: 'Can I cancel my subscription anytime?', a: 'Yes, you can cancel anytime with no penalties. Your data remains accessible for 30 days after cancellation.' },
    { q: 'Do you offer customer support?', a: 'All plans include email support. Pro plans get priority support, and Enterprise plans include 24/7 phone support with a dedicated account manager.' },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-logo">
            <Package size={28} color="#3b82f6" />
            <div>
              <span className="landing-logo-text">DukanStore</span>
              <span className="landing-logo-sub">Inventory</span>
            </div>
          </div>
          <div className="landing-nav-links">
            <button onClick={() => scrollToSection('features')}>Features</button>
            <button onClick={() => scrollToSection('pricing')}>Pricing</button>
            <button onClick={() => scrollToSection('how-it-works')}>How It Works</button>
            <button onClick={() => scrollToSection('testimonials')}>Testimonials</button>
            <button onClick={() => scrollToSection('faq')}>FAQ</button>
          </div>
          <div className="landing-nav-actions">
            <button className="landing-btn-outline" onClick={onGetStarted}>Log In</button>
            <button className="landing-btn-primary" onClick={onGetStarted}>Get Started Free</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <span className="landing-badge">✨ Smart Inventory Management</span>
          <h1>Track. Manage.<br /><span className="text-blue">Grow Your Inventory</span></h1>
          <p>DukanStore Inventory helps you take control of your stock, reduce losses, and streamline your business operations from one powerful dashboard.</p>
          <div className="landing-hero-btns">
            <button className="landing-btn-primary landing-btn-lg" onClick={onGetStarted}>Get Started Free</button>
            <button className="landing-btn-ghost landing-btn-lg"><Play size={16} /> Watch Demo</button>
          </div>
          <div className="landing-hero-trust">
            <span>✓ No Credit Card Required</span>
            <span>✓ Easy Setup</span>
            <span>✓ Cancel Anytime</span>
          </div>
        </div>
        <div className="landing-hero-image">
          <img src="/dashboard-preview.png" alt="DukanStore Dashboard" />
        </div>
      </section>

      {/* Features */}
      <section className="landing-section" id="features">
        <h2 className="landing-section-title">Everything you need to manage inventory smarter</h2>
        <div className="landing-features-grid">
          {features.map((f, i) => (
            <div className="landing-feature-card" key={i}>
              <div className="landing-feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="landing-stats-bar">
          <div className="landing-stat"><span>10,000+</span><p>Happy Users</p></div>
          <div className="landing-stat"><span>500K+</span><p>Products Managed</p></div>
          <div className="landing-stat"><span>99.9%</span><p>Uptime</p></div>
          <div className="landing-stat"><span>24/7</span><p>Customer Support</p></div>
        </div>
      </section>

      {/* Pricing */}
      <section className="landing-section landing-section-gray" id="pricing">
        <h2 className="landing-section-title">Simple, transparent pricing</h2>
        <p className="landing-section-subtitle">Choose the plan that fits your business. Upgrade or downgrade anytime.</p>
        <div className="landing-pricing-grid">
          {pricing.map((plan, i) => (
            <div className={`landing-pricing-card ${plan.popular ? 'popular' : ''}`} key={i}>
              {plan.popular && <span className="landing-popular-badge">Most Popular</span>}
              <h3>{plan.name}</h3>
              <div className="landing-price"><span>{plan.price}</span>{plan.period}</div>
              <ul>
                {plan.features.map((f, j) => (
                  <li key={j}><Check size={16} color="#22c55e" /> {f}</li>
                ))}
              </ul>
              <button className={plan.popular ? 'landing-btn-primary' : 'landing-btn-outline'} onClick={onGetStarted}>{plan.cta}</button>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="landing-section" id="how-it-works">
        <h2 className="landing-section-title">How It Works</h2>
        <p className="landing-section-subtitle">Get started in minutes with these simple steps</p>
        <div className="landing-steps">
          {steps.map((s, i) => (
            <div className="landing-step" key={i}>
              <div className="landing-step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="landing-section landing-section-gray" id="testimonials">
        <h2 className="landing-section-title">What our customers say</h2>
        <div className="landing-testimonials-scroll">
          {testimonials.map((t, i) => (
            <div className="landing-testimonial-card" key={i}>
              <div className="landing-testimonial-stars">
                {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <p>"{t.text}"</p>
              <div className="landing-testimonial-author">
                <div className="landing-testimonial-avatar">{t.name[0]}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="landing-section" id="faq">
        <h2 className="landing-section-title">Frequently Asked Questions</h2>
        <div className="landing-faq-list">
          {faqs.map((faq, i) => (
            <div className={`landing-faq-item ${openFaq === i ? 'open' : ''}`} key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="landing-faq-q">
                <span>{faq.q}</span>
                {openFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {openFaq === i && <div className="landing-faq-a">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <h2>Ready to take control of your inventory?</h2>
        <p>Join thousands of businesses that trust DukanStore Inventory.</p>
        <div className="landing-cta-btns">
          <button className="landing-btn-white" onClick={onGetStarted}>Get Started Free</button>
          <button className="landing-btn-ghost-white">Learn More <ArrowRight size={16} /></button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-brand">
            <Package size={24} color="#3b82f6" />
            <span>DukanStore Inventory</span>
          </div>
          <div className="landing-footer-links">
            <div>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#how-it-works">How It Works</a>
            </div>
            <div>
              <h4>Company</h4>
              <a href="#faq">About</a>
              <a href="#faq">Careers</a>
              <a href="#faq">Contact</a>
            </div>
            <div>
              <h4>Support</h4>
              <a href="#faq">Help Center</a>
              <a href="#faq">FAQ</a>
              <a href="#faq">Status</a>
            </div>
          </div>
        </div>
        <div className="landing-footer-bottom">
          <p>© 2026 DukanStore Inventory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
