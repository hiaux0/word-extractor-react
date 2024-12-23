import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Download, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CRUDService } from "@/lib/CRUDService";
import { defaultWordEntry, IWordEntry } from "@/domain/types/types";
import { useAtom } from "jotai";
import { wordsDatabaseAtom } from "@/lib/StateAtom";
import { backgroundCommunicationService } from "@/lib/BackgroundCommunicationService";
import { MESSAGES } from "@/lib/common/constants";
import { AppSidebar } from "@/ui/organisms/AppSidebar/AppSidebar";
import { SidebarTrigger } from "./ui/sidebar";

const sharedDatabase = new CRUDService<IWordEntry>();

export default function LanguageTracker() {
  const [entries, setEntries] = useAtom(wordsDatabaseAtom);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme, setTheme } = useTheme();

  const saveEntriesToDatabase = (entries: IWordEntry[]) => {
    sharedDatabase.replace(entries);
  };

  const addNewEntry = () => {
    const newEntry: IWordEntry = {
      ...defaultWordEntry,
      id: Date.now().toString(),
    };
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    saveEntriesToDatabase(updatedEntries);
    backgroundCommunicationService.send({
      action: MESSAGES["database:create"],
      payload: newEntry,
    });
  };

  const updateEntry = (id: string, field: keyof IWordEntry, value: string) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === id ? { ...entry, [field]: value } : entry,
    );
    setEntries(updatedEntries);
    saveEntriesToDatabase(updatedEntries);
  };

  const deleteEntry = (id: string) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    saveEntriesToDatabase(updatedEntries);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = "language_entries.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const filteredEntries = entries.filter((entry) =>
    Object.values(entry).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <>
      <AppSidebar />

      <div className="space-y-4">
        <section className="flex items-center">
          <SidebarTrigger className="p-5"/>
          <h1 className="text-2xl font-bold">Language Tracker</h1>
        </section>

        <section className="p-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="dark-mode"
                  checked={theme === "dark"}
                  onCheckedChange={() =>
                    setTheme(theme === "light" ? "dark" : "light")
                  }
                />
                <Label htmlFor="dark-mode">Dark Mode</Label>
              </div>
              <Button onClick={addNewEntry}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Entry
              </Button>
              <Button onClick={exportData} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Context</TableHead>
                  <TableHead>Translation</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <Input
                        type="text"
                        value={entry.text}
                        onChange={(e) =>
                          updateEntry(entry.id, "text", e.target.value)
                        }
                        placeholder="Enter original word"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={entry.translation}
                        onChange={(e) =>
                          updateEntry(entry.id, "translation", e.target.value)
                        }
                        placeholder="Enter mother tongue meaning"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={entry.comment}
                        onChange={(e) =>
                          updateEntry(entry.id, "comment", e.target.value)
                        }
                        placeholder="Enter origin language meaning"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={entry.source}
                        onChange={(e) =>
                          updateEntry(entry.id, "source", e.target.value)
                        }
                        placeholder="Enter origin language meaning"
                      />
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteEntry(entry.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </>
  );
}
