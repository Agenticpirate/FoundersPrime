import json

# YC RFS Ideas (from browser scraping - Spring 2026 batch sample)
yc_ideas = [
    {
        "title": "Cursor for Product Managers",
        "description": "Over the last few years, we've seen an explosion of AI tools for writing code. Cursor and Claude Code are great at helping teams build software once it's clear what needs to be built. But writing code is only part of building a product people want. The most important part is figuring out what to build in the first place! Every successful product requires product management: talking to users, understanding markets, synthesizing feedback, and deciding what problems are worth solving and how the product should work.",
        "author": "Andrew Miklas",
        "category": "AI Tools",
        "source": "YC RFS Spring 2026",
        "tags": ["AI", "Product Management", "SaaS"]
    },
    {
        "title": "AI-Native Hedge Funds",
        "description": "In the 1980s, a small group of funds started using computers to analyze markets. At the time it seemed silly, but quantitative trading is now obvious. We're at a similar inflection point now, and the next Renaissance, Bridgewater, and D.E. Shaw's are going to be built on AI.",
        "author": "Charlie Holtz",
        "category": "Fintech",
        "source": "YC RFS Spring 2026",
        "tags": ["AI", "Finance", "Trading"]
    },
    {
        "title": "AI-Native Agencies",
        "description": "Traditional agencies are labor-intensive businesses that rely on armies of people to deliver services. AI is changing this. The next generation of agencies will use AI to dramatically reduce costs while delivering better results. Think marketing agencies that use AI to create campaigns, design agencies that use AI to generate designs, or consulting firms that use AI to analyze data.",
        "author": "Aaron Epstein",
        "category": "Services",
        "source": "YC RFS Spring 2026",
        "tags": ["AI", "Agencies", "Automation"]
    },
    {
        "title": "Stablecoin Financial Services",
        "description": "Stablecoins are becoming the rails for global payments. The next wave of fintech will be built on stablecoins, offering services like lending, savings, and payments that are faster, cheaper, and more accessible than traditional banking.",
        "author": "Daivik Goel",
        "category": "Fintech",
        "source": "YC RFS Spring 2026",
        "tags": ["Crypto", "Fintech", "Payments"]
    },
    {
        "title": "AI for Government",
        "description": "Government is one of the last sectors to be transformed by technology. AI can help governments deliver better services, reduce costs, and improve decision-making. From processing permits to analyzing policy impacts, there are countless opportunities to modernize government operations.",
        "author": "Tom Blomfield",
        "category": "GovTech",
        "source": "YC RFS Spring 2026",
        "tags": ["AI", "Government", "Public Sector"]
    },
    {
        "title": "Modern Metal Mills",
        "description": "The steel and metal industry is ripe for disruption. Modern manufacturing techniques, automation, and AI can dramatically improve efficiency and reduce costs. The next generation of metal mills will be cleaner, faster, and more profitable.",
        "author": "Zane Hengsperger",
        "category": "Manufacturing",
        "source": "YC RFS Spring 2026",
        "tags": ["Manufacturing", "Hardware", "Industrial"]
    },
    {
        "title": "AI Guidance for Physical Work",
        "description": "While AI has transformed knowledge work, physical work remains largely unchanged. AI-powered guidance systems can help workers in construction, manufacturing, and other physical industries work more safely and efficiently. Think AR glasses that show workers exactly what to do, or AI systems that prevent accidents before they happen.",
        "author": "David Lieb",
        "category": "Industrial",
        "source": "YC RFS Spring 2026",
        "tags": ["AI", "AR", "Safety"]
    },
    {
        "title": "Large Spatial Models",
        "description": "Just as large language models transformed text, large spatial models will transform how we understand and interact with the physical world. These models can power everything from autonomous vehicles to robotics to AR/VR experiences.",
        "author": "Ryan McLinko",
        "category": "AI Infrastructure",
        "source": "YC RFS Spring 2026",
        "tags": ["AI", "Spatial Computing", "Infrastructure"]
    },
    {
        "title": "Infra for Government Fraud Hunters",
        "description": "Government fraud costs taxpayers billions every year. Modern data tools can help fraud investigators find and stop fraud faster. The right infrastructure can make fraud hunting 10x more effective.",
        "author": "Garry Tan",
        "category": "GovTech",
        "source": "YC RFS Spring 2026",
        "tags": ["Government", "Fraud Detection", "Data"]
    },
    {
        "title": "Make LLMs Easy to Train",
        "description": "Training large language models is still too hard and expensive. Tools that make it easier for companies to train custom models on their own data will unlock a new wave of AI applications.",
        "author": "Gabriel Birnbaum",
        "category": "AI Infrastructure",
        "source": "YC RFS Spring 2026",
        "tags": ["AI", "ML", "Infrastructure"]
    }
]

