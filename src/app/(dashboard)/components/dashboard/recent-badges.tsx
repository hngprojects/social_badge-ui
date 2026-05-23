// "use client";

// import { ReactNode, useEffect, useRef, useState } from "react";
// import { OrganizerTemplateInstance } from "../../types/dashboard/organizer-template-instances";
// import { useOrganizerTemplateInstances } from "../../hooks/use-organizer-template-instances";
// import { organizerTemplateInstancesKey } from "../../hooks/use-organizer-template-instances";
// import Image from "next/image";
// import { createPortal } from "react-dom";
// import { deleteOrganizerTemplate } from "../../services/delete-template";
// import { getOrganizerTemplateInstances } from "../../services/get-template-instances";

// type TemplateFilter = "All" | "Draft" | "Live";

// const FILTERS: TemplateFilter[] = ["All", "Draft", "Live"];

// const STATUS_STYLES = {
//   draft: {
//     bg: "#F3F4F6",
//     text: "#6B7280",
//     dot: "#9CA3AF",
//   },
//   live: {
//     bg: "#DCFCE7",
//     text: "#16A34A",
//     dot: "#16A34A",
//   },
//   archived: {
//     bg: "#FEF3C7",
//     text: "#D97706",
//     dot: "#D97706",
//   },
// };

// function formatDate(date: string) {
//   return new Date(date).toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// }

// function StatusPill({
//   status,
// }: {
//   status: OrganizerTemplateInstance["status"];
// }) {
//   const s = STATUS_STYLES[status];

//   return (
//     <span
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 6,
//         padding: "4px 10px",
//         borderRadius: 20,
//         fontSize: 12,
//         fontWeight: 500,
//         background: s.bg,
//         color: s.text,
//         whiteSpace: "nowrap",
//         textTransform: "capitalize",
//       }}
//     >
//       <span
//         style={{
//           width: 6,
//           height: 6,
//           borderRadius: "50%",
//           background: s.dot,
//           flexShrink: 0,
//         }}
//       />
//       {status}
//     </span>
//   );
// }

// function DeleteBadgeModal({
//   title,
//   onClose,
//   onDelete,
// }: {
//   title: string;
//   onClose: () => void;
//   onDelete: () => void;
// }) {
//   return (
//     <div
//       onClick={onClose}
//       className="fixed inset-0 z-[10000] grid place-items-center bg-black/40 p-[24px]"
//     >
//       <div
//         onClick={(event) => event.stopPropagation()}
//         className="w-full max-w-[560px] rounded-[20px] bg-white px-6 py-8 shadow-xl"
//       >
//         <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#FFF1F1]">
//           <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#FFE4E4]">
//             <svg
//               width="28"
//               height="28"
//               viewBox="0 0 28 28"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M10.5 3.5H17.5M3.5 7H24.5M22.1667 7L21.3485 19.2725C21.2257 21.1138 21.1644 22.0344 20.7667 22.7325C20.4166 23.3471 19.8884 23.8412 19.2519 24.1496C18.529 24.5 17.6063 24.5 15.7609 24.5H12.2391C10.3937 24.5 9.47104 24.5 8.74806 24.1496C8.11155 23.8412 7.58344 23.3471 7.23331 22.7325C6.83563 22.0344 6.77425 21.1138 6.6515 19.2725L5.83333 7M11.6667 12.25V18.0833M16.3333 12.25V18.0833"
//                 stroke="#D50B3E"
//                 strokeWidth="1.6"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//         </div>

//         <h2 className="mt-[24px] text-center text-[22px] font-bold text-[#3A3A3A]">
//           Delete Badge
//         </h2>

//         <p className="mx-auto mt-[48px]  text-center text-[16px] leading-[1.7] text-[#8B8B8B]">
//           Are you sure you want to delete{" "}
//           <span className="font-medium text-[#555]">{title}</span> badge? This
//           action is not reversible.
//         </p>

