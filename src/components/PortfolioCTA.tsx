import React from 'react';
import { ArrowRight } from 'lucide-react';

export const PortfolioCTA: React.FC = () => {
    return (
        <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">
                        LOOKING FOR A DEVELOPER?
                    </p>
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Need a custom web solution for your business?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                        I specialize in WordPress, React, and Next.js development. Let's discuss how I can help bring your project to life.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href="http://mdotahmad.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                        >
                            View Portfolio
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="mailto:muhammadugv66@gmail.com"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
