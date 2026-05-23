// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// export function RecentBadges({ badges }: { badges: Badge[] }) {
//   const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

//   return (
//     <>
//       <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         {badges.map((badge) => (
//           <button
//             key={badge.id}
//             onClick={() => setSelectedBadge(badge)}
//             className="text-left"
//           >
//             <BadgeCard badge={badge} />
//           </button>
//         ))}
//       </section>

//       <Dialog
//         open={!!selectedBadge}
//         onOpenChange={(open) => {
//           if (!open) setSelectedBadge(null);
//         }}
//       >
//         <DialogContent className="max-w-[720px] rounded-[16px] p-4">
//           {selectedBadge && (
//             <div className="grid gap-6 md:grid-cols-[280px_1fr]">
//               <div className="overflow-hidden rounded-[12px] bg-yellow-300">
//                 <Image
//                   src={selectedBadge.image}
//                   alt={selectedBadge.title}
//                   width={280}
//                   height={320}
//                   className="h-full w-full object-cover"
//                 />
//               </div>

//               <div>
//                 <DialogHeader>
//                   <DialogTitle className="text-2xl font-bold">
//                     {selectedBadge.title}
//                   </DialogTitle>
//                 </DialogHeader>

//                 <p className="mt-1 text-sm text-muted-foreground">
//                   {selectedBadge.category}
//                 </p>

//                 <p className="mt-4 text-sm text-muted-foreground">
//                   The badge is live and shareable. Participants can claim this
//                   badge and share it on social media.
//                 </p>

//                 <div className="mt-6 space-y-3 text-sm">
//                   <InfoRow label="Created" value={selectedBadge.createdAt} />
//                   <InfoRow label="Last used" value={selectedBadge.lastUsed} />
//                   <InfoRow
//                     label="Created badges"
//                     value={selectedBadge.createdBadges}
//                   />
//                   <InfoRow
//                     label="Total shares"
//                     value={selectedBadge.totalShares}
//                   />
//                 </div>

//                 <div className="mt-6 flex gap-3">
//                   <button className="rounded-full border border-red-300 px-6 py-3 text-sm font-semibold text-red-500">
//                     Delete badge
//                   </button>

//                   <button className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white">
//                     Edit badge
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// function InfoRow({ label, value }: { label: string; value: string | number }) {
//   return (
//     <div className="flex justify-between border-b pb-2">
//       <span className="text-muted-foreground">{label}</span>
//       <span className="font-medium">{value}</span>
//     </div>
//   );
// }
