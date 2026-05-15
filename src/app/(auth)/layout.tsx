import { ReactNode } from "react";
import { BadgeUI } from "../features/auth/components/badge-ui";

type LayoutProps = {
  children: ReactNode;
};

const layout = ({ children }: LayoutProps) => {
  return (
    <div
      className=" w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{
        background: "linear-gradient(180deg, #FF8A00 0%, #FF4D8D 100%)",
      }}
    >
      <div className="mx-auto relative max-w-360 max-h-360 w-full h-full justify-center flex ">
        {/* left */}
        <BadgeUI />

        <div className="w-full flex-1 h-full flex p-6">
          <div className="login bg-white w-full rounded-lg overflow-y-auto scroll-smooth p-5 no-scrollbar flex  flex-col gap-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
