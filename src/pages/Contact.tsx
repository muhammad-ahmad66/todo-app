import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Mail, MapPin, ExternalLink, Linkedin, MessageCircle, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'muhammadugv66@gmail.com',
      href: 'mailto:muhammadugv66@gmail.com',
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: 'WhatsApp',
      value: '+92 341 1080082',
      href: 'https://wa.me/923411080082',
      color: 'text-green-600 dark:text-green-400',
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: 'https://www.linkedin.com/in/m-ahmad66/',
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      label: 'Portfolio',
      value: 'View My Work',
      href: 'https://mdotahmad.vercel.app',
      color: 'text-primary-600 dark:text-primary-400',
    },
  ];

  return (
    <PageContainer>
      <Breadcrumb />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Typography variant="h1" className="mb-4">Get In Touch</Typography>
          <Typography variant="body" className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I'm Muhammad Ahmad, a full-stack developer specializing in WordPress, React, and Next.js.
            Whether you need a custom website, a modern web application, or have a project in mind,
            I'd love to hear from you.
          </Typography>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card padding="lg" className="h-full hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ${info.color}`}>
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <Typography variant="h4" className="mb-2">{info.label}</Typography>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{info.value}</p>
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : '_self'}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <Button variant="outline" size="sm" className="w-full md:w-auto">
                        {info.label === 'Portfolio' ? 'Visit Portfolio' : 'Contact Me'}
                        {info.href.startsWith('http') && (
                          <ExternalLink className="w-4 h-4 ml-2" />
                        )}
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card padding="lg" className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
          <div className="text-center">
            <Typography variant="h3" className="mb-4">About Me</Typography>
            <Typography variant="body" className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm a full-stack developer with 3+ years of experience building high-quality websites and web applications.
              I specialize in WordPress development, WooCommerce stores, and modern Next.js applications that combine
              clean design, smooth performance, and measurable results.
            </Typography>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>50+ Projects Delivered</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Global Collaboration</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>92% Client Retention</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};