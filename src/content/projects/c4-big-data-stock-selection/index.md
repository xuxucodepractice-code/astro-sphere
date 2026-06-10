---
title: "C4 Big Data Challenge: Reproducible Stock Selection and Portfolio Construction Pipeline"
summary: "An offline-first quantitative finance pipeline that turns short-horizon stock selection into leakage-safe ranking, risk-aware reranking, and validated Top5 portfolio construction."
date: "Jun 01 2026"
draft: false
tags:
- Quantitative Finance
- Python
- LightGBM
- Portfolio Construction
- Time-series ML
- Risk-aware Ranking
- Reproducible ML
repoUrl: https://github.com/aKx1ya/BDC
---

## Overview

This project began in **June 2026** and was developed for the **2026 China Collegiate Computing Contest - Big Data Challenge**. The task is to predict which CSI 300 constituent stocks are likely to deliver stronger returns over the next trading week and submit a valid portfolio file.

The official evaluation uses an open-to-open portfolio return:

```text
Buy: T+1 trading day open
Sell: T+5 trading day open
Goal: maximize weighted portfolio return
```

The final submission must be a `result.csv` file containing no more than five stock IDs, non-negative weights, no duplicate stocks, and total weight no greater than 1.

## Timeline and Competition Context

The project started in **June 2026** and entered the first competition phase with a focus on building a reproducible pipeline before pushing for model complexity.

Our first-stage result was **35 / 1,200 teams**. For a finance-focused project, I see this result as evidence that disciplined data handling, leakage control, and portfolio construction can matter as much as raw model sophistication.

## My Role

I led the technical architecture and implementation of the offline-first machine learning pipeline, including leakage-safe feature engineering, time-aware training splits, LightGBM ranking models, Top30 candidate generation, risk-aware reranking, and result validation.

The key design decision was to separate prediction from portfolio construction. The model should not directly emit the final portfolio. Instead, it first produces a broad candidate pool, then a decision layer applies risk and ranking logic to select the final portfolio.

## Seven-Step Technical Workflow

The project is organized around a seven-step strategy:

1. Build an offline market data layer from historical price and public market data.
2. Engineer price, volume, volatility, cross-sectional, sector, and risk features.
3. Construct labels using `open(T+5) / open(T+1) - 1`.
4. Split data by time to avoid future information leakage.
5. Train ranking and prediction models to generate a Top30 candidate pool.
6. Apply risk gates and reranking overlays to select the final Top5 portfolio.
7. Validate `result.csv` and run local official-style evaluation.

This workflow treats the competition as a constrained decision problem rather than a generic regression task.

## Feature Engineering

The local pipeline uses **75,406 training rows** and **56 engineered features** over the current training window. Feature groups include:

- Short-horizon returns over 1, 3, 5, 10, 20, and 40 trading days.
- Moving-average deviations such as close-to-MA ratios.
- Realized volatility over 5, 10, and 20 days.
- Liquidity and activity proxies such as amount and volume ratios.
- Candlestick and price-action signals including CLV, body ratio, upper/lower shadows, and range ratio.
- Drawdown and single-drop risk measures.
- Daily cross-sectional percentile ranks.
- Sector momentum features when sector labels are available.

The feature layer is designed to be leakage-safe: labels and future open prices are excluded from model features, and training/prediction logic follows the same transformation pipeline.

## Modeling Layer

The modeling layer uses a LightGBM-based ensemble:

- **LambdaRank model** for daily cross-sectional stock ranking.
- **Regressor** for short-horizon return prediction.
- **Classifier** for positive-return probability.

When LightGBM is unavailable, the system falls back to deterministic sklearn or NumPy models to keep the workflow reproducible. This matters because competition code must be auditable and runnable in constrained environments.

## Decision Layer

The model first writes a `candidate_top30.csv` file. The reranking layer then applies:

- Liquidity gates based on recent average amount.
- 20-day drawdown filters.
- 20-day single-drop filters.
- Model-rank scoring.
- Sector momentum scoring.
- CLV and volume-close price-action scoring.
- Sector concentration constraints when real sector labels exist.

The final output is a validated `result.csv` with up to five selected stocks and equal weights by default.

## Competition Result and Validation

One local evaluation snapshot produced a weighted open-to-open return of approximately **1.996%** on the held-out test slice. I treat this as an internal validation result, not an official competition ranking.

The project also keeps detailed intermediate artifacts such as `candidate_top30.csv`, `ranking_log.csv`, `training_metadata.csv`, and `evaluation_detail.csv`, which makes the decision process inspectable rather than a black-box Top5 output.

## What This Demonstrates

This project connects quantitative finance with reproducible machine learning and risk-aware decision support. It shows my ability to translate a market prediction task into a structured ML system with data controls, feature design, model ensembling, decision constraints, and validation discipline.
