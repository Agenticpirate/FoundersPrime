# Local development — avoid the “unstyled / broken” site

## What went wrong before

If HTML loads but the site looks like plain blue links and a white page, CSS failed:

```text
/_next/static/css/app/layout.css → 404
```

That almost always means `.next` was corrupted by mixing **dev** and **production build** output.

## Safe daily workflow

```bash
cd ~/GROK/FoundersPrime
npm run dev
# wait for: ✓ Ready
# then open http://localhost:3001
```

- Keep **one** dev server only.
- After editing `middleware.ts` or `next.config.js`, restart dev and hard-refresh (Cmd+Shift+R).

## If the UI breaks again

```bash
# Ctrl+C the running server, then:
npm run dev:clean
# wait for Ready → new browser tab or hard refresh
```

## Production build (do NOT run while dev is open)

```bash
# 1) Stop npm run dev first
npm run build
```

`prebuild` will **refuse** to build if something is already listening on port 3001.

## Scripts

| Command | Use |
|---------|-----|
| `npm run dev` | Normal day-to-day (does **not** wipe `.next`) |
| `npm run dev:clean` | Fix unstyled UI / corrupted cache |
| `npm run build` | Production build (stop dev first) |
| `npm start` | Run production build locally |

## Do not

- Run `npm run build` in one terminal while `npm run dev` runs in another
- Open the browser before the terminal prints **Ready**
- Run multiple `next dev` processes on the same folder
