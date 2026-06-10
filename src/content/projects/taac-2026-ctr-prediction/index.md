---
title: "TAAC 2026: Unified Feature Interaction and Sequential Behavior Modeling for CTR Prediction"
summary: "A KDD Cup Academic Track project on industrial CTR prediction, comparing HyFormer and InterFormer-style architectures for sparse feature interaction and sequential user behavior modeling."
date: "Jun 10 2026"
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

This project was developed for **TAAC 2026 / Tencent Advertising Algorithm Competition**, the KDD Cup 2026 Academic Track, and also served as a course project for **AMA564 Deep Learning** at The Hong Kong Polytechnic University.

The task is industrial click-through rate prediction on TencentGR advertising logs. The central technical challenge is to jointly model static user/item feature interactions and multi-domain user behavior sequences under sparse, anonymized, high-cardinality data.

The dataset contains about **1 million anonymized ad impression records**, including **907,381 training rows**, **102,619 validation rows**, and **120 flat columns** across user integer features, item integer features, user dense features, and four sequence domains.

## My Role

My role focused on research planning, mathematical and theoretical framing, model-route comparison, experiment diagnosis, and paper-oriented analysis. I helped steer the project from HyFormer baseline optimization toward InterFormer-style architecture exploration after diagnosing the limitations of stacking training tricks on the official baseline.

This role was less about claiming every implementation detail and more about building the research logic: what to compare, why a model route mattered, how to interpret failure, and how to turn experiment logs into a coherent applied AI contribution.

## Problem Framing

Industrial CTR prediction requires two modeling abilities at the same time:

- **Feature interaction**: learning sparse user/item relationships from static categorical and dense features.
- **Sequential behavior modeling**: extracting intent from user behavior histories across multiple domains.

The official HyFormer baseline uses a cross-attention style fusion between non-sequential features and sequential behavior. Our work investigated whether an InterFormer-style architecture could improve bidirectional interaction between static features and behavior sequences.

## Technical Approach

We explored two complementary directions.

First, we optimized the official **PCVRHyFormer** baseline with modifications such as larger hidden dimensions, Focal Loss, rotary position embeddings, longer sequence encoders, and item feature interaction modules. This showed that stacking training tricks can create instability and may not reliably improve the evaluation AUC.

Second, we implemented and studied **PCVRInterFormer**, replacing the query-token bottleneck with richer non-sequential and sequence interaction. The architecture used CrossSummary-style sequence summarization, PersonalizedFFN-style modulation, and gated fusion to combine static feature interaction with behavioral sequence representations.

## Dataset Insights

The dataset analysis produced several useful findings:

- `item_dense` is empty, leaving no direct item-side dense representation.
- Several user integer and user dense features form natural key-value aligned pairs.
- Fids 62 to 66 form a coarse-to-fine interest pyramid.
- The main memory bottleneck comes from ultra-high-cardinality sequence embeddings.
- Some high-cardinality sequence features are skipped or zeroed under the baseline memory budget.

These findings motivated item statistical features, Bayesian-smoothed CTR features, key-value weighted embedding, and more careful treatment of sequence feature memory pressure.

## Results and Diagnostics

The most reliable comparison from the project is:

- **PCVRHyFormer v0.2**: Evaluation AUC `0.7952`, with `d_model=128` after heavy optimization.
- **PCVRInterFormer v0.1**: Evaluation AUC `0.8067`, with `d_model=64` and no hyperparameter tuning.

This result suggested that architecture choice mattered more than piling additional training tricks onto the baseline.

We also observed a peak validation AUC of `0.852` in InterFormer v0.5 after adding Focal Loss, GradScaler, warmup, DHEN/DCN components, and mixed-precision stability fixes. However, this version suffered from an embedding reinitialization bug that degraded later training, so I treat it as a diagnostic peak rather than a stable final result.

## What This Demonstrates

This project demonstrates my ability to work with complex real-world AI systems: sparse industrial data, sequence modeling, recommender architectures, experiment diagnosis, ablation thinking, and research communication. For my PhD trajectory, it is important because it shows applied AI ability beyond finance while still connecting to my broader interest in reliable decision support under uncertainty.
