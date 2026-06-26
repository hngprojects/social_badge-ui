import Image from "next/image";
import { TrademarkProps } from "@/app/features/templates/components/badge-preview/types";

export function Trademark({trademarkColor, trademarkLogo, trademarkBrandName, trademarkURL}: TrademarkProps){
  return (
    <div className="text-right text-[8px] font-light flex justify-between" style={{color: trademarkColor, opacity: ".4"}}>
          <div className="flex text-right justify-end gap-1">
  {trademarkLogo && <Image src={trademarkLogo} alt="Flare tag's logo" width={9} height={9} />
  }
          <span>{trademarkBrandName}</span>
          
          </div>
  
          <span>{trademarkURL}</span>
          </div>)
}