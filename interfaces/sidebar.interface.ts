import { icons } from "lucide-react";

export interface ISidebarTab {
  label: string;
  icon: {
    name: keyof typeof icons;
  };
  navigateLink: string;
}
