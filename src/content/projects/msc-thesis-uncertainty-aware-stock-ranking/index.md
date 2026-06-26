---
title: "MSc Thesis: Uncertainty-Aware Stock Ranking and Portfolio Decision Support"
summary: "A supervised MSc dissertation project under Prof. Guohao Shen at PolyU, studying leakage-safe stock ranking, lightweight deep learning, and uncertainty-aware portfolio decision gates."
date: "Jun 24 2026"
draft: false
tags:
- MSc Thesis
- Supervised Research
- Quantitative Finance
- Deep Learning
- Uncertainty Calibration
- Portfolio Decision Support
- Walk-forward Evaluation
status: "In progress; supervisor confirmed and Phase 1 experiment scope organized"
role: "MSc dissertation researcher under Prof. Guohao Shen, Department of Applied Mathematics, PolyU"
methods:
- LightGBM / XGBoost baseline
- GRU ranking model
- Uncertainty-aware cash gate
- Walk-forward evaluation
- Top-5 portfolio decision
- Leakage-safe protocol
---

## Overview

This is my MSc dissertation project at The Hong Kong Polytechnic University, supervised by **Prof. Guohao Shen** in the Department of Applied Mathematics.

The project studies **uncertainty-aware stock ranking and portfolio decision support**. The broader working title is:

> Uncertainty-Calibrated Deep Learning for LLM-Enhanced Stock Selection

For the first-stage thesis scope, I frame the project more conservatively: the core contribution is not simply adding LLMs to stock prediction, but testing whether an uncertainty-aware decision layer can make short-horizon stock-ranking decisions more reliable.

## Research Question

The central question is:

**Can uncertainty-aware stock ranking and portfolio decision support reduce unreliable high-score decisions and downside risk in short-horizon financial decision tasks?**

This matters because a model can rank stocks well on average while still making fragile decisions under noisy or shifting market conditions. For a decision-support system, the relevant question is not only whether the model predicts returns, but whether it knows when its own ranking signal should be trusted, downweighted, or converted into cash.

## Phase 1 Experiment Design

The first-stage experiment is a leakage-safe short-horizon stock-ranking task using market features. The design keeps the empirical task realistic while controlling the ablation carefully.

The fixed protocol includes:

- a CSI 300 universe or reproducible subset;
- decision date `T`, using only features observable by `T`;
- hypothetical execution at `T+1` open;
- main horizon `H = 10`, with label `open(T+H) / open(T+1) - 1`;
- Top-5 stock selection as the portfolio decision task;
- walk-forward evaluation to simulate deployment and reduce future leakage.

The first mainline ladder is:

| Version | Model / Rule | Decision Rule | Purpose |
|---|---|---|---|
| E0 | Momentum-volatility rule | Top-5 equal weight | Naive portfolio baseline |
| E1 | LightGBM / XGBoost | Top-5 equal weight | Strong tabular ML baseline |
| E2 | GRU ranking model | Top-5 equal weight | Lightweight deep-learning ranker |
| E3 | Same GRU as E2 | Score or ranking-margin uncertainty gate; removed weight becomes cash | Test whether uncertainty-aware decisions improve reliability |

The cleanest core comparison is **E3 vs E2**: same horizon, same model, same features, same walk-forward split, with the uncertainty-aware cash gate as the intended difference.

## Why This Is a Decision-Systems Project

This thesis grows out of my broader interest in AI decision systems under uncertainty. Finance is the testbed because it makes uncertainty, delayed feedback, and evaluation discipline unavoidable.

The project is not intended as a live trading system or a claim of trading profitability. It is a controlled decision-support experiment: the model produces rankings, the decision layer decides how much to trust them, and the evaluation focuses on downstream reliability.

Key evaluation categories include:

- ranking diagnostics such as Rank IC, Top-K recall, and hit rate;
- portfolio metrics such as Top-5 return, cumulative return, volatility, and risk-adjusted return;
- reliability metrics such as downside loss, maximum drawdown, worst-period return, and high-confidence mistakes;
- uncertainty behavior such as cash-holding frequency, average invested weight, and return conditional on low uncertainty.

## LLM Signals as an Extension

LLM-extracted text signals are part of the broader research direction, but I treat them carefully in the MSc scope.

The advanced extension is to use frozen LLMs to extract structured sentiment, event-risk, risk-tone, or uncertainty features from timestamped public text. These features would be added only after the market-only pipeline is stable and the text timestamps and stock matching are reliable.

This keeps the thesis academically grounded: LLMs are auxiliary signal extractors, not the main claim. The main mechanism remains the uncertainty-aware decision gate.

## What This Demonstrates

This project demonstrates supervised research preparation beyond coursework:

- turning a competition-inspired finance problem into a controlled academic experiment;
- separating prediction metrics from decision-quality evidence;
- designing baseline ladders and clean ablations;
- enforcing leakage-safe walk-forward evaluation;
- connecting uncertainty estimation to portfolio-level action.

For my PhD trajectory, the thesis is important because it connects my finance background with a broader research question: how AI systems should reason about reliability before making decisions under uncertainty.
