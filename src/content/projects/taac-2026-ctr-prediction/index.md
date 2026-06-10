---
title: "TAAC 2026: Unified Feature Interaction and Sequential Behavior Modeling for CTR Prediction"
summary: "A KDD Cup Academic Track project on industrial CTR prediction, comparing HyFormer and InterFormer-style architectures for sparse feature interaction and sequential user behavior modeling."
date: "Apr 01 2026"
draft: false
tags:
- Applied AI
- Recommender Systems
- CTR Prediction
- PyTorch
- InterFormer
- HyFormer
- Experiment Diagnosis
repoUrl: https://github.com/aKx1ya/TAAC2026
---

## Overview

This project began in **April 2026** and was developed for **TAAC 2026 / Tencent Advertising Algorithm Competition**, the KDD Cup 2026 Academic Track. It also served as a course project for **AMA564 Deep Learning** at The Hong Kong Polytechnic University.

The task is industrial click-through rate prediction on TencentGR advertising logs. The central technical challenge is to jointly model static user/item feature interactions and multi-domain user behavior sequences under sparse, anonymized, high-cardinality data.

The dataset contains about **1 million anonymized ad impression records**, including **907,381 training rows**, **102,619 validation rows**, and **120 flat columns** across user integer features, item integer features, user dense features, and four sequence domains.

## Timeline and Competition Context

The core competition work ran over roughly **four weeks**. TAAC 2026 asked teams to build a unified CTR-prediction model that could fuse static feature interactions with user behavioral sequences at industrial scale.

Our official first-round result was **409 / 1,875 teams**. We did not advance to the second round, but we continued the technical investigation after the deadline because the experiment behavior did not fully match what the architecture analysis suggested.

## My Role

My role focused on research planning, mathematical and theoretical framing, model-route comparison, experiment diagnosis, and paper-oriented analysis. I helped steer the project from HyFormer baseline optimization toward InterFormer-style architecture exploration after diagnosing the limitations of stacking training tricks on the official baseline.

This role was less about claiming every implementation detail and more about building the research logic: what to compare, why a model route mattered, how to interpret failure, and how to turn experiment logs into a coherent applied AI contribution.

## Problem Framing

Industrial CTR prediction requires two modeling abilities at the same time:

- **Feature interaction**: learning sparse user/item relationships from static categorical and dense features.
- **Sequential behavior modeling**: extracting intent from user behavior histories across multiple domains.

The official HyFormer baseline uses a cross-attention style fusion between non-sequential features and sequential behavior. Our work investigated whether an InterFormer-style architecture could improve bidirectional interaction between static features and behavior sequences.

## Technical Journey

We explored three complementary directions.

First, we optimized the official **PCVRHyFormer** baseline with modifications such as larger hidden dimensions, Focal Loss, rotary position embeddings, longer sequence encoders, and item feature interaction modules. An early heavily tuned HyFormer variant reached Evaluation AUC `0.7952`, while a later KV-weighted embedding variant with softmax temperature scaling reached Evaluation AUC `0.8122`. This gave us a reusable lesson on the validation-evaluation gap: stronger validation behavior did not always translate into a stronger leaderboard score.

Second, we implemented and studied **PCVRInterFormer**, replacing HyFormer's query-token bottleneck with bidirectional feature-sequence modulation. The architecture used CrossSummary-style sequence summarization, PersonalizedFFN-style modulation, and gated fusion to combine static feature interaction with behavioral sequence representations. Untuned, InterFormer reached Evaluation AUC `0.8067` at about half the model size, outperforming our earlier heavily tuned HyFormer route and suggesting that architecture choice mattered more than incremental optimization.

Third, we explored a **DIN-enhanced HyFormer** direction by adding target attention, DCN-v2, and temporal features. This route reached Evaluation AUC `0.8252`, which became the strongest official-style evaluation result among the HyFormer-family models we tested.

## Dataset Insights

The dataset analysis produced several useful findings:

- `item_dense` is empty, leaving no direct item-side dense representation.
- Several user integer and user dense features form natural key-value aligned pairs.
- Fids 62 to 66 form a coarse-to-fine interest pyramid.
- The main memory bottleneck comes from ultra-high-cardinality sequence embeddings.
- Some high-cardinality sequence features are skipped or zeroed under the baseline memory budget.

These findings motivated item statistical features, Bayesian-smoothed CTR features, key-value weighted embedding, and more careful treatment of sequence feature memory pressure.

## Results and Diagnostics

The most important comparison from the project is:

- **PCVRHyFormer v0.2**: Evaluation AUC `0.7952`, with `d_model=128` after heavy optimization.
- **PCVRInterFormer v0.1**: Evaluation AUC `0.8067`, with `d_model=64` and no hyperparameter tuning.
- **KV-weighted HyFormer variant**: Evaluation AUC `0.8122`, using KV-weighted embeddings with softmax temperature scaling.
- **DIN-enhanced HyFormer variant**: Evaluation AUC `0.8252`, using target attention, DCN-v2, and temporal features.

This result suggested that architecture choice mattered more than piling additional training tricks onto the baseline. A clean, half-size InterFormer could outperform a more heavily engineered HyFormer route, even before extensive tuning.

We also observed a peak validation AUC of `0.852` in InterFormer v0.5 after adding Focal Loss, GradScaler, warmup, DHEN/DCN components, and mixed-precision stability fixes. The larger-scale model initially crashed to NaN under mixed-precision training until we diagnosed the missing gradient scaler and stabilized the training loop.

After the deadline, we traced a hidden issue in the official baseline code: its embedding-reinitialization logic could silently wipe learned embeddings mid-training instead of preserving them. Once fixed, the strongest post-deadline run reached an AUC that would map to a leaderboard position better than the Top 200 under the scoring reference we used. I treat this as a post-competition diagnostic result rather than an official ranking, but it was one of the most valuable research lessons from the project.

## What This Demonstrates

This project demonstrates my ability to work with complex real-world AI systems: sparse industrial data, sequence modeling, recommender architectures, experiment diagnosis, ablation thinking, and research communication. For my PhD trajectory, it is important because it shows applied AI ability beyond finance while still connecting to my broader interest in reliable decision support under uncertainty.
