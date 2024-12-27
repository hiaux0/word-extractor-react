import { useAtom } from "jotai";
import { ComponentProps, FC, useEffect, useState } from "react";
import {
  selectedSheetAtom,
  sheetsAtom,
  sheetsCRUDService,
  wordsCRUDService,
  wordsListAtom,
} from "@/lib/StateAtom";
import { contentScriptCommunicationService } from "@/lib/CommunicationService";
import { MESSAGES } from "@/lib/common/constants";

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
    document.getElementById("app")?.dataset.isBrowserAction === "true";
  const isLocalhost = window.location.hostname === "localhost";
  const isBackground = isBrowserAction && !isLocalhost;

  useEffect(() => {
    if (!loaded) {
      contentScriptCommunicationService.on(
        MESSAGES["database:read"],
        ({ payload }) => {
          /*prettier-ignore*/ console.log("2.1 -------------------------------------------------------------------");
          const database = payload;
          /*prettier-ignore*/ console.log("2.1.1 [PersistanceWrapper.tsx,37] database: ", database);
          if (!database) return setLoaded(true);
          const loadedWords = database.words;
          setWords(loadedWords);
          wordsCRUDService.replace(loadedWords);
          setSheets(database.sheets);
          sheetsCRUDService.replace(database.sheets);
          setSelectedSheet(
            database.selectedSheet.id
              ? database.selectedSheet
              : database.sheets[0],
          );
        },
      );
      contentScriptCommunicationService.send({
        action: MESSAGES["database:read"],
      });
    } else {
      const database = { words, sheets, selectedSheet };
      /*prettier-ignore*/ console.log("2.2 [PersistanceWrapper.tsx,57] database: ", database);
      contentScriptCommunicationService.send({
        payload: database,
        action: MESSAGES["database:sync"],
      });
    }

    setLoaded(true);
  }, [words, sheets, selectedSheet]);

  if (!loaded) return <>Loading...</>;
  return <>{children}</>;
};
