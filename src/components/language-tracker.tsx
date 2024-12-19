import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2, Download, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CRUDService } from "@/lib/CRUDService";
import { IWordEntry } from "@/domain/types/types";

const sharedDatabase = new CRUDService<IWordEntry>();

export default function LanguageTracker() {
  const [entries, setEntries] = useState<IWordEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    loadEntriesFromDatabase();
  }, []);

  const loadEntriesFromDatabase = () => {
    const storedEntries = sharedDatabase.readAll();
    setEntries(storedEntries);
  };

  const saveEntriesToDatabase = (entries: IWordEntry[]) => {
    sharedDatabase.replace(entries);
  };

  const addNewEntry = () => {
    const newEntry: IWordEntry = {
      id: Date.now().toString(),
      languageType: "",
      original: "",
      motherTongueMeaning: "",
      originLanguageMeaning: "",
      comments: "",
    };
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    saveEntriesToDatabase(updatedEntries);
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
    <div className="space-y-4">
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
              <TableHead>Language</TableHead>
              <TableHead>Original Word</TableHead>
              <TableHead>Mother Tongue Meaning</TableHead>
              <TableHead>Origin Language Meaning</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>
                  <Select
                    value={entry.languageType}
                    onValueChange={(value) =>
                      updateEntry(entry.id, "languageType", value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VN">Vietnamese (VN)</SelectItem>
                      <SelectItem value="DE">German (DE)</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  {entry.languageType === "custom" && (
                    <Input
                      type="text"
                      placeholder="Enter custom language"
                      value={
                        entry.languageType === "custom"
                          ? ""
                          : entry.languageType
                      }
                      onChange={(e) =>
                        updateEntry(entry.id, "languageType", e.target.value)
                      }
                      className="mt-2"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={entry.original}
                    onChange={(e) =>
                      updateEntry(entry.id, "originalWord", e.target.value)
                    }
                    placeholder="Enter original word"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={entry.motherTongueMeaning}
                    onChange={(e) =>
                      updateEntry(
                        entry.id,
                        "motherTongueMeaning",
                        e.target.value,
                      )
                    }
                    placeholder="Enter mother tongue meaning"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={entry.originLanguageMeaning}
                    onChange={(e) =>
                      updateEntry(
                        entry.id,
                        "originLanguageMeaning",
                        e.target.value,
                      )
                    }
                    placeholder="Enter origin language meaning"
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    value={entry.comments}
                    onChange={(e) =>
                      updateEntry(entry.id, "comments", e.target.value)
                    }
                    placeholder="Add comments (optional)"
                    className="min-h-[60px]"
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
    </div>
  );
}
