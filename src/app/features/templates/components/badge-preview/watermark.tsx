import Image from "next/image";
import { WatermarkProps } from "@/app/features/templates/components/badge-preview/types";

export function Watermark({watermarkColor, watermarkLogo, watermarkBrandName}: WatermarkProps){
  return (
    <div className="text-[8px] font-light flex justify-end" style={{color: watermarkColor}}>
          <div className="flex gap-1">
  {watermarkLogo && <Image className="opacity-70" src={watermarkLogo} alt="Flare tag's logo" width={9} height={9} />
  }
          <span className="opacity-45">{watermarkBrandName}</span>
          
          </div>
  {/* Pass URL only when approved by PO, and URL is stable */}
          {/* <span className="opacity-45">{watermarkURL}</span> */}
          </div>)
}