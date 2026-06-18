"use client";

import { memo } from "react";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

// The animated colorful border glow has been disabled. This component now
// renders nothing so no hover animation appears around any element.
const GlowingEffect = memo((_props: GlowingEffectProps) => {
  return null;
});

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
