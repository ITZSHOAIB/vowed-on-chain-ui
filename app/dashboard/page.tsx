import MarriageAction from "@/components/dashboard/marriage-action";
import GiftBalance from "@/components/dashboard/gift-balance";
import MartialStatus from "@/components/dashboard/marital-status";
import SpouseAddress from "@/components/dashboard/spouse-address";

export default function Dashboard() {
  return (
    <section className="mx-auto max-w-screen-xl p-3 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <MartialStatus />
        <GiftBalance />
        <SpouseAddress />
      </div>
      <MarriageAction />
    </section>
  );
}