# Razorpay Fix My Itch Ideas (63 ideas from scraping)
razorpay_ideas = [
    {"title": "Why do freelancers ghost projects after partial payments without accountability systems?", "category": "B2B Services", "itchScore": "76", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't pet owners find trusted home-stay alternatives to boarding?", "category": "Consumer Services", "itchScore": "70", "source": "Razorpay Fix My Itch"},
    {"title": "How do parents find trustworthy evening childcare for 2-4 hours?", "category": "Consumer Services", "itchScore": "81", "source": "Razorpay Fix My Itch"},
    {"title": "Why are CRM systems too complex for 3-person businesses?", "category": "SaaS", "itchScore": "74", "source": "Razorpay Fix My Itch"},
    {"title": "Why is booking cargo vehicles harder than passenger transport?", "category": "Logistics", "itchScore": "92.1", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't hosts prepare restaurant-quality meals in 15 minutes?", "category": "Food & Beverage", "itchScore": "73.5", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't first time used car buyers verify car histories and conditions?", "category": "Automotive", "itchScore": "78", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't renters access verified mold, pests or hazards before signing leases?", "category": "Housing", "itchScore": "82", "source": "Razorpay Fix My Itch"},
    {"title": "Why is caring for aging parents for sole earners across cities still fragmented?", "category": "Healthcare", "itchScore": "85", "source": "Razorpay Fix My Itch"},
    {"title": "Why do teachers lack real time mental health support at work?", "category": "Healthcare", "itchScore": "79", "source": "Razorpay Fix My Itch"},
    {"title": "Why do STEM students face education loan anxiety from unclear costs?", "category": "EdTech", "itchScore": "77", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't consumers see verified kitchen safety standards on food delivery apps?", "category": "Consumer Services", "itchScore": "71", "source": "Razorpay Fix My Itch"},
    {"title": "Why is connecting specialized hardware to laptops still unreliable?", "category": "Hardware", "itchScore": "68", "source": "Razorpay Fix My Itch"},
    {"title": "Why is distinguishing sprains from fractures impossible without costly hospital visits?", "category": "Healthcare", "itchScore": "80", "source": "Razorpay Fix My Itch"},
    {"title": "Why do people leaving formal education lack structure and career guidance?", "category": "Career", "itchScore": "75", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't anxious people find trustworthy non-prescription sleep solutions?", "category": "Healthcare", "itchScore": "72", "source": "Razorpay Fix My Itch"},
    {"title": "Why are small retailers forced into distributor margins without direct brand access?", "category": "B2B Services", "itchScore": "68.5", "source": "Razorpay Fix My Itch"},
    {"title": "Why do micro-SMEs waste 10+ hours weekly on invoice management?", "category": "B2B Services", "itchScore": "67.5", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't manufacturers rely on guaranteed pickup logistics for outbound deliveries?", "category": "B2B Services", "itchScore": "79", "source": "Razorpay Fix My Itch"},
    {"title": "Why do factory owners wait days for industrial repair technicians?", "category": "B2B Services", "itchScore": "78.5", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't shops see real-time supplier stock levels?", "category": "B2B Services", "itchScore": "67.5", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't small restaurants access wholesale ingredient pricing without large minimum orders?", "category": "B2B Services", "itchScore": "71.5", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't businesses verify new suppliers before purchasing?", "category": "B2B Services", "itchScore": "76", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't SMEs negotiate favorable payment terms with large buyers?", "category": "B2B Services", "itchScore": "82.8", "source": "Razorpay Fix My Itch"},
    {"title": "Why do businesses struggle finding reliable contract manufacturers for small batches?", "category": "B2B Services", "itchScore": "75.2", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't online shoppers visualize furniture in their actual rooms before buying?", "category": "E-commerce", "itchScore": "69", "source": "Razorpay Fix My Itch"},
    {"title": "Why do D2C brands lose 30% of customers at checkout due to payment failures?", "category": "E-commerce", "itchScore": "88", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't sellers predict returns before shipping products?", "category": "E-commerce", "itchScore": "73", "source": "Razorpay Fix My Itch"},
    {"title": "Why do rural customers face 7-10 day delivery times for essentials?", "category": "E-commerce", "itchScore": "84", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't fashion brands reduce size-related returns?", "category": "E-commerce", "itchScore": "76", "source": "Razorpay Fix My Itch"},
    {"title": "Why do college students struggle to find affordable textbook rentals?", "category": "EdTech", "itchScore": "70", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't working professionals access micro-learning for skill upgrades?", "category": "EdTech", "itchScore": "72", "source": "Razorpay Fix My Itch"},
    {"title": "Why do parents lack tools to track their child's actual learning progress?", "category": "EdTech", "itchScore": "78", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't rural students access quality test prep coaching?", "category": "EdTech", "itchScore": "81", "source": "Razorpay Fix My Itch"},
    {"title": "Why do gig workers struggle to access instant credit for emergencies?", "category": "FinTech", "itchScore": "86", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't small businesses get working capital without collateral?", "category": "FinTech", "itchScore": "83", "source": "Razorpay Fix My Itch"},
    {"title": "Why do freelancers lose 20% of earnings to currency conversion fees?", "category": "FinTech", "itchScore": "79", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't migrant workers send money home without high fees?", "category": "FinTech", "itchScore": "87", "source": "Razorpay Fix My Itch"},
    {"title": "Why do cloud kitchens struggle with ingredient wastage?", "category": "Food & Beverage", "itchScore": "74", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't home cooks monetize their skills part-time?", "category": "Food & Beverage", "itchScore": "71", "source": "Razorpay Fix My Itch"},
    {"title": "Why do restaurants lack real-time demand forecasting?", "category": "Food & Beverage", "itchScore": "76", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't delivery drivers optimize multi-order routes in real-time?", "category": "Logistics", "itchScore": "80", "source": "Razorpay Fix My Itch"},
    {"title": "Why do warehouses struggle with inventory accuracy?", "category": "Logistics", "itchScore": "77", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't SMEs track shipments across multiple carriers?", "category": "Logistics", "itchScore": "75", "source": "Razorpay Fix My Itch"},
    {"title": "Why do small teams waste hours on manual meeting scheduling?", "category": "SaaS", "itchScore": "69", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't solopreneurs automate social media without losing authenticity?", "category": "SaaS", "itchScore": "71", "source": "Razorpay Fix My Itch"},
    {"title": "Why do remote teams struggle with async communication?", "category": "SaaS", "itchScore": "73", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't non-technical founders build MVPs without developers?", "category": "SaaS", "itchScore": "82", "source": "Razorpay Fix My Itch"},
    {"title": "Why do mental health apps fail to provide crisis support?", "category": "Healthtech", "itchScore": "85", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't patients access their medical records across hospitals?", "category": "Healthtech", "itchScore": "88", "source": "Razorpay Fix My Itch"},
    {"title": "Why do chronic disease patients lack personalized diet plans?", "category": "Healthtech", "itchScore": "79", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't elderly people get medicine delivered with dosage reminders?", "category": "Healthtech", "itchScore": "81", "source": "Razorpay Fix My Itch"},
    {"title": "Why do apartment residents struggle to find reliable plumbers?", "category": "Home Services", "itchScore": "72", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't homeowners get transparent pricing for repairs?", "category": "Home Services", "itchScore": "76", "source": "Razorpay Fix My Itch"},
    {"title": "Why do tenants lack tools to report maintenance issues efficiently?", "category": "Home Services", "itchScore": "70", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't travelers find authentic local experiences?", "category": "Travel", "itchScore": "68", "source": "Razorpay Fix My Itch"},
    {"title": "Why do solo travelers struggle to find safe accommodation?", "category": "Travel", "itchScore": "74", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't budget travelers access flexible cancellation policies?", "category": "Travel", "itchScore": "71", "source": "Razorpay Fix My Itch"},
    {"title": "Why do commuters waste time finding parking spots?", "category": "Transportation", "itchScore": "78", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't EV owners find reliable charging stations?", "category": "Transportation", "itchScore": "82", "source": "Razorpay Fix My Itch"},
    {"title": "Why do women feel unsafe in late-night ride-sharing?", "category": "Transportation", "itchScore": "89", "source": "Razorpay Fix My Itch"},
    {"title": "Why can't renters negotiate rent based on market rates?", "category": "Real Estate", "itchScore": "77", "source": "Razorpay Fix My Itch"},
    {"title": "Why do first-time homebuyers struggle with legal paperwork?", "category": "Real Estate", "itchScore": "80", "source": "Razorpay Fix My Itch"}
]

# Convert Razorpay ideas to match YC format
formatted_razorpay = []
for idea in razorpay_ideas:
    formatted_razorpay.append({
        "title": idea["title"],
        "description": f"Real problem identified by users in India. Itch Score: {idea['itchScore']}/100 - indicating high demand and urgency for a solution.",
        "author": "Razorpay Community",
        "category": idea["category"],
        "source": idea["source"],
        "tags": [idea["category"], "Validated Problem", "India"]
    })

# Combine all ideas
all_ideas = yc_ideas + formatted_razorpay

print(f"Total ideas compiled: {len(all_ideas)}")
print(f"YC RFS ideas: {len(yc_ideas)}")
print(f"Razorpay ideas: {len(formatted_razorpay)}")

# Save to JSON
with open('data/startup_ideas.json', 'w') as f:
    json.dump(all_ideas, f, indent=2)

print("\n✓ Saved all startup ideas to data/startup_ideas.json")
