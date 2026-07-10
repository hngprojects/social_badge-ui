import { CanvasData } from "@/app/features/customize/canvas-data";

export const DEMO_TEMPLATE_ID = "019e7e17-127b-7f72-b901-19d8ade4ddc8"

export const DEMO_CANVAS_TEMPLATE_DATA: CanvasData= {
        "logo": {
        "url": null,
        "has_logo": true,
        "position": "top-center",
        "public_id": null
      },
      "fields": [
        {
          "key": "participant_photo",
          "type": "participant_upload",
          "label": "YOUR PHOTO",
          "visible": true,
          "required": false,
          "max_size_mb": 5,
          "accepted_formats": [
            "jpg",
            "png",
            "webp"
          ]
        },
        {
          "key": "participant_name",
          "type": "participant_input",
          "label": "NAME",
          "visible": true,
          "required": true,
          "placeholder": "Your name"
        },
        {
          "key": "role_title",
          "type": "participant_input",
          "label": "ROLE / TITLE",
          "visible": true,
          "required": false,
          "placeholder": "e.g. Product Designer"
        }
      ],
      "output": {
        "format": "png",
        "width_px": 1080,
        "height_px": 1350
      },
      "layout_id": "circle_photo_dark_v1",
      "background": {
        "type": "split",
        "primary": {
          "type": "solid",
          "color": "#1E1E1E",
          "gradient": null
        },
        "secondary": {
          "type": "solid",
          "color": "#E0E0E0",
          "gradient": null
        },
        "split_ratio": 0.65
      },
      "typography": {
        "italic": false,
        "weight": "bold",
        "size_px": 38,
        "underline": false,
        "font_family": "DM Sans"
      }
    
   
  
}