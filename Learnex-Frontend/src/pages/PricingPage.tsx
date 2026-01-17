import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Shield, Clock, Users, Zap } from 'lucide-react';
import Layout from '../components/Layout';
import { Link } from '../components/Link';

const plans = [
  {
    name: "Free Plan",
    price: "₹0",
    period: "month",
    description: "Perfect for getting started",
    features: [
      "Access to basic features",
      "5 AI prompts per day",
      "Basic dashboard access",
      "Study progress tracking",
      "Limited quiz access",
      "Email support",
      "1 study group",
      "Basic analytics"
    ],
    cta: "Get Started",
    href: "/signup?plan=free",
    highlight: "Most Popular for Beginners"
  },
  {
    name: "Premium Plan",
    price: "₹199",
    period: "month",
    description: "Most popular for students",
    features: [
      "Unlimited AI prompts",
      "Advanced analytics dashboard",
      "Chatbot mentor access",
      "Career roadmap planning",
      "Unlimited quiz access",
      "Priority support",
      "Study group creation",
      "Custom study plans",
      "Progress predictions",
      "Exam preparation tools"
    ],
    cta: "Go Premium",
    href: "/signup?plan=premium",
    popular: true,
    highlight: "Best Value"
  },
  {
    name: "Teacher Plan",
    price: "₹299",
    period: "month",
    description: "Designed for educators",
    features: [
      "All Premium features",
      "Student management system",
      "Smart exam builder",
      "Performance analyzer",
      "Bulk student import",
      "Custom report generation",
      "Parent portal access",
      "24/7 dedicated support",
      "Virtual classroom tools",
      "Assignment automation"
    ],
    cta: "Start Teaching",
    href: "/signup?plan=teacher",
    highlight: "Complete Solution"
  }
];

const benefits = [
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Bank-grade security for your data and privacy"
  },
  {
    icon: Clock,
    title: "Learn at Your Pace",
    description: "Flexible learning schedule that adapts to you"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join a thriving community of learners"
  },
  {
    icon: Zap,
    title: "Instant Access",
    description: "Start learning immediately after signing up"
  }
];

const PricingPage: React.FC = () => {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle. We'll even prorate the difference for you."
    },
    {
      question: "Is there a student discount?",
      answer: "Yes! Students with a valid .edu email address get 20% off the Premium plan. Additionally, we offer special group rates for educational institutions."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and UPI payments. All transactions are secure and encrypted. We also support various international payment methods."
    },
    {
      question: "Do you offer a money-back guarantee?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with our service, we'll refund your payment no questions asked."
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-[#06142E] to-[#1B3B6F]">
        {/* Header Section */}
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 p-2 bg-indigo-800 rounded-full"
            >
              <div className="px-4 py-1 bg-indigo-700 rounded-full">
                <span className="text-indigo-200">Save 20% with annual plans</span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Simple Pricing, Great Learning
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-indigo-200 max-w-3xl mx-auto"
            >
              Choose the plan that fits you best. No hidden fees, cancel anytime.
            </motion.p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                onHoverStart={() => setHoveredPlan(index)}
                onHoverEnd={() => setHoveredPlan(null)}
                className={`relative bg-white rounded-2xl p-8 shadow-xl transform transition-all duration-300 ${
                  hoveredPlan === index ? 'scale-105' : ''
                } ${plan.popular ? 'ring-4 ring-indigo-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-6 transform -translate-y-1/2">
                    <div className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold bg-indigo-500 text-white">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-4">
                    {plan.highlight}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                      className="flex items-start"
                    >
                      <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <Link href={plan.href} className="block">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 px-6 rounded-xl text-lg font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-indigo-100 text-indigo-900 hover:bg-indigo-200'
                    }`}
                  >
                    {plan.cta}
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-indigo-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Choose Learnex?
              </h2>
              <p className="text-indigo-200 text-lg">
                Experience the benefits that thousands of students enjoy
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="text-center"
                  >
                    <div className="h-16 w-16 rounded-full bg-indigo-700 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-indigo-200">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-indigo-900 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-indigo-800 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                  >
                    <span className="text-lg font-semibold text-white">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: selectedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {selectedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-4"
                      >
                        <p className="text-indigo-200">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;