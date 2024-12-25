import { useCallback, useMemo, useState } from "react";
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
import { defaultWordEntry, IWordEntry } from "@/domain/types/types";
import { useAtom, useAtomValue } from "jotai";
import {
  selectedSheetAtom,
  wordsCRUDService,
  wordsListAtom,
} from "@/lib/StateAtom";
import { AppSidebar } from "@/ui/organisms/AppSidebar/AppSidebar";
import { SidebarTrigger } from "./ui/sidebar";
import { Textarea } from "./ui/textarea";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { ModeToggle } from "./mode-toggle";

export default function LanguageTracker() {
  const [words, setWords] = useAtom(wordsListAtom);
  const selectedSheet = useAtomValue(selectedSheetAtom);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme, setTheme } = useTheme();

  const addNewEntry = useCallback(() => {
    const newEntry: IWordEntry = {
      ...defaultWordEntry,
      id: Date.now().toString(),
      sheets: [selectedSheet.id],
    };
    wordsCRUDService.create(newEntry);
    const updatedEntries = wordsCRUDService.readAll();
    setWords(updatedEntries);
  }, [words, selectedSheet]);

  const updateEntry = useDebouncedCallback(
    (id: string, field: keyof IWordEntry, value: string) => {
      const updatedEntries = words.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      );
      setWords(updatedEntries);
    },
    [words],
    500,
  );

  const deleteEntry = useCallback(
    (id: string) => {
      const updatedEntries = words.filter((entry) => entry.id !== id);
      setWords(updatedEntries);
    },
    [words],
  );

  const exportData = () => {
    const dataStr = JSON.stringify(words, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = `${getCurrentDate()}__word-extractor.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    function getCurrentDate() {
      const date = new Date();
      const dateString = date.toISOString();
      return dateString;
    }
  };

  const filteredEntries = useMemo(() => {
    /*prettier-ignore*/ console.log("----------------------------");
    /*prettier-ignore*/ console.log("[language-tracker.tsx,75] words: ", words);
    const filteredBySheet = words.filter((entry) =>
      entry.sheets.includes(selectedSheet.id),
    );
    /*prettier-ignore*/ console.log("[language-tracker.tsx,74] filteredBySheet: ", filteredBySheet);

    let filteredBySearch = filteredBySheet;
    if (searchTerm) {
      filteredBySearch = filteredBySheet.filter((word) => {
        // search for in properties
        let included = false;
        Object.entries(word).find(([key, value]) => {
          const denyList = ["id", "sheets"];
          if (denyList.includes(key)) return;
          if (!value) return;
          if (typeof value !== "string") return;
          const okay = value.toLowerCase().includes(searchTerm.toLowerCase());
          if (okay) {
            included = okay;
          }
        });

        return included;
      });
    }
    /*prettier-ignore*/ console.log("[language-tracker.tsx,79] filteredBySearch: ", filteredBySearch);

    const sortedByCreated = filteredBySearch.sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
    );
    /*prettier-ignore*/ console.log("[language-tracker.tsx,96] sortedByCreated: ", sortedByCreated);

    const filtered = sortedByCreated;

    return filtered;
  }, [words, searchTerm, selectedSheet]);

  return (
    <>
      <AppSidebar />

      <div className="space-y-4 w-full">
        <section className="flex items-center">
          <SidebarTrigger className="p-5" />
          <h1 className="text-2xl font-bold">{selectedSheet.name}</h1>
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
                <ModeToggle />
              </div>
              <Button onClick={exportData} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button onClick={addNewEntry} disabled={!selectedSheet.id}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Entry
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
                      <Textarea
                        value={entry.text}
                        onChange={(e) =>
                          updateEntry(entry.id, "text", e.target.value)
                        }
                        placeholder="Type text"
                        rows={1}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={entry.translation}
                        onChange={(e) =>
                          updateEntry(entry.id, "translation", e.target.value)
                        }
                        placeholder="Type translation"
                        rows={1}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={entry.comment}
                        onChange={(e) =>
                          updateEntry(entry.id, "comment", e.target.value)
                        }
                        placeholder="Type comment"
                        rows={1}
                      />
                    </TableCell>
                    <TableCell>
                      <a
                        className="inline-block max-h-14  w-[130px] whitespace-nowrap overflow-hidden  overflow-ellipsis"
                        rel="noreferrer noopener"
                        target="_blank"
                        href={entry.source}
                        title={entry.source}
                      >
                        {entry.source}
                      </a>
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="ghost"
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