//         <div className="mt-8 grid gap-4 sm:grid-cols-2">
//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-full bg-[#F4F4F4] px-6 py-[14px] text-[14px] font-semibold text-[#242424] cursor-pointer hover:bg-[#e7e7e7]"
//           >
//             Cancel
//           </button>

//           <button
//             type="button"
//             onClick={onDelete}
//             className="rounded-full bg-[#EF4444] px-6 py-[14px] text-[14px] font-semibold text-white cursor-pointer hover:opacity-[.95]"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function TemplateInfoModal({
//   template,
//   onClose,
//   onRequestDelete,
// }: {
//   template: OrganizerTemplateInstance;
//   onClose: () => void;
//   onRequestDelete: (template: OrganizerTemplateInstance) => void;
// }) {
//   useEffect(() => {
//     const scrollY = window.scrollY;

//     document.body.style.position = "fixed";
//     document.body.style.top = `-${scrollY}px`;
//     document.body.style.left = "0";
//     document.body.style.right = "0";
//     document.body.style.width = "100%";

//     return () => {
//       document.body.style.position = "";
//       document.body.style.top = "";
//       document.body.style.left = "";
//       document.body.style.right = "";
//       document.body.style.width = "";

//       window.scrollTo(0, scrollY);
//     };
//   }, []);

//   return (
//     <div
//       onClick={onClose}
//       className="fixed inset-0 z-[9999] grid place-items-center overflow-y-auto bg-black/40 p-4"
//     >
//       <div
//         onClick={(event) => event.stopPropagation()}
//         className="relative grid w-full max-w-[939px] gap-[24px] rounded-[16px] bg-white p-[24px] shadow-xl md:grid-cols-[0.95fr_1.1fr]"
//       >
//         <button
//           type="button"
//           onClick={onClose}
//           className="absolute right-4 top-4 grid h-[40px] w-[40px] place-content-center rounded-full border border-[#E8E8E8]  text-[#757575] hover:bg-gray-50 cursor-pointer"
//         >
//           <svg
//             width="15"
//             height="15"
//             viewBox="0 0 15 15"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M14.781 13.7198C14.8507 13.7895 14.906 13.8722 14.9437 13.9632C14.9814 14.0543 15.0008 14.1519 15.0008 14.2504C15.0008 14.349 14.9814 14.4465 14.9437 14.5376C14.906 14.6286 14.8507 14.7114 14.781 14.781C14.7114 14.8507 14.6286 14.906 14.5376 14.9437C14.4465 14.9814 14.349 15.0008 14.2504 15.0008C14.1519 15.0008 14.0543 14.9814 13.9632 14.9437C13.8722 14.906 13.7895 14.8507 13.7198 14.781L7.50042 8.56073L1.28104 14.781C1.14031 14.9218 0.94944 15.0008 0.750417 15.0008C0.551394 15.0008 0.360523 14.9218 0.219792 14.781C0.0790615 14.6403 3.92322e-09 14.4494 0 14.2504C-3.92322e-09 14.0514 0.0790615 13.8605 0.219792 13.7198L6.4401 7.50042L0.219792 1.28104C0.0790615 1.14031 0 0.94944 0 0.750417C0 0.551394 0.0790615 0.360523 0.219792 0.219792C0.360523 0.0790615 0.551394 0 0.750417 0C0.94944 0 1.14031 0.0790615 1.28104 0.219792L7.50042 6.4401L13.7198 0.219792C13.8605 0.0790615 14.0514 -3.92322e-09 14.2504 0C14.4494 3.92322e-09 14.6403 0.0790615 14.781 0.219792C14.9218 0.360523 15.0008 0.551394 15.0008 0.750417C15.0008 0.94944 14.9218 1.14031 14.781 1.28104L8.56073 7.50042L14.781 13.7198Z"
//               fill="#7A7A7A"
//             />
//           </svg>
//         </button>

//         <div className="overflow-hidden rounded-[12px] bg-[#F7E900]">
//           <div className="relative aspect-[4/5] w-full">
//             <Image
//               src="/assets/dashboard/badge-preview.png"
//               alt={template.title}
//               fill
//               className="object-cover"
//             />
//           </div>
//         </div>

