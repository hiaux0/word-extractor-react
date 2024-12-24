import { useAtom } from "jotai";
import { ComponentProps, FC, useEffect, useState } from "react";
import { localStorageService } from "@/lib/PersistanceService";
import {
  selectedSheetAtom,
  sheetsAtom,
  sheetsCRUDService,
  wordsCRUDService,
  wordsListAtom,
} from "@/lib/StateAtom";
import { contentScriptCommunicationService } from "@/lib/CommunicationService";
import { MESSAGES } from "@/lib/common/constants";
import { backgroundPersistanceService } from "@/lib/BackgroundPersistanceService";

contentScriptCommunicationService.initListeners();

interface PersistanceProps extends ComponentProps<any> {
  children: React.ReactNode;
}

export const PersistanceWrapper: FC<PersistanceProps> = (props) => {
  const { children } = props;
  const [words, setWords] = useAtom(wordsListAtom);
  const [sheets, setSheets] = useAtom(sheetsAtom);
  const [selectedSheet, setSelectedSheet] = useAtom(selectedSheetAtom);
  const [loaded, setLoaded] = useState(false);

  const isBrowserAction =
    document.getElementById("root")?.dataset.isBrowserAction === "true";
  const isLocalhost = window.location.hostname === "localhost";
  const isBackground = isBrowserAction && !isLocalhost;

  useEffect(() => {
    if (!loaded) {
      if (words.length === 0) {
        if (isBackground) {
          backgroundPersistanceService.get().then((data) => {
            setLoaded(true);
            if (!data) return;
            setWords(data.words);
            setSheets(data.sheets);
          });
          return;
        }

        const database = localStorageService.get();
        /*prettier-ignore*/ console.log("[PersistanceWrapper.tsx,45] database: ", database);
        if (!database) return setLoaded(true);
        const loadedWords = database.words;
        /*prettier-ignore*/ console.log("[ ][C] Loaded words from localStorage", loadedWords);
        // if (loadedWords.length === 0) return setLoaded(true);
        /*prettier-ignore*/ console.log("[ ][C] Sending loaded words to [CS] from [PW]");
        contentScriptCommunicationService.send({
          payload: database,
          action: MESSAGES["database:sync"],
        });
        setWords(loadedWords);
        wordsCRUDService.replace(loadedWords);
        setSheets(database.sheets);
        sheetsCRUDService.replace(database.sheets);
        setSelectedSheet(database.selectedSheet ?? database.sheets[0]);
      }

      setLoaded(true);
    } else {
      /*prettier-ignore*/ console.log("-------------------------------------------------------------------");
      if (isBackground) return setLoaded(true);
      /*prettier-ignore*/ console.log("[ ][C] Setting words to localStorage", words);
      localStorageService.set({ words, sheets, selectedSheet });
      contentScriptCommunicationService.send({
        payload: {
          words,
          sheets,
          selectedSheet,
        },
        action: MESSAGES["database:sync"],
      });
      setLoaded(true);
    }
  }, [words, sheets, selectedSheet]);

  if (!loaded) return <>Loading...</>;
  return <>{children}</>;
};
