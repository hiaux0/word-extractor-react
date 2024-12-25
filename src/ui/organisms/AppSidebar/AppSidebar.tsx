import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ISheet } from "@/domain/types/types";
import {
  selectedSheetAtom,
  sheetsAtom,
  sheetsCRUDService,
} from "@/lib/StateAtom";
import { cn } from "@/lib/utils";
import { CreateSheetPopover } from "@/ui/molecules/CreateSheetPopover/CreateSheetPopover";
import { useAtom } from "jotai";
import { ChevronDown, ChevronUp, User2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export function AppSidebar() {
  const [sheets, setSheets] = useAtom(sheetsAtom);
  const [selectedSheet, setSelectedSheet] = useAtom(selectedSheetAtom);
  const [searchSheetValue, setSearchSheetValue] = useState("");

  const filteredSheets = useMemo(() => {
    return sheets.filter((sheet) =>
      sheet.name.toLowerCase().includes(searchSheetValue.toLowerCase()),
    );
  }, [sheets, searchSheetValue]);

  const selectSheet = useCallback((sheetId: ISheet["id"]) => {
    const targetSheet = sheetsCRUDService.readById(sheetId);
    if (!targetSheet) return;
    setSelectedSheet(targetSheet);
  }, []);

  const isSelected = useCallback(
    (sheetId: ISheet["id"]) => {
      const targetSheet = sheetsCRUDService.readById(sheetId);
      if (!targetSheet) return false;
      const is = targetSheet.id === selectedSheet?.id;
      return is;
    },
    [selectedSheet],
  );

  const recentlyUsed: string[] = [
    //"English new words",
    //"Tri thuc nhan loai",
    //"User research",
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex">
            <CreateSheetPopover />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Recently used
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                {recentlyUsed.map((item) => (
                  <SidebarMenuItem key={item}>
                    <SidebarMenuButton asChild>
                      <a href={item}>
                        <span>{item}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                All sheets
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenuItem>
                  <Input
                    className="mb-2"
                    type="text"
                    onChange={(e) => setSearchSheetValue(e.target.value)}
                    placeholder="Find sheets..."
                  />
                </SidebarMenuItem>

                {filteredSheets.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                      <span
                        onClick={() => selectSheet(item.id)}
                        className={cn("cursor-pointer", {
                          "bg-zinc-200 hover:bg-zinc-200": isSelected(item.id),
                        })}
                      >
                        {item.name}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
