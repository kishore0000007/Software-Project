// Central place for what each subscription tier unlocks. Change these
// numbers (or move them into the database via Settings) if pricing/limits
// change — nothing else should need editing.
export const PLAN_LIMITS = {
  Free: 1,
  Business: Infinity,
  Enterprise: Infinity,
};

export const getPlanLimit = (plan) => PLAN_LIMITS[plan] ?? PLAN_LIMITS.Free;
