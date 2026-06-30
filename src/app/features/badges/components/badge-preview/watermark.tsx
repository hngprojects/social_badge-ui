import Image from "next/image";
import { WatermarkProps } from "@/app/features/badges/components/badge-preview/types";

export function Watermark({watermarkColor, watermarkLogo, watermarkBrandName}: WatermarkProps){
  return (
    <div className="text-[8px] font-light flex justify-center mt-1" style={{color: watermarkColor}}>
          <div className="flex gap-1">
  {watermarkLogo && <Image className="opacity-70" src={watermarkLogo} alt="Flare tag's logo" width={7} height={7} />
  }
          <span className="opacity-40">{watermarkBrandName}</span>
          
          </div>
  {/* Pass URL only when approved by PO, and URL is stable */}
          {/* <span className="opacity-45">{watermarkURL}</span> */}
          </div>)
}