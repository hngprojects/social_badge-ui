import Image from "next/image";
import { WatermarkProps } from "@/app/features/templates/components/badge-preview/types";

export function Watermark({watermarkColor, watermarkLogo, watermarkBrandName, watermarkURL}: WatermarkProps){
  return (
    <div className="text-right text-[8px] font-light flex justify-between" style={{color: watermarkColor, opacity: ".4"}}>
          <div className="flex text-right justify-end gap-1">
  {watermarkLogo && <Image src={watermarkLogo} alt="Flare tag's logo" width={9} height={9} />
  }
          <span>{watermarkBrandName}</span>
          
          </div>
  
          <span>{watermarkURL}</span>
          </div>)
}