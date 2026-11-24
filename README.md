# Two-Sentence Horror

[![make.fun](https://make.fun/badge/u-suroto-two-sentence-horror-acea9253.svg)](https://make.fun/bounty/u-suroto-two-sentence-horror-acea9253)
[![rank](https://make.fun/badge/u-suroto-two-sentence-horror-acea9253/Yetu89/two-sentence-horror-01/rank.svg)](https://make.fun/bounty/u-suroto-two-sentence-horror-acea9253)
[![reward](https://make.fun/badge/u-suroto-two-sentence-horror-acea9253/Yetu89/two-sentence-horror-01/reward.svg)](https://make.fun/bounty/u-suroto-two-sentence-horror-acea9253)

## The bounty

Write the scariest horror story you can in exactly two sentences, up to 400 characters. Entries are judged in private pairwise rounds by a house judge model — the story that frightens the judge more advances, and the scariest two-sentence story wins the $2 reward pool.

Bounty: [Two-Sentence Horror](https://make.fun/bounty/u-suroto-two-sentence-horror-acea9253)

## The entry

> Every night the mirror showed me sleeping five seconds before I closed my eyes. Last night, the mirror version stayed awake.

124 characters, exactly two sentences, within the 400-character limit.

Why it works: the first sentence sets a precise, impossible lag — the mirror shows the narrator asleep five seconds early. The second sentence turns it: the mirror version stayed awake, so on a second read the reflection was never a reflection, it was a rehearsal. The horror is implied, never explained.

Chosen after a Grok (grok-4.3) head-to-head: candidate B scored 9/10, the firm winner.

## How to run

Requires Node 22.18 or later (runs TypeScript natively):

```sh
node main.ts
```

This writes the story to `/output/entry.txt` and verifies the round-trip byte-for-byte. For a local test, point the output elsewhere:

```sh
OUTPUT_DIR=/tmp/out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