//         <div className="">
//           <div className="flex items-center gap-3 pr-12">
//             <h2 className="text-[28px] font-bold leading-tight text-[#1A1A1A] lg:max-w-[70%]">
//               {template.title}
//             </h2>

//             <StatusPill status={template.status} />
//           </div>

//           <span className="mt-2 inline-flex rounded-md border border-[#E8E8E8] px-2 py-1 text-[12px] text-[#333]">
//             Creative
//           </span>

//           <p className="mt-5 border-b border-[#E8E8E8] pb-5 text-[14px] leading-[1.7] text-[#757575]">
//             The badge is live and sharable. Participants can claim this badge
//             and share it on social media
//           </p>

//           <div className="space-y-4 border-b border-[#E8E8E8] py-5 text-[14px]">
//             <InfoRow
//               icon={
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 20 20"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M17.5 8.33317H2.5M13.3333 1.6665V4.99984M6.66667 1.6665V4.99984M8.75 11.6665L10 10.8332V14.9998M8.95833 14.9998H11.0417M6.5 18.3332H13.5C14.9001 18.3332 15.6002 18.3332 16.135 18.0607C16.6054 17.821 16.9878 17.4386 17.2275 16.9681C17.5 16.4334 17.5 15.7333 17.5 14.3332V7.33317C17.5 5.93304 17.5 5.23297 17.2275 4.69819C16.9878 4.22779 16.6054 3.84534 16.135 3.60565C15.6002 3.33317 14.9001 3.33317 13.5 3.33317H6.5C5.09987 3.33317 4.3998 3.33317 3.86502 3.60565C3.39462 3.84534 3.01217 4.22779 2.77248 4.69819C2.5 5.23297 2.5 5.93304 2.5 7.33317V14.3332C2.5 15.7333 2.5 16.4334 2.77248 16.9681C3.01217 17.4386 3.39462 17.821 3.86502 18.0607C4.3998 18.3332 5.09987 18.3332 6.5 18.3332Z"
//                     stroke="#AFAFAF"
//                     stroke-width="1.4"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               }
//               label="Created"
//               value="May 3rd, 2026"
//             />
//             <InfoRow
//               icon={
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 20 20"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M9.99999 4.99984V9.99984L13.3333 11.6665M18.3333 9.99984C18.3333 14.6022 14.6024 18.3332 9.99999 18.3332C5.39762 18.3332 1.66666 14.6022 1.66666 9.99984C1.66666 5.39746 5.39762 1.6665 9.99999 1.6665C14.6024 1.6665 18.3333 5.39746 18.3333 9.99984Z"
//                     stroke="#AFAFAF"
//                     stroke-width="1.4"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               }
//               label="Last used"
//               value="2 hours ago"
//             />
//             <InfoRow
//               icon={
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 20 20"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M5.83333 12.5751V18.3332L9.75241 16.7655C9.84387 16.729 9.88961 16.7107 9.93683 16.7034C9.9787 16.697 10.0213 16.697 10.0632 16.7034C10.1104 16.7107 10.1561 16.729 10.2476 16.7655L14.1667 18.3332V12.5751M16.25 7.9165C16.25 11.3683 13.4518 14.1665 10 14.1665C6.54822 14.1665 3.75 11.3683 3.75 7.9165C3.75 4.46472 6.54822 1.6665 10 1.6665C13.4518 1.6665 16.25 4.46472 16.25 7.9165Z"
//                     stroke="#AFAFAF"
//                     strokeWidth="1.4"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               }
//               label="Created badges"
//               value="734"
//             />
//             <InfoRow
//               icon={
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 20 20"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M17.3261 10.5062C17.5296 10.3318 17.6313 10.2446 17.6686 10.1409C17.7013 10.0498 17.7013 9.9502 17.6686 9.85914C17.6313 9.75539 17.5296 9.6682 17.3261 9.49383L10.2672 3.44331C9.917 3.14315 9.74191 2.99306 9.59367 2.98939C9.46483 2.98619 9.34177 3.04279 9.26035 3.14269C9.16667 3.25764 9.16667 3.48825 9.16667 3.94948V7.52886C7.38777 7.84007 5.75966 8.74146 4.54976 10.0949C3.23069 11.5704 2.50103 13.48 2.5 15.4591V15.9691C3.37445 14.9157 4.46626 14.0638 5.70063 13.4716C6.78891 12.9495 7.96535 12.6403 9.16667 12.5588V16.0505C9.16667 16.5117 9.16667 16.7424 9.26035 16.8573C9.34177 16.9572 9.46483 17.0138 9.59367 17.0106C9.74191 17.0069 9.917 16.8569 10.2672 16.5567L17.3261 10.5062Z"
//                     stroke="#AFAFAF"
//                     strokeWidth="1.4"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               }
//               label="Total shares"
//               value="400"
//             />
//           </div>

