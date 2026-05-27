import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TopBarAction } from "../../types/dashboard/topbar";

const baseClass = "cursor-pointer h-auto gap-2 px-4 py-2 text-[14px] font-semibold";

export function getActionButtonClass(isOrange?: boolean) {
  return cn(
    baseClass,
    isOrange
      ? "bg-[#FF693E] text-white hover:bg-[#FF693E]/90"
      : "border border-[#E5E7EB] bg-white text-[#161616] hover:bg-[#F8F8F8]",
  );
}

function ActionContent({ icon, label }: { icon?: string; label: string }) {
  return (
    <>
      {icon && <Image src={icon} alt="" width={16} height={16} />}
      <span>{label}</span>
    </>
  );
}

export function ActionButton({ action }: { action: TopBarAction }) {
  if (action.href) {
    return (
      <Button asChild className={getActionButtonClass(action.isOrange)}>
        <Link href={action.href}>
          <ActionContent icon={action.icon} label={action.label} />
        </Link>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      onClick={action.onClick}
      className={getActionButtonClass(action.isOrange)}
    >
      <ActionContent icon={action.icon} label={action.label} />
    </Button>
  );
}
