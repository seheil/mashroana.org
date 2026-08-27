import type { LucideIcon } from "lucide-react";
import { BriefcaseBusiness, Flower2, HandHeart, HeartPulse, HelpingHand, Landmark, Leaf, Palmtree, Scissors, ShieldCheck, Sprout, UsersRound, Wheat } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "orphan-care": HandHeart,
  education: Landmark,
  economic: BriefcaseBusiness,
  tailoring: Scissors,
  agriculture: Palmtree,
  sacrifice: Wheat,
  seasonal: Flower2,
  relief: HelpingHand,
  health: HeartPulse,
  motherhood: UsersRound,
  elderly: HeartPulse,
  "special-needs": ShieldCheck,
  institutional: Leaf,
};

export function ProgramIcon({ id, className = "h-6 w-6" }: { id?: string; className?: string }) {
  const Icon = (id && icons[id]) || Sprout;
  return <Icon className={className} aria-hidden="true" strokeWidth={1.8} />;
}