//           <div className="pt-4">
//             <p className="mb-2 text-[13px] font-semibold text-[#6B6B6B]">
//               Shareable link
//             </p>

//             <div className="flex gap-[8px] items-center rounded-lg border border-[#E8E8E8] px-[16px] py-[8px] text-[13px] text-[#121217]">
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M13.3333 6.6665V4.33317C13.3333 3.39975 13.3333 2.93304 13.1517 2.57652C12.9919 2.26292 12.7369 2.00795 12.4233 1.84816C12.0668 1.6665 11.6001 1.6665 10.6667 1.6665H4.33332C3.3999 1.6665 2.93319 1.6665 2.57667 1.84816C2.26307 2.00795 2.0081 2.26292 1.84831 2.57652C1.66666 2.93304 1.66666 3.39975 1.66666 4.33317V10.6665C1.66666 11.5999 1.66666 12.0666 1.84831 12.4232C2.0081 12.7368 2.26307 12.9917 2.57667 13.1515C2.93319 13.3332 3.3999 13.3332 4.33332 13.3332H6.66666M9.33332 18.3332H15.6667C16.6001 18.3332 17.0668 18.3332 17.4233 18.1515C17.7369 17.9917 17.9919 17.7368 18.1517 17.4232C18.3333 17.0666 18.3333 16.5999 18.3333 15.6665V9.33317C18.3333 8.39975 18.3333 7.93304 18.1517 7.57652C17.9919 7.26292 17.7369 7.00795 17.4233 6.84816C17.0668 6.6665 16.6001 6.6665 15.6667 6.6665H9.33332C8.3999 6.6665 7.93319 6.6665 7.57667 6.84816C7.26307 7.00795 7.0081 7.26292 6.84831 7.57652C6.66666 7.93304 6.66666 8.39975 6.66666 9.33317V15.6665C6.66666 16.5999 6.66666 17.0666 6.84831 17.4232C7.0081 17.7368 7.26307 17.9917 7.57667 18.1515C7.93319 18.3332 8.3999 18.3332 9.33332 18.3332Z"
//                   stroke="#E7E8E9"
//                   strokeWidth="1.4"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//               <p>{template.share_slug}</p>
//             </div>
//           </div>

//           <div className="mt-5 grid gap-3 sm:grid-cols-2">
//             <button
//               onClick={() => onRequestDelete(template)}
//               className="rounded-full border border-[#F6B6C8] px-5 py-3 text-[14px] font-semibold text-[#F43F72] cursor-pointer hover:bg-[#F43F72] hover:text-white"
//             >
//               Delete badge
//             </button>

