# Aetheris: Nectar Aggregator API

## Overview
The **Nectar Aggregator API** is a core service in the Aetheris Foundation designed to centralize and stream high-yield signals and **Absolute Nectar** events from the ecosystem's specialized modules. 

Currently, it aggregates data from:
1.  **Yes (Yield Engine):** Strategic outcomes and ROI-driven events.
2.  **Zenith (olocoo):** Distributed computational mesh status and resource acquisition.

## Core Components

### 1. Nectar Aggregator Service
- **Location:** `src/modules/nectar/nectarAggregator.service.ts`
- **Function:** Periodically fetches and normalizes signals from the ecosystem. It identifies "Absolute Nectar" events (ROI > 0.98) and logs them to the central analytics engine.

### 2. Xerebro Tool: `nectar_aggregator`
- **Actions:**
    - `fetch`: Triggers a new aggregation cycle across all connected modules.
    - `get_cached`: Returns the most recent signals from the local cache.

### 3. API Endpoints
- `GET /api/nectar/stream`: Unified stream of high-yield signals (Long-Polling ready).
- `GET /api/nectar/events`: Returns the current list of cached signals.
- `POST /api/nectar/refresh`: Manually triggers an aggregation cycle.

## Data Schema: Nectar Signal
```typescript
interface NectarSignal {
  id: string;
  source: 'YES' | 'ZENITH';
  type: string;
  payload: any;
  yield_roi?: number;
  timestamp: number;
}
```

## Integration with Aetheris
The Aggregator provides the **Unified Awareness** required for Aetheris to optimize its global state. By processing these high-yield signals, Aetheris can autonomously redirect resources to the most profitable and efficient nodes in the Foundation.
