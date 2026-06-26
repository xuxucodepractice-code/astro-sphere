---
title: "AFAC2026 Financial Long-Text Agent: Evidence Retrieval and Token-Efficient QA"
summary: "An in-progress competition project on financial long-document question answering, focused on non-embedding retrieval, evidence tracing, dynamic memory compression, and Qwen-based answer generation."
date: "Jun 26 2026"
draft: false
tags:
- Agentic AI
- Financial Document QA
- Retrieval-Augmented Generation
- Long-Context Reasoning
- Evidence Retrieval
- Token Optimization
- Qwen
status: "In progress; foundation docs, dataset inventory, learning roadmap, and first single-question workflow prepared"
role: "Competition participant; agent-learning workflow design, task decomposition, baseline understanding, and early deterministic tooling"
result: "A-board public data organized across 100 questions and 190 PDFs; first question-inspection script and pytest check completed for a manual-solving loop"
methods:
- Manual question solving
- Non-embedding retrieval planning
- Evidence-grounded option judgment
- Qwen-based reasoning constraints
- Token accounting
- Baseline failure-mode analysis
- Submission compliance design
---

## Overview

This is an in-progress project for the **AFAC2026 Financial Intelligent Innovation Competition**, Challenge Track 4: **Financial Long-Text Agent Dynamic Memory Compression and Efficient Question Answering**.

The task is to build a financial long-document QA agent that can answer single-choice, multiple-choice, and true/false questions over insurance contracts, regulatory documents, financial contracts, annual reports, and industry research reports.

The project is valuable to my research trajectory because it makes agentic AI concrete. It is not a vague "agent" demo. It is a constrained decision system that must retrieve evidence, manage context, control token cost, and produce legally formatted answers under competition rules.

## Competition Constraints

The core constraints are unusually important:

- The official reasoning and QA stage must use **Qwen-series model APIs**.
- The system cannot use embedding models for retrieval, reranking, or reasoning.
- Preprocessing can use deterministic parsing, OCR, PDF-to-text conversion, layout analysis, and table recovery.
- Formal answers must include token accounting for every evaluated question.
- The final submission must be a valid `answer.csv` containing question-level answers and token statistics.

These constraints make the project closer to a real systems problem than a simple RAG prototype. Because embedding retrieval is not allowed, the system must rely on structured document parsing, keyword/BM25-style retrieval, domain rules, section and page metadata, option-wise evidence comparison, and careful prompt construction.

## Dataset and Task Shape

The current public A-board dataset contains **100 questions** across five domains:

| Domain | Question Type Focus |
|---|---|
| Insurance | policy clauses, surrender values, loan rules, benefit conditions |
| Regulatory | compliance duties, deadlines, penalties, rule applicability |
| Financial contracts | bond terms, ratings, issuers, rights and obligations |
| Financial reports | annual-report metrics, cash flow, R&D, dividends |
| Research reports | industry trends, company comparisons, metric interpretation |

The local workspace currently tracks the A-board public data, including question JSON files and raw PDF/HTML/TXT materials. The early engineering priority is to make every answer traceable back to its evidence source rather than treating the model as a black-box reader.

## Current Workflow

I structured the workspace into three stages:

1. **Agent learning**: manually solve one question, observe the human process, and turn repeated actions into small tools.
2. **Baseline understanding**: decompose the full baseline into data loading, document mapping, parsing, retrieval, Qwen reasoning, answer normalization, token accounting, and submission generation.
3. **Baseline improvement**: run controlled experiments on retrieval, prompts, parsing, error analysis, and token compression.

The first single-question loop starts with `ins_a_007`, an insurance multiple-choice question about policy loans. The current manual record decomposes each option into evidence requirements, maps the provided `doc_ids` to raw insurance PDFs, and separates what can be handled deterministically from what requires human or model judgment.

A first deterministic helper script has also been prepared for this loop. It reads the official Group A JSON files, locates a question by `qid`, and prints the question, options, answer format, and supporting document IDs. A pytest check verifies the script on `ins_a_007`.

## Agent Learning Logic

This project follows my broader view of agentic AI: start from a real task, solve it manually, and then ask which structures become necessary.

For this competition, the structures emerge naturally:

- **Tools** appear when repeated file reading, question lookup, document mapping, and text search become tedious.
- **State** appears when the system must remember the question, candidate evidence, option judgments, answer format, and token usage.
- **Memory compression** appears when raw financial documents are too long to pass directly into the model.
- **Evaluation** appears when an answer is not enough; the system must explain whether failure came from retrieval, evidence selection, reasoning, formatting, or token waste.
- **Guardrails** appear because multiple-choice, multi-select, and true/false answers each have strict output formats.

In that sense, the project is a practical bridge between my personal AI-Agent learning method and an externally evaluated competition task.

## What This Demonstrates

This project is still in progress, so I do not present it as a result or award. Its current value is methodological:

- it shows how I translate an ambiguous agentic-AI challenge into a staged engineering plan;
- it connects financial-domain documents with retrieval, reasoning, and token-aware evaluation;
- it demonstrates disciplined baseline reading rather than immediately treating the baseline as a black box;
- it gives me a concrete testbed for studying how agents should manage evidence, uncertainty, and cost under strict constraints.

For my PhD direction, this project complements my finance and recommender-system work. It extends the same research question into agentic AI: how can a system observe incomplete information, retrieve evidence, maintain useful state, and make reliable decisions under operational constraints?
