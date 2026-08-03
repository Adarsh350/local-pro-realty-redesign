# Graph Report - .  (2026-08-03)

## Corpus Check
- 30 files · ~1,294,066 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 96 nodes · 100 edges · 10 communities (7 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `include` - 6 edges
3. `getBlogArticle()` - 4 edges
4. `scripts` - 4 edges
5. `lib` - 4 edges
6. `blogArticles` - 3 edges
7. `Hero()` - 3 edges
8. `generateMetadata()` - 2 edges
9. `BlogArticlePage()` - 2 edges
10. `cityListingHref()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `BlogArticlePage()` --calls--> `getBlogArticle()`  [EXTRACTED]
  app/blog/[slug]/page.tsx → app/blog-data.ts
- `generateMetadata()` --calls--> `getBlogArticle()`  [EXTRACTED]
  app/blog/[slug]/page.tsx → app/blog-data.ts

## Import Cycles
- None detected.

## Communities (10 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.10
Nodes (17): cityListingHref(), clamp01(), Contact(), easeOut(), fanPositions, featuredAreas, footerLinkGroups, footerMarkets (+9 more)

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (18): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+10 more)

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (13): devDependencies, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom, typescript, tailwindcss (+5 more)

### Community 3 - "Community 3"
Cohesion: 0.33
Nodes (6): BlogArticle, blogArticles, getBlogArticle(), BlogArticlePage(), BlogPageProps, generateMetadata()

### Community 4 - "Community 4"
Cohesion: 0.22
Nodes (8): license, name, private, scripts, build, dev, start, version

### Community 5 - "Community 5"
Cohesion: 0.22
Nodes (8): .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude, include

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (7): next, dependencies, next, react, react-dom, react, react-dom

## Knowledge Gaps
- **50 isolated node(s):** `BlogArticle`, `BlogPageProps`, `metadata`, `featuredAreas`, `fanPositions` (+45 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `compilerOptions` connect `Community 1` to `Community 5`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Community 2` to `Community 4`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 6` to `Community 4`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `BlogArticle`, `BlogPageProps`, `metadata` to the rest of the system?**
  _50 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.10144927536231885 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._