//             <button className="rounded-full bg-[#242424] px-5 py-3 text-[14px] font-semibold text-white cursor-pointer">
//               Edit badge
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoRow({
//   icon,
//   label,
//   value,
// }: {
//   icon: ReactNode;
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
//       <div className="flex items-center gap-[10px] min-w-0">
//         <span className="shrink-0 text-[#B0B0B0]">{icon}</span>

//         <p className="truncate text-[14px] text-[#8B8B8B] md:text-[16px]">
//           {label}
//         </p>
//       </div>

//       <p className="text-right text-[16px] font-medium text-[#333] md:text-[18px]">
//         {value}
//       </p>
//     </div>
//   );
// }

// function MoreMenu({
//   onEdit,
//   onViewInfo,
//   onDelete,
// }: {
//   onEdit?: () => void;
//   onViewInfo?: () => void;
//   onDelete?: () => void;
// }) {
//   const [open, setOpen] = useState(false);
//   const [position, setPosition] = useState({ top: 0, left: 0 });

//   const buttonRef = useRef<HTMLButtonElement | null>(null);
//   const menuRef = useRef<HTMLDivElement | null>(null);

//   function updateMenuPosition() {
//     if (!buttonRef.current) return;

//     const rect = buttonRef.current.getBoundingClientRect();

//     const menuWidth = 190;
//     const gap = 8;

//     const left = rect.left + window.scrollX - menuWidth + rect.width;
//     const top = rect.bottom + window.scrollY + gap;

//     setPosition({ top, left });
//   }

//   function toggleMenu() {
//     updateMenuPosition();
//     setOpen((prev) => !prev);
//   }

//   useEffect(() => {
//     if (!open) return;

//     function handleClickOutside(event: MouseEvent) {
//       const target = event.target as Node;

//       if (
//         !menuRef.current?.contains(target) &&
//         !buttonRef.current?.contains(target)
//       ) {
//         setOpen(false);
//       }
//     }

//     function handleEscape(event: KeyboardEvent) {
//       if (event.key === "Escape") setOpen(false);
//     }

//     function handleReposition() {
//       updateMenuPosition();
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleEscape);
//     window.addEventListener("resize", handleReposition);
//     window.addEventListener("scroll", handleReposition, true);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEscape);
//       window.removeEventListener("resize", handleReposition);
//       window.removeEventListener("scroll", handleReposition, true);
//     };
//   }, [open]);

//   function handleAction(action?: () => void) {
//     action?.();
//     setOpen(false);
//   }

//   return (
//     <div className="inline-block">
//       <button
//         ref={buttonRef}
//         type="button"
//         aria-label="More options"
//         aria-haspopup="menu"
//         aria-expanded={open}
//         onClick={toggleMenu}
//         className="flex cursor-pointer items-center justify-center rounded-md px-[6px] py-1 text-[#9CA3AF] transition-colors hover:bg-[#F3F4F6] hover:text-[#374151]"
//       >
//         <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
//           <circle cx="8" cy="3" r="1.25" />
//           <circle cx="8" cy="8" r="1.25" />
//           <circle cx="8" cy="13" r="1.25" />
//         </svg>
//       </button>

//       {open &&
//         createPortal(
//           <div
//             ref={menuRef}
//             role="menu"
//             style={{
//               position: "absolute",
//               top: position.top,
//               left: position.left,
//               zIndex: 9999,
//             }}
//             className="w-[190px] rounded-2xl border border-[#E5E7EB] bg-white p-2 text-left shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
//           >
//             <button
//               type="button"
//               role="menuitem"
//               onClick={() => handleAction(onEdit)}
//               className="w-full rounded-xl px-4 py-3 text-left text-[16px] font-medium text-[#242424] hover:bg-[#F8F8F8]"
//             >
//               Edit
//             </button>

//             <button
//               type="button"
//               role="menuitem"
//               onClick={() => handleAction(onViewInfo)}
//               className="w-full rounded-xl px-4 py-3 text-left text-[16px] font-medium text-[#242424] hover:bg-[#F8F8F8]"
//             >
//               View info
//             </button>

//             <button
//               type="button"
//               role="menuitem"
//               onClick={() => handleAction(onDelete)}
//               className="w-full rounded-xl px-4 py-3 text-left text-[16px] font-medium text-[#DC2626] hover:bg-[#FEF2F2]"
//             >
//               Delete
//             </button>
//           </div>,
//           document.body,
//         )}
//     </div>
//   );
// }

// export default function RecentBadges() {
//   console.log("recent badges");
//   const [templates, setTemplates] = useState<OrganizerTemplateInstance[]>([]);
//   const [activeFilter, setActiveFilter] = useState<TemplateFilter>("All");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedTemplate, setSelectedTemplate] =
//     useState<OrganizerTemplateInstance | null>(null);

//   const [templateToDelete, setTemplateToDelete] =
//     useState<OrganizerTemplateInstance | null>(null);

//   useEffect(() => {
//     async function fetchTemplates() {
//       try {
//         setLoading(true);
//         setError(null);

//         const data = await getOrganizerTemplateInstances();
//         setTemplates(data.templates);
//       } catch (error) {
//         console.error(error);
//         setError("Could not load recent badges.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchTemplates();
//   }, []);

//   const filtered =
//     activeFilter === "All"
//       ? templates
//       : templates.filter(
//           (template) => template.status === activeFilter.toLowerCase(),
//         );

//   return (
//     <div className="w-full overflow-hidden overflow-y-visible rounded-2xl border border-[#F0F0EE]">
//       <div className="flex flex-col gap-4 p-4 sm:p-[20px_24px_16px]">
//         <div className="flex items-end justify-between gap-3">
//           <div className="min-w-0">
//             <h2 className="m-0 text-[17px] font-bold leading-[1.4] text-[#1A1A1A]">
//               Recent badges
//             </h2>

//             <p className="mt-0.5 text-[12.5px] leading-[1.5] text-[#9CA3AF]">
//               Your latest events and their performance.
//             </p>
//           </div>

//           <div className="gap-[10px] flex flex-col-reverse items-end sm:flex-row sm:items-center">
//             <div className="flex gap-2 rounded-[10px] border border-gray-200 bg-[#FBF9F6] p-1">
//               {FILTERS.map((filter) => (
//                 <button
//                   key={filter}
//                   type="button"
//                   onClick={() => setActiveFilter(filter)}
//                   className={`hover:bg-white/90 cursor-pointer rounded-md px-3 py-2 text-[13px] font-semibold transition-colors ${
//                     activeFilter === filter
//                       ? "bg-white text-[#3A3A3A] shadow-[inset_0_0_0_1px_#E5E7EB]"
//                       : "bg-transparent text-[#757575]"
//                   }`}
//                 >
//                   {filter}
//                 </button>
//               ))}
//             </div>
//             <button className="cursor-pointer shrink-0 whitespace-nowrap px-[2px] py-[6px] text-[13px] font-medium text-[#FF693E]">
//               View all &rsaquo;
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="md:hidden">
//         <div className="grid grid-cols-[1.3fr_1fr_1fr_32px] border-b border-t border-[#F0F0EE] bg-[#ECE9E4] px-3 py-3">
//           <p className="text-[11px] font-semibold tracking-[0.12em] text-[#757575]">
//             BADGE
//           </p>
//           <p className="text-[11px] font-semibold tracking-[0.12em] text-[#757575]">
//             STATUS
//           </p>
//           <p className="text-[11px] font-semibold tracking-[0.12em] text-[#757575]">
//             LAST EDITED
//           </p>
//           <span />
//         </div>

//         {filtered.map((template) => (
//           <div
//             key={template.id}
//             onClick={() => setSelectedTemplate(template)}
//             className="grid grid-cols-[1.3fr_1fr_1fr_32px] items-center border-b border-[#F0F0EE] px-3 py-5"
//           >
//             <div className="min-w-0">
//               <h3 className="text-[14px] font-semibold leading-[1.25] text-[#3A3A3A]">
//                 {template.title}
//               </h3>
//               <p className="mt-1 truncate text-[13px] text-[#B0B0B0]">
//                 Template instance
//               </p>
//             </div>

//             <div>
//               <StatusPill status={template.status} />
//             </div>

//             <p className="text-[13px] text-[#B0B0B0]">
//               {formatDate(template.updated_at)}
//             </p>

//             <div onClick={(event) => event.stopPropagation()}>
//               <MoreMenu />
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="hidden md:block overflow-x-auto">
//         <table className="w-full border-collapse text-[13px]">
//           <thead>
//             <tr className="bg-[#ECE9E4]">
//               {[
//                 "BADGE",
//                 "STATUS",
//                 "LAST EDITED",
//                 "LINK CLICKS",
//                 "SHARES",
//                 "",
//               ].map((col, i) => (
//                 <th
//                   key={col}
//                   className={`whitespace-nowrap border-b border-t border-[#F0F0EE] px-[16px] py-[10px] text-left text-[11px] font-semibold tracking-[0.05em] text-gray-400 ${
//                     i === 0 ? "w-[36%]" : i === 5 ? "w-[40px]" : ""
//                   }`}
//                 >
//                   {col}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td
//                   colSpan={6}
//                   className="px-[16px] py-[40px] text-center text-[14px] text-gray-400"
//                 >
//                   Loading recent badges...
//                 </td>
//               </tr>
//             ) : error ? (
//               <tr>
//                 <td
//                   colSpan={6}
//                   className="px-[16px] py-[40px] text-center text-[14px] text-red-500"
//                 >
//                   {error}
//                 </td>
//               </tr>
//             ) : filtered.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={6}
//                   className="px-[16px] py-[40px] text-center text-[14px] text-gray-400"
//                 >
//                   No badges match this filter.
//                 </td>
//               </tr>
//             ) : (
//               filtered.map((template) => {
//                 const isPublished = template.status === "live";

//                 return (
//                   <tr
//                     key={template.id}
//                     onClick={() => setSelectedTemplate(template)}
//                     className="border-b border-[#F0F0EE] transition-colors hover:bg-[#FAFAF8]"
//                   >
//                     <td className="px-[16px] py-[14px]">
//                       <div className="font-semibold text-[14px] leading-[1.3] text-gray-900">
//                         {template.title}
//                       </div>
//                       <div className="mt-[2px] text-[12px] text-gray-400">
//                         Template instance ·{" "}
//                         <span
//                           className={
//                             template.share_slug
//                               ? "text-gray-400"
//                               : "text-gray-300"
//                           }
//                         >
//                           {template.share_slug ?? "Not yet published"}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="px-[16px] py-[14px]">
//                       <StatusPill status={template.status} />
//                     </td>

//                     <td className="whitespace-nowrap px-[16px] py-[14px] text-[13px] text-gray-500">
//                       {formatDate(template.updated_at)}
//                     </td>

//                     <td className="px-[16px] py-[14px]">
//                       <div className="text-[15px] leading-none text-gray-700">
//                         —
//                       </div>
//                       <div className="mt-[3px] text-[11px] text-gray-300">
//                         {isPublished ? "No data yet" : "Unpublished"}
//                       </div>
//                     </td>

//                     <td className="px-[16px] py-[14px]">
//                       <div className="text-[15px] leading-none text-gray-700">
//                         —
//                       </div>
//                       <div className="mt-[3px] text-[11px] text-gray-300">
//                         {isPublished ? "No data yet" : "Unpublished"}
//                       </div>
//                     </td>

//                     <td
//                       onClick={(event) => event.stopPropagation()}
//                       className="py-[14px] pl-0 pr-[12px] text-right"
//                     >
//                       <MoreMenu />
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>
//       {selectedTemplate && (
//         <TemplateInfoModal
//           template={selectedTemplate}
//           onClose={() => setSelectedTemplate(null)}
//           onRequestDelete={(template) => {
//             setSelectedTemplate(null);
//             setTemplateToDelete(template);
//           }}
//         />
//       )}

//       {templateToDelete && (
//         <DeleteBadgeModal
//           title={templateToDelete.title}
//           onClose={() => setTemplateToDelete(null)}
//           onDelete={async () => {
//             try {
//               await deleteOrganizerTemplate(templateToDelete.id);
//               setTemplates((prev) =>
//                 prev.filter((template) => template.id !== templateToDelete.id),
//               );
//               setTemplateToDelete(null);
//             } catch (error) {
//               console.error(error);
//             }
//           }}
//         />
//       )}
//     </div>
//   );
// }
