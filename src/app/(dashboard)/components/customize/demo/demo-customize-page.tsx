import { createDefaultEditorState } from "@/app/features/badges/lib/parse-canvas-data";
import { DEMO_CANVAS_TEMPLATE_DATA, DEMO_TEMPLATE_ID } from "./demo-canvas-data";
import { CustomizeBadgeForm } from "@/app/features/customize/components/customize-badge-form";

export function DemoCustomizePage(){
  const initialEditor = createDefaultEditorState(
          DEMO_TEMPLATE_ID, DEMO_CANVAS_TEMPLATE_DATA
        )
  
        if (!initialEditor){
          throw new Error("Invalid demo template")
        }
        
        return (
          <CustomizeBadgeForm hasParam={false} initialEditor={initialEditor} organiserTemplateId={null} />
        )

}