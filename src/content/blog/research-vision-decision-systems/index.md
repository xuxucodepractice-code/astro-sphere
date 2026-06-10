---
title: "Research Vision: Decision Systems Across AI, Robotics, and Quantitative Finance"
summary: "A short statement on why my PhD interests converge on reliable sequential decision systems under uncertainty."
date: "Jun 10 2026"
draft: false
tags:
- Research Vision
- Artificial Intelligence
- Robotics
- Quantitative Finance
- Agentic AI
---

My current research interests sit at the intersection of **AI, robotics, agentic systems, and quantitative finance**. At first glance, these fields can look far apart. Financial markets involve prices, portfolios, and risk. Robotics involves perception, action, and physical constraints. Agentic AI involves planning, tool use, memory, and feedback.

The common structure I care about is this: intelligent systems must make decisions under uncertainty, using incomplete observations, delayed feedback, and imperfect models of the world.

That structure appears repeatedly across my work.

In quantitative finance, a model does not simply predict a number. It supports a decision: which assets to select, how to rank opportunities, when to act, and how much risk to tolerate. A small prediction gain can be irrelevant if it is unstable, non-causal, or impossible to translate into a disciplined portfolio.

In recommender systems and CTR prediction, a model must combine static features with sequential behavior. It must learn what matters from sparse, high-cardinality data while avoiding fragile shortcuts. My TAAC 2026 project made this concrete: architecture choice, feature-sequence interaction, and experiment diagnosis mattered more than adding more tricks to a baseline.

In robotics and embodied AI, the same decision problem becomes physical. An agent must understand state, estimate uncertainty, act through constraints, and adapt when the environment changes. The cost of being wrong is no longer only a lower metric. It can be unsafe, inefficient, or unrecoverable.

## The Research Question I Keep Returning To

The question I keep circling is:

**How can we build AI systems that reason over multiple signals, maintain stable internal states, and make robust decisions in dynamic environments?**

For me, this naturally connects three technical directions.

First, **cross-modal representation learning**. Real decision problems rarely arrive in a clean single format. A financial model may need prices, volume, fundamentals, events, and regime indicators. A robotic agent may need vision, proprioception, language instruction, and task memory. The core challenge is not only to collect modalities, but to learn when each modality should influence the decision.

Second, **state-space and sequential models**. Many systems evolve over time with hidden states. Markets shift regimes. Users change intent. Agents move through partially observed environments. I am interested in models that can preserve useful long-horizon information without becoming too expensive or too brittle.

Third, **decision-aware evaluation**. A model that performs well on a static benchmark may fail when deployed as part of a decision loop. I want to study evaluation methods that connect prediction quality with downstream reliability, risk, and adaptation.

## Why My Background Points Here

My academic path has moved from finance and economics at the University of Melbourne to financial technology at The Hong Kong Polytechnic University. That path gave me both the economic intuition for decision problems and the technical motivation to study machine learning systems more deeply.

My recent projects helped sharpen the direction.

The **TAAC 2026 CTR prediction project** taught me how complex industrial AI systems can fail in subtle ways. A hidden embedding reinitialization issue in the baseline code quietly limited model performance. Finding it required more than running experiments. It required asking why the system behaved inconsistently.

The **C4 Big Data Challenge stock selection project** taught me that predictive modeling is only one layer of a quantitative system. Data leakage control, time-aware validation, candidate generation, reranking, and portfolio constraints are all part of the intelligence of the system.

Together, these projects pushed me toward a PhD direction focused not only on building stronger models, but on building systems that are diagnosable, adaptive, and decision-relevant.

## Long-term Direction

My long-term goal is to contribute to research on reliable AI agents and sequential decision systems. I am especially interested in work that connects model architecture with real-world constraints: uncertainty, memory, changing environments, and downstream action.

I do not see AI, robotics, and quantitative finance as separate interests. I see them as different laboratories for the same deeper problem: how intelligent systems observe, represent, decide, and adapt.
