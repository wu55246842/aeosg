export const HOME_PAGE_HTML = String.raw`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AEO Platform Development: Feasibility & Roadmap</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        /* Custom Palette - Brilliant Blues & Future Tech */
        :root {
            --primary: #2563EB; /* Blue 600 */
            --secondary: #06B6D4; /* Cyan 500 */
            --accent: #7C3AED; /* Violet 600 */
            --dark: #0F172A; /* Slate 900 */
            --light: #F8FAFC; /* Slate 50 */
        }

        body {
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #F1F5F9;
            color: #334155;
        }

        /* Chart Container Rules - MANDATORY RESPONSIVENESS */
        .chart-container {
            position: relative;
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            background: white;
            border-radius: 0.75rem; /* rounded-xl */
            padding: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        /* Responsive Heights for Charts */
        .chart-height-sm { height: 300px; max-height: 350px; }
        .chart-height-md { height: 400px; max-height: 450px; }
        .chart-height-lg { height: 500px; max-height: 550px; }

        @media (max-width: 640px) {
            .chart-height-sm, .chart-height-md, .chart-height-lg {
                height: 250px;
                max-height: 300px;
            }
        }

        /* Custom Architecture Flow Elements */
        .flow-card {
            border-left: 4px solid var(--primary);
            transition: transform 0.2s;
        }
        .flow-card:hover {
            transform: translateY(-2px);
        }
        .flow-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: #94A3B8;
            padding: 0.5rem;
        }
        
        /* Timeline Styling */
        .timeline-line {
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 4px;
            background: #E2E8F0;
            transform: translateX(-50%);
        }
        .timeline-dot {
            position: absolute;
            left: 50%;
            width: 20px;
            height: 20px;
            background: var(--primary);
            border: 4px solid white;
            border-radius: 50%;
            transform: translateX(-50%);
            z-index: 10;
        }

        @media (max-width: 768px) {
            .timeline-line { left: 20px; }
            .timeline-dot { left: 20px; }
            .timeline-content-left, .timeline-content-right {
                width: 100%;
                padding-left: 45px;
                text-align: left !important;
            }
        }
    </style>
</head>
<body class="antialiased">

    <header class="bg-slate-900 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div style="background-image: radial-gradient(#4f46e5 1px, transparent 1px); background-size: 32px 32px; height: 100%; width: 100%;"></div>
        </div>
        <div class="max-w-7xl mx-auto text-center relative z-10">
            <div class="inline-block bg-blue-600/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-blue-500/50">
                FEASIBILITY STUDY & ROADMAP
            </div>
            <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                Building the Next-Gen <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">AEO Platform</span>
            </h1>
            <p class="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Optimizing for Machines: A comprehensive plan to develop a SaaS platform that helps brands conquer Answer Engine Optimization (ChatGPT, Gemini, Perplexity).
            </p>
            <div class="flex justify-center gap-4 text-sm font-medium">
                <span class="flex items-center gap-2"><span class="text-blue-400">⚡</span> High Viability</span>
                <span class="flex items-center gap-2"><span class="text-purple-400">🚀</span> Growing Market</span>
                <span class="flex items-center gap-2"><span class="text-cyan-400">🛠</span> Tech Ready</span>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-20 space-y-20 relative z-20">
        <section>
            <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h2 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-4">1. The Market Opportunity</h2>
                <p class="text-slate-600 mb-6 text-lg leading-relaxed">
                    Traditional SEO is evolving. With the rise of Large Language Models (LLMs), user behavior is shifting from "Searching & Clicking" to "Asking & Reading." A feasible AEO platform must address the declining click-through rates (CTR) of traditional search and the exponential growth of Zero-Click searches generated by AI summaries.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <div class="chart-container chart-height-md">
                            <canvas id="marketTrendChart"></canvas>
                        </div>
                        <p class="text-sm text-slate-500 mt-3 text-center italic">
                            Projected shift in search traffic sources (2022-2027).
                        </p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <div class="text-4xl font-bold text-blue-600 mb-2">58%</div>
                            <div class="text-slate-700 font-semibold">Zero-Click Searches</div>
                            <p class="text-xs text-slate-500 mt-1">Searches ending without a click (Google, 2024 est).</p>
                        </div>
                        <div class="bg-cyan-50 p-6 rounded-xl border border-cyan-100">
                            <div class="text-4xl font-bold text-cyan-600 mb-2">10x</div>
                            <div class="text-slate-700 font-semibold">AI Query Growth</div>
                            <p class="text-xs text-slate-500 mt-1">Year-over-year growth in conversational queries.</p>
                        </div>
                        <div class="bg-purple-50 p-6 rounded-xl border border-purple-100 col-span-1 sm:col-span-2">
                            <div class="text-xl font-bold text-purple-700 mb-2">The "Answer" Economy</div>
                            <p class="text-sm text-slate-600">
                                Brands are no longer fighting for the #1 link. They are fighting to be the <strong>cited source</strong> in the AI's direct answer.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="mb-6">
                <h2 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-cyan-500 pl-4">2. Feasibility Analysis</h2>
                <p class="text-slate-600 max-w-4xl text-lg">
                    Is building an AEO platform viable? We analyzed the Strengths, Weaknesses, Opportunities, and Threats. The technical barrier is high (NLP required), but the market vacuum is significant.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-3">
                        <span class="text-green-500">💪</span> Strengths (Internal)
                    </h3>
                    <ul class="space-y-2 text-slate-600">
                        <li class="flex items-start gap-2"><span class="text-green-500 font-bold">✓</span> First-mover advantage in dedicated AEO tooling.</li>
                        <li class="flex items-start gap-2"><span class="text-green-500 font-bold">✓</span> Ability to leverage existing LLM APIs (OpenAI/Gemini) for analysis.</li>
                        <li class="flex items-start gap-2"><span class="text-green-500 font-bold">✓</span> Clear value prop: "Don't lose traffic to AI."</li>
                    </ul>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-500">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-3">
                        <span class="text-orange-500">⚠️</span> Weaknesses (Internal)
                    </h3>
                    <ul class="space-y-2 text-slate-600">
                        <li class="flex items-start gap-2"><span class="text-orange-500 font-bold">!</span> High dependency on third-party AI APIs (cost).</li>
                        <li class="flex items-start gap-2"><span class="text-orange-500 font-bold">!</span> AEO algorithms are "black boxes" and harder to reverse engineer than SEO.</li>
                    </ul>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-3">
                        <span class="text-blue-500">🌟</span> Opportunities (External)
                    </h3>
                    <ul class="space-y-2 text-slate-600">
                        <li class="flex items-start gap-2"><span class="text-blue-500 font-bold">↗</span> Integration with enterprise CMS (WordPress/Shopify plugins).</li>
                        <li class="flex items-start gap-2"><span class="text-blue-500 font-bold">↗</span> Voice Search market (Siri/Alexa) alignment.</li>
                        <li class="flex items-start gap-2"><span class="text-blue-500 font-bold">↗</span> "Brand Authority" tracking as a new metric.</li>
                    </ul>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-3">
                        <span class="text-red-500">🛡</span> Threats (External)
                    </h3>
                    <ul class="space-y-2 text-slate-600">
                        <li class="flex items-start gap-2"><span class="text-red-500 font-bold">✕</span> Major SEO tools (SEMRush, Ahrefs) adding AEO features.</li>
                        <li class="flex items-start gap-2"><span class="text-red-500 font-bold">✕</span> Search Engines blocking scrapers/analysis bots.</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 class="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        3. Core AEO Scoring Metrics
                    </h2>
                    <p class="text-slate-300 mb-6 text-lg">
                        To build this platform, we must quantify the qualitative. Unlike SEO (backlinks/keywords), AEO relies on **Trust, Structure, and Conciseness**. The platform will aggregate these into a proprietary "Answer Readiness Score."
                    </p>
                    
                    <div class="space-y-4">
                        <div class="bg-slate-800 p-4 rounded-lg border-l-4 border-blue-500">
                            <h4 class="font-bold text-blue-400">Entity Clarity</h4>
                            <p class="text-sm text-slate-400">How well LLMs understand the "Who/What" of the brand. (Knowledge Graph).</p>
                        </div>
                        <div class="bg-slate-800 p-4 rounded-lg border-l-4 border-cyan-500">
                            <h4 class="font-bold text-cyan-400">Schema & Structure</h4>
                            <p class="text-sm text-slate-400">JSON-LD validity and semantic HTML structure (H1, H2, lists).</p>
                        </div>
                        <div class="bg-slate-800 p-4 rounded-lg border-l-4 border-purple-500">
                            <h4 class="font-bold text-purple-400">Q&A Format</h4>
                            <p class="text-sm text-slate-400">Directness of answers to common user queries.</p>
                        </div>
                    </div>
                </div>

                <div class="chart-container chart-height-md bg-slate-800">
                    <canvas id="aeoFactorsChart"></canvas>
                </div>
            </div>
        </section>

        <section>
            <h2 class="text-3xl font-bold text-slate-800 mb-8 border-l-4 border-purple-600 pl-4">4. Platform Architecture</h2>
            <p class="text-slate-600 mb-8 text-lg">
                The technical build requires a sophisticated pipeline combining traditional web scraping with modern Vector Database storage and LLM analysis.
            </p>

            <div class="flex flex-col md:flex-row gap-4 justify-between items-stretch text-sm">
                <div class="flex-1 bg-white p-5 rounded-xl shadow-md flow-card border-blue-500 flex flex-col">
                    <div class="text-3xl mb-2">🕷️</div>
                    <h4 class="font-bold text-slate-800">1. Data Ingestion</h4>
                    <p class="text-slate-500 mt-2">Headless browser (Puppeteer) crawls target URL + Top 10 SERP competitors.</p>
                    <div class="mt-auto pt-4 flex gap-2">
                        <span class="px-2 py-1 bg-slate-100 rounded text-xs">Node.js</span>
                        <span class="px-2 py-1 bg-slate-100 rounded text-xs">Puppeteer</span>
                    </div>
                </div>

                <div class="flow-arrow hidden md:flex">➝</div>
                <div class="flow-arrow md:hidden">↓</div>

                <div class="flex-1 bg-white p-5 rounded-xl shadow-md flow-card border-cyan-500 flex flex-col">
                    <div class="text-3xl mb-2">🧠</div>
                    <h4 class="font-bold text-slate-800">2. Content Analysis</h4>
                    <p class="text-slate-500 mt-2">Extract main content. Use NLP to identify entities. Check Schema markup.</p>
                    <div class="mt-auto pt-4 flex gap-2">
                        <span class="px-2 py-1 bg-slate-100 rounded text-xs">Python</span>
                        <span class="px-2 py-1 bg-slate-100 rounded text-xs">SpaCy</span>
                    </div>
                </div>

                <div class="flow-arrow hidden md:flex">➝</div>
                <div class="flow-arrow md:hidden">↓</div>

                <div class="flex-1 bg-white p-5 rounded-xl shadow-md flow-card border-purple-500 flex flex-col">
                    <div class="text-3xl mb-2">🤖</div>
                    <h4 class="font-bold text-slate-800">3. AI Simulation</h4>
                    <p class="text-slate-500 mt-2">Feed content to GPT-4/Gemini via API to simulate "Answer" generation & identify gaps.</p>
                    <div class="mt-auto pt-4 flex gap-2">
                        <span class="px-2 py-1 bg-slate-100 rounded text-xs">LLM APIs</span>
                        <span class="px-2 py-1 bg-slate-100 rounded text-xs">Vector DB</span>
                    </div>
                </div>

                <div class="flow-arrow hidden md:flex">➝</div>
                <div class="flow-arrow md:hidden">↓</div>

                <div class="flex-1 bg-white p-5 rounded-xl shadow-md flow-card border-green-500 flex flex-col">
                    <div class="text-3xl mb-2">📊</div>
                    <h4 class="font-bold text-slate-800">4. User Dashboard</h4>
                    <p class="text-slate-500 mt-2">Present "Answer Score," gap analysis, and one-click optimization edits.</p>
                    <div class="mt-auto pt-4 flex gap-2">
                        <span class="px-2 py-1 bg-slate-100 rounded text-xs">React</span>
                        <span class="px-2 py-1 bg-slate-100 rounded text-xs">Tailwind</span>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <h2 class="text-3xl font-bold text-slate-800 mb-12 border-l-4 border-indigo-600 pl-4">5. Development Roadmap & Budget</h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div class="lg:col-span-2 relative">
                    <div class="timeline-line"></div>

                    <div class="relative mb-12 w-full">
                        <div class="timeline-dot"></div>
                        <div class="md:w-1/2 pr-0 md:pr-12 ml-auto md:ml-0 text-right timeline-content-left">
                            <h4 class="text-lg font-bold text-blue-600">Phase 1: MVP (Months 1-3)</h4>
                            <p class="text-sm text-slate-600 mt-1">Core scraping engine, basic Schema validator, and "Answer Simulation" using a single LLM model.</p>
                            <span class="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-bold">Focus: Functionality</span>
                        </div>
                    </div>

                    <div class="relative mb-12 w-full">
                        <div class="timeline-dot"></div>
                        <div class="md:w-1/2 pl-0 md:pl-12 ml-auto timeline-content-right">
                            <h4 class="text-lg font-bold text-cyan-600">Phase 2: Analytics Beta (Months 4-6)</h4>
                            <p class="text-sm text-slate-600 mt-1">Dashboard UI development. Integration of historical tracking. Beta user onboarding (Agency partners).</p>
                            <span class="inline-block mt-2 px-2 py-1 bg-cyan-100 text-cyan-800 text-xs rounded font-bold">Focus: UX & Data</span>
                        </div>
                    </div>

                    <div class="relative w-full">
                        <div class="timeline-dot"></div>
                        <div class="md:w-1/2 pr-0 md:pr-12 ml-auto md:ml-0 text-right timeline-content-left">
                            <h4 class="text-lg font-bold text-purple-600">Phase 3: Scale & Plugins (Months 7-9)</h4>
                            <p class="text-sm text-slate-600 mt-1">WordPress/Shopify plugins for one-click fixes. Multi-LLM model comparison (GPT vs Claude vs Gemini).</p>
                            <span class="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded font-bold">Focus: Integration</span>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-lg border border-slate-100 flex flex-col">
                    <h3 class="text-lg font-bold text-slate-700 mb-4 text-center">Initial Budget Allocation</h3>
                    <div class="chart-container flex-grow" style="height: 300px;">
                        <canvas id="budgetChart"></canvas>
                    </div>
                    <div class="mt-4 text-center">
                        <p class="text-sm text-slate-500">Estimated MVP Cost: <strong>$45k - $60k</strong></p>
                    </div>
                </div>
            </div>
        </section>

        <footer class="text-center pt-10 border-t border-slate-200">
            <h3 class="text-2xl font-bold text-slate-800 mb-2">Ready to Build?</h3>
            <p class="text-slate-500 mb-6">The shift to Answer Engines is inevitable. The platform infrastructure is defined.</p>
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:-translate-y-1">
                Download Technical Spec
            </button>
            <p class="text-xs text-slate-400 mt-8 pb-8">Generated by Canvas Infographics • Feasibility Study • 2025</p>
        </footer>

    </main>

    <script>
        function splitLabel(label) {
            if (typeof label !== 'string' || label.length <= 16) return label;
            const words = label.split(' ');
            const lines = [];
            let currentLine = words[0];

            for (let i = 1; i < words.length; i++) {
                if ((currentLine + " " + words[i]).length > 16) {
                    lines.push(currentLine);
                    currentLine = words[i];
                } else {
                    currentLine += " " + words[i];
                }
            }
            lines.push(currentLine);
            return lines;
        }

        const commonTooltipOptions = {
            callbacks: {
                title: function(tooltipItems) {
                    const item = tooltipItems[0];
                    let label = item.chart.data.labels[item.dataIndex];
                    if (Array.isArray(label)) {
                        return label.join(' ');
                    } else {
                        return label;
                    }
                }
            }
        };

        const ctxTrend = document.getElementById('marketTrendChart').getContext('2d');
        const trendLabels = ['2023', '2024', '2025', '2026', '2027'];
        
        new Chart(ctxTrend, {
            type: 'line',
            data: {
                labels: trendLabels,
                datasets: [
                    {
                        label: 'Traditional SEO Clicks (Billions)',
                        data: [100, 95, 85, 75, 65],
                        borderColor: '#94A3B8',
                        backgroundColor: 'rgba(148, 163, 184, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'AI-Generated Answers (Billions)',
                        data: [5, 15, 35, 60, 90],
                        borderColor: '#2563EB',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: commonTooltipOptions
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#F1F5F9' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });

        const ctxFactors = document.getElementById('aeoFactorsChart').getContext('2d');
        const rawFactorLabels = [
            'Entity Authority & Trust', 
            'Structured Data (Schema)', 
            'Content Formatting (Q&A)', 
            'Brand Mentions', 
            'Page Speed'
        ];
        const processedFactorLabels = rawFactorLabels.map(splitLabel);

        new Chart(ctxFactors, {
            type: 'polarArea',
            data: {
                labels: processedFactorLabels,
                datasets: [{
                    label: 'Impact Score (1-100)',
                    data: [90, 85, 75, 60, 40],
                    backgroundColor: [
                        'rgba(37, 99, 235, 0.7)',
                        'rgba(6, 182, 212, 0.7)',
                        'rgba(124, 58, 237, 0.7)',
                        'rgba(245, 158, 11, 0.7)',
                        'rgba(100, 116, 139, 0.7)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        position: 'right',
                        labels: { color: '#E2E8F0', font: { size: 11 } }
                    },
                    tooltip: commonTooltipOptions
                },
                scales: {
                    r: {
                        ticks: { display: false },
                        grid: { color: '#334155' }
                    }
                }
            }
        });

        const ctxBudget = document.getElementById('budgetChart').getContext('2d');
        const rawBudgetLabels = [
            'Backend Engineering (Python/Node)', 
            'AI API Costs (Tokens)', 
            'Frontend UI/UX', 
            'Infrastructure & Hosting'
        ];
        const processedBudgetLabels = rawBudgetLabels.map(splitLabel);

        new Chart(ctxBudget, {
            type: 'doughnut',
            data: {
                labels: processedBudgetLabels,
                datasets: [{
                    data: [40, 25, 25, 10],
                    backgroundColor: [
                        '#2563EB',
                        '#7C3AED',
                        '#06B6D4',
                        '#94A3B8'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15 } },
                    tooltip: commonTooltipOptions
                },
                cutout: '60%'
            }
        });
    </script>
</body>
</html>
`;
